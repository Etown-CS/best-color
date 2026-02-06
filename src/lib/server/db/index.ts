import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// For Neon, we need to configure the connection properly
const connectionString = process.env.DATABASE_URL!;

// Configure postgres for serverless/Neon
const client = postgres(connectionString, {
	// Neon-specific optimizations
	idle_timeout: 20,
	max_lifetime: 60 * 30,
	prepare: false, // Disable prepared statements for serverless
	ssl: 'require' // Always require SSL for Neon
});

export const db = drizzle(client, { schema });
