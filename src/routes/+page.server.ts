import { fail } from '@sveltejs/kit';
import { submitVote } from '$lib/server/actions/submit-vote';

import { UAParser } from 'ua-parser-js';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const theme = formData.get('theme') as string;
		const color1 = formData.get('color1') as string;
		const color2 = formData.get('color2') as string;
		const chosenColor = formData.get('chosenColor') as string;
		const userAgent = request.headers.get('user-agent');
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

		if (!color1 || !color2 || !chosenColor || !userAgent) {
			return fail(400, { error: 'Missing required fields' });
		}

		try {
			await submitVote({
				theme,
				color1,
				color2,
				chosenColor,
				userAgent,
				uaBrowser,
				uaEngine,
				uaOS,
				uaDeviceModel,
				uaDeviceVendor,
				uaDeviceType,
				uaCPUArch
			});
		} catch (error) {
			return fail(500);
		}
		return { success: true };
	}
};
