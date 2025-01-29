import {
  describe,
  it,
  expect,
  afterAll,
  beforeAll,
  assert,
} from 'vitest';
import { TestContainer } from '../../helpers/test-container';
import { PropertyPaginatedResult, State } from '../../../src/graphql/graphql';
import { Server } from '../../../src/infrastructure/server/server';
import {
  mockProperties,
  CREATE_PROPERTY,
  GET_PROPERTIES,
} from '../../helpers/mocks/property.mock';

describe('Query Properties Integration Tests', () => {
  let container: TestContainer;
  let server: Server;

  beforeAll(async () => {
    container = TestContainer.getTestInstance();
    server = new Server(container);
    await server.initialize();
    await container.cleanup();
    for (const property of mockProperties) {
      await server.apollo.executeOperation({
        query: CREATE_PROPERTY,
        variables: { input: property },
      });
    }
  });


  afterAll(async () => {
    await container.cleanup();
    await container.disconnect();
    await server.shutdown();
  });

  it('should query all properties', async () => {
    

    const response = await server.apollo.executeOperation({
      query: GET_PROPERTIES,
    });

    expect(response.body.kind).toBe('single');
    assert(response.body.kind === 'single');
    const result = response.body.singleResult?.data?.getProperties as PropertyPaginatedResult;

    expect(result.properties).toHaveLength(4);
  });

  it('should filter properties by city', async () => {
    const response = await server.apollo.executeOperation({
      query: GET_PROPERTIES,
      variables: { filter: { city: 'New York' } },
    });

    expect(response.body.kind).toBe('single');
    assert(response.body.kind === 'single');

    const result = response.body.singleResult?.data
      ?.getProperties as PropertyPaginatedResult;
    expect(result.properties).toHaveLength(2);
    expect(result.properties.every((p) => p.city === 'New York')).toBe(true);
  });

  it('should filter properties by state', async () => {
    const response = await server.apollo.executeOperation({
      query: GET_PROPERTIES,
      variables: { filter: { state: State.Ma } },
    });

    expect(response.body.kind).toBe('single');
    assert(response.body.kind === 'single');

    const result = response.body.singleResult?.data
      ?.getProperties as PropertyPaginatedResult;
    expect(result.properties).toHaveLength(1);
    expect(result.properties[0].state).toBe(State.Ma);
  });

  it('should sort properties by creation date', async () => {
    const response = await server.apollo.executeOperation({
      query: GET_PROPERTIES,
      variables: {
        sortBy: 'CREATED_AT',
        sortOrder: 'DESC',
      },
    });

    expect(response.body.kind).toBe('single');
    assert(response.body.kind === 'single');

    const result = response.body.singleResult?.data
      ?.getProperties as PropertyPaginatedResult;
    const properties = result.properties;

    expect(new Date(properties[0].createdAt).getTime()).toBeGreaterThan(
      new Date(properties[1].createdAt).getTime()
    );
  });

  it('should paginate properties correctly', async () => {
    const response = await server.apollo.executeOperation({
      query: GET_PROPERTIES,
      variables: {
        page: 1,
        pageSize: 2
      },
    });

    expect(response.body.kind).toBe('single');
    assert(response.body.kind === 'single');
    const result = response.body.singleResult?.data?.getProperties as PropertyPaginatedResult;
    
    expect(result.properties).toHaveLength(2);
    expect(result.totalCount).toBe(4); 
  });

  it('should filter properties by multiple criteria', async () => {
    const response = await server.apollo.executeOperation({
      query: GET_PROPERTIES,
      variables: {
        filter: {
          city: 'New York',
          state: State.Ny
        }
      },
    });

    expect(response.body.kind).toBe('single');
    assert(response.body.kind === 'single');
    const result = response.body.singleResult?.data?.getProperties as PropertyPaginatedResult;
    
    expect(result.properties.every(p => p.city === 'New York' && p.state === State.Ny)).toBe(true);
  });

  it('should handle empty result sets gracefully', async () => {
    const response = await server.apollo.executeOperation({
      query: GET_PROPERTIES,
      variables: {
        filter: {
          city: 'NonExistentCity'
        }
      },
    });

    expect(response.body.kind).toBe('single');
    assert(response.body.kind === 'single');
    const result = response.body.singleResult?.data?.getProperties as PropertyPaginatedResult;
    
    expect(result.properties).toHaveLength(0);
    expect(result.totalCount).toBe(0);
  });
});
