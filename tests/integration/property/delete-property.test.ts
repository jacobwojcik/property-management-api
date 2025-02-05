import { describe, it, expect, afterAll, beforeAll, assert } from 'vitest';
import { TestDepsContainer } from '../../helpers/test-deps-container';
import { Property } from '../../../src/graphql/types';
import { Server } from '../../../src/infrastructure/server/server';
import {
  mockPropertyInput,
  CREATE_PROPERTY,
  DELETE_PROPERTY,
  GET_PROPERTY,
} from '../../helpers/mocks/property.mock';

describe('Delete Property Integration Tests', () => {
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

  it('should delete a property', async () => {
    const createResponse = await server.apollo.executeOperation({
      query: CREATE_PROPERTY,
      variables: { input: mockPropertyInput },
    });

    expect(createResponse.body.kind).toBe('single');
    assert(createResponse.body.kind === 'single');
    const created = createResponse.body.singleResult?.data
      ?.createProperty as Property;

    const deleteResponse = await server.apollo.executeOperation({
      query: DELETE_PROPERTY,
      variables: { id: created.id },
    });

    expect(deleteResponse.body.kind).toBe('single');
    assert(deleteResponse.body.kind === 'single');
    expect(deleteResponse.body.singleResult?.data?.deleteProperty).toBe(true);

    const getResponse = await server.apollo.executeOperation({
      query: GET_PROPERTY,
      variables: { id: created.id },
    });

    expect(getResponse.body.kind).toBe('single');
    assert(getResponse.body.kind === 'single');
    expect(getResponse.body.singleResult?.data?.getProperty).toBe(null);
  });

  it('should return error when deleting non-existent property', async () => {
    const deleteResponse = await server.apollo.executeOperation({
      query: DELETE_PROPERTY,
      variables: { id: 'non-existent-id' },
    });

    expect(deleteResponse.body.kind).toBe('single');
    assert(deleteResponse.body.kind === 'single');
    expect(deleteResponse.body.singleResult?.errors?.[0].extensions?.code).toBe(
      'NOT_FOUND'
    );
  });
});
