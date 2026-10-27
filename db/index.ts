import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || '';

let client: postgres.Sql | null = null;
let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null;

if (connectionString) {
  client = postgres(connectionString, {
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
  });
  dbInstance = drizzle(client, { schema });
} else {
  // Graceful stub for build environments where DB is not connected yet
  console.warn('[DB] DATABASE_URL is not set. Database operations will be mocked or skipped.');
}

export const db = dbInstance as ReturnType<typeof drizzle<typeof schema>>;
export { schema };
