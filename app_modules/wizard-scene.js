import { Scenes } from 'telegraf';

export const photoWizard = () => {
	try {
		return new Scenes.WizardScene(
			'getPhoto',
			ctx => {
				ctx.reply('Загрузите картинку в альбомном формате. Для отмены введите /quit');
				ctx.wizard.state.data = {};
				return ctx.wizard.next();
			},
			ctx => {
				if (ctx.message.photo) {
					ctx.deleteMessage(ctx.message.message_id - 1);
					ctx.deleteMessage(ctx.message.message_id);

					ctx.reply('Фотография загружена');
					ctx.session.start[3][0].text = 'Картинка ✔️';
					ctx.session.photoId = ctx.message.photo[2].file_id;
					ctx.scene.leave();
					return ctx.reply('Выберите блок заполнения', {
						reply_markup: { inline_keyboard: ctx.session.start },
					});
				}
				if (!ctx.message.photo && ctx.message.text === '/quit') {
					ctx.scene.leave();
					return ctx.reply('Выберите блок заполнения', {
						reply_markup: { inline_keyboard: ctx.session.start },
					});
				}
				if (!ctx.message.photo && ctx.message && ctx.message.text !== '/quit') {
					ctx.reply('Это не картинка');
				}
			}
		);
	} catch (error) {
		console.log(error);
	}
};

export const descriptionWizard = () => {
	return new Scenes.WizardScene(
		'getDescription',
		ctx => {
			ctx.reply('Опишите детали и необходимые уточнения по заезду. Для отмены введите /quit');
			ctx.wizard.state.data = {};
			return ctx.wizard.next();
		},
		ctx => {
			if (ctx.message.text && ctx.message.text !== '/quit') {
				ctx.deleteMessage(ctx.message.message_id - 1);
				ctx.deleteMessage(ctx.message.message_id);

				ctx.session.start[3][1].text = 'Описание ✔️';
				ctx.session.description = ctx.message.text;
				ctx.scene.leave();
				return ctx.reply('Выберите блок заполнения', {
					reply_markup: { inline_keyboard: ctx.session.start },
				});
			}
			if (ctx.message.text === '/quit') {
				ctx.deleteMessage(ctx.message.message_id - 1);
				ctx.deleteMessage(ctx.message.message_id);

				ctx.scene.leave();
				return ctx.reply('Выберите блок заполнения', {
					reply_markup: { inline_keyboard: ctx.session.start },
				});
			}
		}
	);
};
