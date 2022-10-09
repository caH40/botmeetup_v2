import { chatsMember } from '../app_modules/chat-member.js';

export async function setup(ctx) {
	try {
		const isAdmin = await chatsMember(ctx, 'isAdmin');
		if (!isAdmin) return;

		ctx.scene.enter('setup');
	} catch (error) {
		console.log(error);
	}
}
