// See https://kit.svelte.dev/docs/types#app

import type { Server } from "socket.io";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		interface Platform {
			req: {
				locals: {
					io: Server;
				}
			}
		}
	}
}

export {};
