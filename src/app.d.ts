declare global {
	namespace App {
		interface Locals {
			userAgent: string | null;
		}
		interface PageData {
			userAgent: string | null;
		}
		// interface Error {}
		// interface Platform {}
	}
}

export {};
