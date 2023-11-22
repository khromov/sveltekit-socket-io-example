import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load: PageServerLoad = async (event) => {
    //const io = event?.platform?.req?.locals?.io;
    //console.log('request', io);
	return {
		hello: 'world',
	};
};

export const actions = {
	default: async ({ request, platform }) => {
		const data = await request.formData();
		const text = data.get('text');
        const io = platform?.req.locals.io;
        io.emit('chat message', text);
		// console.log('text', text);
	},
} satisfies Actions;