import { isString } from 'util/isString';

export const isFocusable = (elem) => {
	const focusableElemList = [
		'a[href]',
		'area[href]',
		'input:not([disabled])',
		'select:not([disabled])',
		'textarea:not([disabled])',
		'button:not([disabled])',
		'iframe',
		'object',
		'embed',
		'*[tabindex]',
		'*[contenteditable]',
		'.u-forceFocusable',
	].join(', ');
	let computedStyle;
	let matchesFocusables;
	let hasAWidth;
	let isNotHidden;
	let isVisuallyVisible;

	if (!elem) {
		return false;
	}
	try {
		let theElem = elem;

		if (theElem.length === 0) {
			return false;
		}
		if (isString(theElem)) {
			theElem = document.querySelector(theElem);
		} else if (theElem.length) {
			theElem = elem?.get?.(0) || elem[0];
		}
		computedStyle = getComputedStyle(theElem);
		matchesFocusables = theElem.matches(focusableElemList);
		hasAWidth = Boolean(parseFloat(theElem.getBoundingClientRect().width));
		isNotHidden = computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden';
		isVisuallyVisible = theElem.offsetWidth > 0 || theElem.offsetHeight > 0 || theElem.getClientRects().length > 0;
	} catch (error) {
		return false;
	}
	return matchesFocusables && hasAWidth && isNotHidden && isVisuallyVisible;
};
