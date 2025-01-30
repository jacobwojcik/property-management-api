# Property Management GraphQL API

A GraphQL API for managing properties with real-time weather data integration. Built with TypeScript, Node.js, and PostgreSQL.

## Key Features

- Property management with CRUD operations
- Weather data integration via Weatherstack API
- Filtering and sorting capabilities
- Pagination support
- Unit & integration tests
- GraphQL schema with TypeScript type generation
- Dependency injection pattern
- Docker containerization

## Tech Stack

- **Runtime**: Node.js 20+
- **Language**: TypeScript
- **API**: GraphQL with Apollo Server 4
- **Database**: PostgreSQL 16
- **ORM**: Prisma
- **Testing**: Vitest
- **Weather Data**: Weatherstack API
- **Container**: Docker & Docker Compose
- **Package Manager**: pnpm

## Architecture

- Clean Architecture pattern
- Dependency Injection
- Repository pattern for data access
- Service layer for business logic
- GraphQL resolvers for API endpoints

## Prerequisites

- Node.js 20+
- pnpm 8+
- Docker and Docker Compose
- PostgreSQL 16+
- Weatherstack API key

## Getting Started

1. Clone the repository

2. Copy environment files:

```bash
cp .env.example .env
```

3. Update environment variables in `.env`:

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/property_management
TEST_DATABASE_URL=postgresql://postgres:postgres@localhost:5432/property_management_test
WEATHERSTACK_API_KEY=your_weatherstack_api_key
PORT=4000
```

## Docker

Run the complete stack using Docker Compose:

```bash
docker-compose up
```

This starts:

- API server
- Development database
- Test database

Or you can run the databases separately:

```bash
docker-compose up db test-db -d
```

To run manually:

1.Install dependencies:

```bash
pnpm install
```

2. Start databases:

```bash
docker-compose up db test-db -d
```

or fill your database urls in the .env file

3. Prepare the database:

```bash
pnpm db:prepare
```

4. Start server:

```bash
pnpm start
```

or start the server with watch mode

```bash
pnpm dev
```

The GraphQL playground will be available at `http://localhost:4000`

## Testing

To run tests:

```bash
pnpm test
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm test` - Run tests
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - Run TypeScript type checking
- `pnpm db:migrate` - Run database migrations
- `pnpm db:studio` - Open Prisma Studio
- `pnpm generate` - Generate GraphQL types
- `pnpm ci` - Run full CI check suite

## Database Management

- Development database:

  - Prisma Studio: `pnpm db:studio`
  - Run migrations: `pnpm db:migrate`

- Test database:
  - Prisma Studio: `pnpm db:studio:test`
  - Run migrations: `pnpm db:migrate:test`

## GraphQL API

The API provides the following main types:

- `Property`: Represents a property with location and weather data
- `WeatherData`: Real-time weather information for a property
- Queries:
  - `getProperties`: List properties with filtering and sorting
  - `getProperty`: Get a single property by ID
- Mutations:
  - `createProperty`: Create a new property
  - `updateProperty`: Update an existing property
  - `deleteProperty`: Delete a property

## License

ISC
