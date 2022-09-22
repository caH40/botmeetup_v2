import { adminVerify } from './admin-verify.js';

export async function editCity(ctx) {
	try {
		const isAdmin = await adminVerify(ctx);
	} catch (error) {
		console.log(error);
	}
}
