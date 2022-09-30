// 🌞
import { emptyButtonWeather } from '../empty.js';

export async function handlerMainMenuWeather(ctx, cbqData) {
	if (cbqData.includes('***')) {
		await emptyButtonWeather(ctx, cbqData);
		return;
	}
	locationStart_;
}
