import { db } from './index';
import { sql } from 'drizzle-orm';

async function migrate() {
	try {
		// Create votes table if it doesn't exist
		await db.execute(sql`
			CREATE TABLE IF NOT EXISTS votes (
				id SERIAL PRIMARY KEY,
        theme TEXT NOT NULL,
				color1 TEXT NOT NULL,
				color2 TEXT NOT NULL,
				chosen_color TEXT NOT NULL,
				user_agent TEXT,
				created_at TIMESTAMP DEFAULT NOW() NOT NULL
			);
		`);

		console.log('Database migration completed successfully');
	} catch (error) {
		console.error('Database migration failed:', error);
		process.exit(1);
	}
}

// Only run if called directly (not in serverless environment)
if (import.meta.url === `file://${process.argv[1]}`) {
	migrate();
}
