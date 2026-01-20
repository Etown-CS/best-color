import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.userAgent = event.request.headers.get('user-agent');

	const response = await resolve(event);
	return response;
};
