import { db } from '$lib/server/db';
import { votes } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';

export async function submitVote(data: {
	theme: string;
	color1: string;
	color2: string;
	chosenColor: string;
	userAgent: string | null;
}) {
	try {
		await db.insert(votes).values({
			theme: data.theme,
			color1: data.color1,
			color2: data.color2,
			chosenColor: data.chosenColor,
			userAgent: data.userAgent
		});
		console.log('Yippee we submitted the vote for color', data.chosenColor);
		return { success: true };
	} catch (error) {
		console.error('Failed to submit vote:', error);
		return fail(500, { error: 'Failed to submit vote' });
	}
}
