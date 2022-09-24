export async function handlerSubMenu(ctx, cbqData) {
	// редактирование создаваемого объявления
	if (cbData === 'meetEdit') {
		output();
	}
	// обработка данных всех подменю
	if (datain.creatDayArr().includes(cbData)) {
		ctx.session.dateM = getFullDay(cbData);
		ctx.session.start[0][0].text = 'Дата заезда ✔️';
		output();
	}
	if (datain.timesArr.includes(cbData)) {
		ctx.session.timeM = cbData;
		ctx.session.start[0][1].text = 'Время старта ✔️';
		output();
	}
	if (datain.locations.includes(cbData)) {
		ctx.session.locationsM = cbData;
		ctx.session.start[1][0].text = 'Место старта ✔️';
		output();
	}
	if (datain.distanceArr.includes(cbData)) {
		ctx.session.distanceM = cbData;
		ctx.session.start[1][1].text = 'Дистанция, км ✔️';
		output();
	}
	if (datain.speedArr.includes(cbData)) {
		ctx.session.speedM = cbData;
		ctx.session.start[2][0].text = 'Средняя скорость ✔️';
		output();
	}
	if (datain.levelArr.includes(cbData)) {
		ctx.session.levelM = cbData;
		ctx.session.start[2][1].text = 'Сложность заезда ✔️';
		output();
	}
	// блок удаления автором ненужных объявлений с канала объявлений
	if (cbData.includes('ffmi')) {
		await deletePost(cbData, ctx).catch(error => console.log(error));
	}
}
