import { fail } from '@sveltejs/kit';
import { submitVote } from '$lib/server/actions/submit-vote';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const theme = 'dark' as string;
		const color1 = formData.get('color1') as string;
		const color2 = formData.get('color2') as string;
		const chosenColor = formData.get('chosenColor') as string;
		const userAgent = request.headers.get('user-agent');

		if (!color1 || !color2 || !chosenColor) {
			return fail(400, { error: 'Missing required fields' });
		}

		try {
			await submitVote({
				theme,
				color1,
				color2,
				chosenColor,
				userAgent
			});
		} catch (error) {
			return fail(500);
		}
		return { success: true };
	}
};
