import { db } from '$lib/server/db/index';
import { votes } from '$lib/server/db/schema';
import { count, desc, sql } from 'drizzle-orm';

export const load = async () => {
	try {
		// Get total votes
		const [total] = await db.select({ count: count() }).from(votes);

		// Get most popular color
		const [popular] = await db
			.select({
				color: votes.chosenColor,
				count: sql<number>`count(*)`
			})
			.from(votes)
			.groupBy(votes.chosenColor)
			.orderBy(desc(sql<number>`count(*)`))
			.limit(1);

		// Get recent votes
		const recent = await db.select().from(votes).orderBy(desc(votes.createdAt)).limit(10);

		// Simple browser detection
		const browsers: Record<string, number> = {};
		if (recent.length > 0) {
			recent.forEach((vote) => {
				if (!vote.userAgent) return;
				const ua = vote.userAgent;
				if (ua.includes('Chrome')) browsers['Chrome'] = (browsers['Chrome'] || 0) + 1;
				else if (ua.includes('Firefox')) browsers['Firefox'] = (browsers['Firefox'] || 0) + 1;
				else if (ua.includes('Safari')) browsers['Safari'] = (browsers['Safari'] || 0) + 1;
				else browsers['Other'] = (browsers['Other'] || 0) + 1;
			});
		}

		return {
			totalVotes: total?.count || 0,
			mostPopularColor: popular?.color || null,
			mostPopularColorCount: popular?.count || 0,
			browserInfo: { browsers },
			recentVotes: recent
		};
	} catch (error) {
		console.error('Error loading results:', error);
		return {
			totalVotes: 0,
			mostPopularColor: null,
			mostPopularColorCount: 0,
			browserInfo: { browsers: {} },
			recentVotes: []
		};
	}
};
