// import React from 'react';
import { action, observable, makeObservable } from 'mobx';

import { isFunction } from 'util/isFunction';
import { isFocusable } from 'util/isFocusable';

class MagicModalStore {
	constructor(linkEventStore = {}) {
		makeObservable(this, {
			alterModal: action.bound,
			model: observable.ref,
			closeModal: action.bound,
			openModal: action.bound,
			resetModal: action.bound,
			scrollToTop: action.bound,
			setIsLoading: action.bound,
			getClosestFocusableParent: action.bound
		});
		this.linkEventStore = linkEventStore;
	}

	alterModal(modalSettings) {
		Object.assign(this.model, modalSettings);
	}

	focusElement = null;

	model;

	closeModal() {
		const focusEl = typeof this.model.onCloseFocusElement === 'object'
			? this.model.onCloseFocusElement
			: document.querySelector(this.model.onCloseFocusElement);

		if (isFunction(this.model.onCloseModal)) {
			this.model.onCloseModal();
		}
		this.model.isOpen = false;
		this.model.alignToTopOfWindow = false;

		if (focusEl) {
			// Get nearest focusable parent if event target is not focusable
			const focusableElement = this.getClosestFocusableParent(focusEl);
			if (focusableElement) {
				focusableElement.focus();
				// iOS safari doesn't automatically scroll to focused <button> elements, so we call scrollIntoViewIfNeeded when possible
				if (focusableElement.scrollIntoViewIfNeeded) {
					focusableElement.scrollIntoViewIfNeeded();
				}
			}
		}
	}

	setIsLoading(isLoading) {
		this.model.isLoading = isLoading;
	}

	openModal(modalSettings, event = {}) {
		// activeElement will not work in iOS
		const onCloseFocusElement = event?.target || document.activeElement || null;

		this.resetModal();
		this.alterModal({
			onCloseFocusElement,
			...modalSettings,
		});
		this.model.isOpen = true;
	}

	resetModal() {
		Object.assign(this.model, this.model.defaults);
	}

	scrollToTop() {
		if (this.model.isOpen) {
			window.scrollTo(0, this.model.marginTop);
		}
	}

	getClosestFocusableParent(element) {
		const { parentElement = undefined } = element;

		if (isFocusable(element)) {
			this.focusElement = element;
			return this.focusElement;
		}
		if (parentElement) {
			this.getClosestFocusableParent(parentElement);
		}

		this.focusElement = null;
		return null;
	}
}

export { MagicModalStore };
