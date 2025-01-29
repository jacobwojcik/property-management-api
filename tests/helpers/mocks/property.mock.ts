import { State } from "../../../src/graphql/graphql";

export const mockPropertyInput = {
  street: '123 Test St',
  city: 'Test City',
  state: 'NY',
  zipCode: '12345',
};

export const mockProperties = [
  {
    street: '123 Test St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
  },
  {
    street: '456 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10002',
  },
  {
    street: '789 Oak St',
    city: 'Boston',
    state: 'MA',
    zipCode: '02108',
  },
];

export const mockProperty = {
  id: '1',
  street: '123 Test St',
  city: 'Test City',
  state: State.Ny,
  zipCode: '12345',
  lat: 40.7128,
  long: -74.006,
  createdAt: new Date(),
  updatedAt: new Date(),
};



export const CREATE_PROPERTY = `
  mutation CreateProperty($input: CreatePropertyInput!) {
    createProperty(input: $input) {
      id
      street
      city
      state
      zipCode
      createdAt
    }
  }
`;

export const GET_PROPERTY = `
  query GetProperty($id: ID!) {
    getProperty(id: $id) {
      id
      street
      city
      state
      zipCode
      weatherData {
        temperature
      }
    }
  }
`;

export const GET_PROPERTIES = `
  query GetProperties(
    $filter: PropertyFilter, 
    $sortBy: PropertySortField, 
    $sortOrder: SortOrder,
    $page: Int,
    $pageSize: Int
  ) {
    getProperties(
      filter: $filter, 
      sortBy: $sortBy, 
      sortOrder: $sortOrder,
      page: $page,
      pageSize: $pageSize
    ) {
      properties {
        id
        street
        city
        state
        zipCode
        createdAt
      }
      totalCount
      pageInfo {
        currentPage
        totalPages
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const DELETE_PROPERTY = `
  mutation DeleteProperty($id: ID!) {
    deleteProperty(id: $id)
  }
`; 