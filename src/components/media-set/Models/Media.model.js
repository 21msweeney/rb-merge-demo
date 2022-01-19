import { computed, makeObservable, observable, makeAutoObservable } from 'mobx';

import { s7ImagePath } from 'global/global.constants';

class Media {
	_links

	altText

	caption

	fileName

	hasShopThisRooms

	index

	selected

	type

	shopThisRoomUrl

	constructor() {
		// makeObservable(this, {
		// 	hasCaption: computed,
		// 	imageUrl: computed,
		// 	selected: observable,
		// });
		makeAutoObservable(this);
	}

	get hasCaption() {
		return Boolean(this.caption);
	}

	get imageUrl() {
		return `${s7ImagePath}/${this.fileName}`;
	}
}

export const MediaModelFactory = ({
	create: ({
		_links = {},
		altText = '',
		caption = '',
		fileName = '',
		hasShopThisRooms = false,
		index = 0,
		selected = false,
		type = 'IMAGE',
		shopThisRoomUrl = '',
	}) => {
		const media = new Media();

		Object.assign(media, {
			_links,
			altText,
			caption,
			fileName,
			index,
			selected,
			type,
			hasShopThisRooms,
			shopThisRoomUrl,
		});

		return media;
	},
});
