import {
  describe,
  it,
  expect,
  afterAll,
  beforeAll,
  assert,
} from 'vitest';
import { TestDepsContainer } from '../../helpers/test-deps-container';
import { Property } from '../../../src/graphql/types';
import { Server } from '../../../src/infrastructure/server/server';
import {
  mockPropertyInput,
  CREATE_PROPERTY,
  GET_PROPERTY,
  DELETE_PROPERTY,
} from '../../helpers/mocks/property.mock';

describe('Create Property Integration Tests', () => {
  let container: TestDepsContainer;
  let server: Server;

  beforeAll(async () => {
    container = TestDepsContainer.getTestInstance();
    server = new Server(container);
    await server.initialize();
  });

  afterAll(async () => {
    await container.disconnect();
    await server.shutdown();
  });

  it('should create and retrieve a property with weather data', async () => {
    const createResponse = await server.apollo.executeOperation({
      query: CREATE_PROPERTY,
      variables: { input: mockPropertyInput },
    });

    expect(createResponse.body.kind).toBe('single');
    assert(createResponse.body.kind === 'single');

    const created = createResponse.body.singleResult?.data
      ?.createProperty as Property;

    expect(created).toBeDefined();
    expect(created.street).toBe(mockPropertyInput.street);
    expect(created.city).toBe(mockPropertyInput.city);
    expect(created.state).toBe(mockPropertyInput.state);
    expect(created.zipCode).toBe(mockPropertyInput.zipCode);

    const getResponse = await server.apollo.executeOperation({
      query: GET_PROPERTY,
      variables: { id: created.id },
    });

    expect(getResponse.body.kind).toBe('single');
    assert(getResponse.body.kind === 'single');

    const retrieved = getResponse.body.singleResult?.data
      ?.getProperty as Property;

    expect(retrieved).toBeDefined();
    expect(retrieved.id).toBe(created.id);
    expect(retrieved.street).toBe(mockPropertyInput.street);
    expect(retrieved.city).toBe(mockPropertyInput.city);
    expect(retrieved.state).toBe(mockPropertyInput.state);
    expect(retrieved.zipCode).toBe(mockPropertyInput.zipCode);
    expect(retrieved.weatherData?.temperature).toBeDefined();

    const deleteResponse = await server.apollo.executeOperation({
      query: DELETE_PROPERTY,
      variables: { id: created.id },
    });

    expect(deleteResponse.body.kind).toBe('single');
  });
});
