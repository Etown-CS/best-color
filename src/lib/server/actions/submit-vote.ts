import { db } from '$lib/server/db';
import { votes } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

import { UAParser } from 'ua-parser-js';

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

export async function updateVote() {
	const result = await db.select().from(votes);
	for (let index = 0; index < result.length; index++) {
		const row = result[index];
		const ID = row.id;
		console.log(ID);
		const userAgent = row.userAgent;
		const { browser, engine, os, device, cpu } = UAParser(userAgent);
		console.log(browser);
		const uaBrowser = browser.name;
		console.log(engine);
		const uaEngine = engine.name;
		console.log(os);
		const uaOS = os.name;
		console.log(device);
		const uaDeviceModel = device.model;
		const uaDeviceVendor = device.vendor;
		const uaDeviceType = device.type;
		console.log(cpu);
		const uaCPUArch = cpu.architecture;

		await db.update(votes).set({ uaBrowser: uaBrowser }).where(eq(votes.id, ID));
		console.log('ok we changed the browser');
		await db.update(votes).set({ uaEngine: uaEngine }).where(eq(votes.id, ID));
		console.log('ok we changed the engine');
		await db.update(votes).set({ uaOS: uaOS }).where(eq(votes.id, ID));
		console.log('ok we changed the OS');
		if (uaDeviceModel != undefined) {
			await db.update(votes).set({ uaDeviceModel: uaDeviceModel }).where(eq(votes.id, ID));
			console.log('ok we changed the device model');
		}
		if (uaDeviceVendor != undefined) {
			await db.update(votes).set({ uaDeviceVendor: uaDeviceVendor }).where(eq(votes.id, ID));
			console.log('ok we changed the device vendor');
		}
		if (uaDeviceType != undefined) {
			await db.update(votes).set({ uaDeviceType: uaDeviceType }).where(eq(votes.id, ID));
			console.log('ok we changed the device type');
		}
		if (uaCPUArch != undefined) {
			await db.update(votes).set({ uaCPUArch: uaCPUArch }).where(eq(votes.id, ID));
			console.log('ok we changed the CPU arch');
		}
	}
}
