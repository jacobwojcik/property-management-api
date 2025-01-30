import {
  describe,
  it,
  expect,
  afterAll,
  beforeAll,
  assert,
} from 'vitest';
import { TestDepsContainer } from '../../helpers/test-deps-container';
import { PropertyPaginatedResult } from '../../../src/graphql/types';
import { Server } from '../../../src/infrastructure/server/server';
import {
  GET_PROPERTIES,
  createProperties,
} from '../../helpers/mocks/property.mock';

describe('Query Properties Integration Tests', () => {
  let container: TestDepsContainer;
  let server: Server;

  beforeAll(async () => {
    container = TestDepsContainer.getTestInstance();
    server = new Server(container);
    await server.initialize();

    await createProperties(server);
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
    const result = response.body.singleResult?.data
      ?.getProperties as PropertyPaginatedResult;

    expect(result.properties).toHaveLength(3);
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
      variables: { filter: { state: 'MA' } },
    });

    expect(response.body.kind).toBe('single');
    assert(response.body.kind === 'single');

    const result = response.body.singleResult?.data
      ?.getProperties as PropertyPaginatedResult;
    expect(result.properties).toHaveLength(1);
    expect(result.properties[0].state).toBe('MA');
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
        pageSize: 2,
      },
    });

    expect(response.body.kind).toBe('single');
    assert(response.body.kind === 'single');
    const result = response.body.singleResult?.data
      ?.getProperties as PropertyPaginatedResult;

    expect(result.properties).toHaveLength(2);
    expect(result.totalCount).toBe(3);
  });

  it('should filter properties by multiple criteria', async () => {
    const response = await server.apollo.executeOperation({
      query: GET_PROPERTIES,
      variables: {
        filter: {
          city: 'New York',
          state: 'NY',
        },
      },
    });

    expect(response.body.kind).toBe('single');
    assert(response.body.kind === 'single');
    const result = response.body.singleResult?.data
      ?.getProperties as PropertyPaginatedResult;

    expect(
      result.properties.every((p) => p.city === 'New York' && p.state === 'NY')
    ).toBe(true);
  });

  it('should handle empty result sets gracefully', async () => {
    const response = await server.apollo.executeOperation({
      query: GET_PROPERTIES,
      variables: {
        filter: {
          city: 'NonExistentCity',
        },
      },
    });

    expect(response.body.kind).toBe('single');
    assert(response.body.kind === 'single');
    const result = response.body.singleResult?.data
      ?.getProperties as PropertyPaginatedResult;

    expect(result.properties).toHaveLength(0);
    expect(result.totalCount).toBe(0);
  });
});
