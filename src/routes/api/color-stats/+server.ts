import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { votes } from '$lib/server/db/schema';
import { sql, desc } from 'drizzle-orm';

export const GET: RequestHandler = async () => {
	try {
		const rows = await db
			.select({
				color: votes.chosenColor,
				count: sql<number>`count(*)::int`
			})
			.from(votes)
			.groupBy(votes.chosenColor)
			.orderBy(desc(sql`count(*)`));

		return json({ rows });
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		throw error(500, `Database query failed: ${message}`);
	}
};
