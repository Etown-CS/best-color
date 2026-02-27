import { db } from '$lib/server/db';
import { votes } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';

export async function submitVote(data: {
	theme: string;
	color1: string;
	color2: string;
	chosenColor: string;
	userAgent: string | null;
	uaBrowser: string | undefined;
	uaEngine: string | undefined;
	uaOS: string | undefined;
	uaDeviceModel: string | undefined;
	uaDeviceVendor: string | undefined;
	uaDeviceType: string | undefined;
	uaCPUArch: string | undefined;
}) {
	try {
		await db.insert(votes).values({
			theme: data.theme,
			color1: data.color1,
			color2: data.color2,
			chosenColor: data.chosenColor,
			userAgent: data.userAgent,
			uaBrowser: data.uaBrowser,
			uaEngine: data.uaEngine,
			uaOS: data.uaOS,
			uaDeviceModel: data.uaDeviceModel,
			uaDeviceVendor: data.uaDeviceVendor,
			uaDeviceType: data.uaDeviceType,
			uaCPUArch: data.uaCPUArch
		});
		console.log('Yippee we submitted the vote for color', data.chosenColor);
		return { success: true };
	} catch (error) {
		console.error('Failed to submit vote:', error);
		return fail(500, { error: 'Failed to submit vote' });
	}
}
