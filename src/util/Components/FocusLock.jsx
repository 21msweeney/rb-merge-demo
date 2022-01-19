import React, { useRef, useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import { isFocusable } from 'util/isFocusable';
import { isOnServer } from 'global/global.constants';

export const FocusLock = observer((props) => {
	const focusLockRef = useRef(null);
	const [originallyFocusedElement, setOriginallyFocusedElement] = useState(null);

	// Get all visible focusable elements within the modal.
	const getFocusableElements = (element) => {
		if (!element) {
			return [];
		}
		const childElements = element.querySelectorAll(
			'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]'
		);

		const focusableElements = [];
		[...childElements].forEach((childElement) => {
			if (isFocusable(childElement)) {
				focusableElements.push(childElement);
			}
		});

		return focusableElements;
	};

	const focusEventHandler = (e) => {
		let index;
		let elem;

		// TAB key
		if (e.keyCode === 9) {
			const focusableElements = getFocusableElements(focusLockRef.current);
			const firstFocusedElement = focusableElements[0];
			const lastFocusedElement = focusableElements[focusableElements.length - 1];
			const currentlyFocusedElement = document.activeElement;

			if (e.shiftKey) {
				// Skip over the iframe if it is the last focusable element within the modal.
				// Not sure why we would skip this. Probably caused a bunch of issues typical of iframes.
				if (lastFocusedElement.tagName === 'iframe') {
					index = focusableElements.length - 2;
					if (focusableElements.length <= 1) {
						index = 0;
					}
					elem = focusableElements[index];
					if (elem) {
						elem.focus();
					}
				} else if (currentlyFocusedElement === firstFocusedElement) {
					// We are at the first focusable element, loop around back to the last element.
					if (lastFocusedElement) {
						lastFocusedElement.focus();
					}
					e.preventDefault();
				}
			} else if (currentlyFocusedElement === lastFocusedElement) {
				// We are at the last element, loop around to the first element.
				elem = firstFocusedElement;
				if (elem) {
					elem.focus();
				}
				e.preventDefault();
			}
		}
	};

	// did mount / will unmount
	useEffect(() => {
		if (!isOnServer && !props.isLoading) {
			document.querySelector('body').addEventListener('keydown', focusEventHandler);
			document.querySelector('body').addEventListener('focus', focusEventHandler);

			const targetElement = getFocusableElements(focusLockRef.current);
			setOriginallyFocusedElement(document.activeElement);

			if (targetElement.length) {
				targetElement[0].focus();
			}

			return function cleanup() {
				if (originallyFocusedElement) {
					originallyFocusedElement.focus();
				}

				document.querySelector('body').removeEventListener('keydown', focusEventHandler);
				document.querySelector('body').removeEventListener('focus', focusEventHandler);
			};
		}
	}, [props]);

	return (
		<div className="focus-lock" ref={focusLockRef}>{props.children}</div>
	);
});
