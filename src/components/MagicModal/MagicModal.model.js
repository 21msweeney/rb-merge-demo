import { computed, observable, makeObservable } from 'mobx';

import { isNumber } from 'util/isNumber';

export class MagicModalModel {
	absoluteScrollTop;

	alignToTopOfWindow;

	accessibleTitle

	anchorBottom;

	closeButtonText;

	closeModalOnOverlayClick;

	closeModalOnEscKey;

	containerClass

	dropShadow;

	flushSides;

	fullBleed;

	height;

	id;

	initialScrollTop;

	isLoading;

	isOpen;

	keepScrollPosition;

	onOverlayClick;

	onCloseModal;

	onCloseFocusElement;

	reverseCloseButton;

	showCloseButton;

	showOverlay;

	title;

	width;

	maxWidth;

	WrapperComponent;

	defaults = {
		absoluteScrollTop: null,
		alignToTopOfWindow: false,
		accessibleTitle: '',
		anchorBottom: false,
		closeButtonText: 'Close',
		closeModalOnOverlayClick: true,
		closeModalOnEscKey: true,
		containerClass: '',
		dropShadow: false,
		flushSides: false,
		fullBleed: false,
		height: 'auto',
		id: '',
		initialScrollTop: 0,
		isLoading: false,
		isOpen: false,
		keepScrollPosition: false,
		maxWidth: '100%',
		onOverlayClick: null,
		onCloseModal: null,
		onCloseFocusElement: null,
		reverseCloseButton: false,
		showCloseButton: true,
		showHeader: true,
		showOverlay: true,
		title: 'Room & Board',
		// TODO Remove all instances of this field once legacy modal is no longer in use.
		useLegacyWrapper: true,
		width: '90vw',
		WrapperComponent: null,
	}

	constructor() {
		makeObservable(this, {
			absoluteScrollTop: observable,
			alignToTopOfWindow: observable,
			accessibleTitle: observable,
			anchorBottom: observable,
			closeButtonText: observable,
			closeModalOnOverlayClick: observable,
			closeModalOnEscKey: observable,
			containerClass: observable,
			dropShadow: observable,
			flushSides: observable,
			fullBleed: observable,
			height: observable,
			id: observable,
			initialScrollTop: observable,
			isLoading: observable,
			isOpen: observable,
			keepScrollPosition: observable,
			onOverlayClick: observable,
			onCloseModal: observable,
			onCloseFocusElement: observable,
			reverseCloseButton: observable,
			showCloseButton: observable,
			showOverlay: observable,
			title: observable,
			width: observable,
			maxWidth: observable,
			WrapperComponent: observable,
			content: observable.ref,
			heightOutput: computed,
			marginTop: computed,
			widthOutput: computed,
		});

		Object.assign(this, this.defaults);
	}

	content;

	get heightOutput() {
		if (isNumber(this.height)) {
			return `${this.height}px`;
		}
		return this.height;
	}

	get marginTop() {
		const scrollTop = this.scrollTop || 0;

		// deal with integers and append 'px', or take a string for custom 'vh' or 'calc' values
		if (isNumber(this.absoluteScrollTop)) {
			return `${this.absoluteScrollTop}px`;
		}
		if (this.absoluteScrollTop !== null) {
			return this.absoluteScrollTop;
		}
		return `calc(15vh + ${scrollTop}px)`;
	}

	get widthOutput() {
		if (isNumber(this.width)) {
			return `${this.width}px`;
		}
		return this.width;
	}
}
