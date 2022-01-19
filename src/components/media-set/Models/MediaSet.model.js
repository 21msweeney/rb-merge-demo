import { computed, makeObservable, observable, makeAutoObservable } from 'mobx';

class MediaSet {
	isMediaSetOverrideActive

	mediaModels

	constructor() {
		// makeObservable(this, {
		// 	hasCaption: computed,
		// 	hasMediaModels: computed,
		// 	isMediaSetOverrideActive: observable,
		// 	isSingleMediaSet: computed,
		// 	mediaModelHead: computed,
		// 	mediaModels: observable,
		// 	mediaModelsCount: computed,
		// 	selectedMediaIndex: computed,
		// 	selectedMediaModel: computed,
		// });
		makeAutoObservable(this);
	}

	get hasCaption() {
		return this.mediaModels.some(({ hasCaption = false }) => hasCaption);
	}

	get hasMediaModels() {
		return Boolean(this.mediaModelsCount);
	}

	get isSingleMediaSet() {
		return this.mediaModelsCount === 1;
	}

	get mediaModelHead() {
		return this.hasMediaModels ? this.mediaModels[0] : {};
	}

	get mediaModelsCount() {
		return this.mediaModels.length;
	}

	get selectedMediaIndex() {
		const { index = 0 } = this.selectedMediaModel;

		return index;
	}

	get selectedMediaModel() {
		return this.mediaModels.find(({ selected = false }) => selected) || this.firstMediaModel || {};
	}
}

export const MediaSetModelFactory = ({
	create: ({
		isMediaSetOverrideActive = false,
		mediaModels = [],
	}) => {
		const mediaSet = new MediaSet();

		Object.assign(mediaSet, {
			isMediaSetOverrideActive,
			mediaModels,
		});

		return mediaSet;
	},
});
