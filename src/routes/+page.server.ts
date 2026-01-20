import { fail } from '@sveltejs/kit';
import { submitVote } from '$lib/server/actions/submit-vote';
import { generateRandomColor } from '$lib/utils/colors';

export const actions = {
	default: async ({ request, getClientAddress }) => {
		const formData = await request.formData();
		const color1 = formData.get('color1') as string;
		const color2 = formData.get('color2') as string;
		const chosenColor = formData.get('chosenColor') as string;
		const userAgent = request.headers.get('user-agent');

		if (!color1 || !color2 || !chosenColor) {
			return fail(400, { error: 'Missing required fields' });
		}

		const result = await submitVote({
			color1,
			color2,
			chosenColor,
			userAgent
		});

		if (result.error) {
			return fail(500, result);
		}

		return { success: true };
	}
};
