import classNames from 'classnames';
import { observer } from 'mobx-react';
import React from 'react';

import { noop } from 'util/noop';
import { MediaSetVariants } from 'components/media-set/helpers/MediaSetVariants';
import styles from 'components/media-set/Components/media-nav.module.scss';

const MediaNav = observer((props = {}) => {
	const {
		additionalClassNames = {},
		additionalContainerClassNames = {},
		children,
		className='',
		dataQa = '',
		trLinkEventName = '',
		hideArrows = false,
		onClick = noop,
		scrollerHeight,
		showArrowsForMedium = false,
		showArrowsForSmall = false,
		variant = MediaSetVariants.DEFAULT,
	} = props;

	const customStyles = {};
	const isDisabled = className.includes('disabled');
	const optionalAttributes = {};

	if (scrollerHeight) {
		// 35px == height of nav arrow
		customStyles.top = `${scrollerHeight / 2 - 17}px`;
	}

	if (isDisabled) {
		optionalAttributes.disabled = true;
	}

	return (
		<div
			className={
				classNames(styles['media-nav-container'], 'tw-hidden-for-print', {
					...additionalContainerClassNames,
					[styles[variant]]: variant !== MediaSetVariants.DEFAULT,
					'tw-hidden': hideArrows,
				})
			}
		>
			<button
				{...optionalAttributes}
				className={
					classNames(`${styles['media-nav']} focus:tw-not-sr-only`, {
						...additionalClassNames,
						'md:tw-not-sr-only': showArrowsForMedium,
						'tw-sr-only': !showArrowsForSmall,
					})
				}
				data-qa={dataQa}
				onClick={onClick}
				style={customStyles}
			>
				{children}
			</button>
		</div>
	);
});

export const MediaNavNext = observer((props = {}) => {
	const {
		additionalContainerClassNames = {},
		className = '',
		hideArrows = false,
		onClick = noop,
		scrollerHeight,
		showArrowsForMedium = false,
		showArrowsForSmall = false,
		variant,
	} = props;

	return (
		<MediaNav
			additionalContainerClassNames={additionalContainerClassNames}
			additionalClassNames={{
				[styles['media-nav-next']]: true,
			}}
			className={className}
			dataQa="media-nav-next"
			hideArrows={hideArrows}
			onClick={onClick}
			scrollerHeight={scrollerHeight}
			showArrowsForMedium={showArrowsForMedium}
			showArrowsForSmall={showArrowsForSmall}
			variant={variant}
			trLinkEventName={'right navigation'}
		>
			<span className="tw-sr-only">
				Next item
			</span>
		</MediaNav>
	);
});

export const MediaNavPrev = observer((props = {}) => {
	const {
		additionalContainerClassNames = {},
		className = '',
		hideArrows = false,
		onClick = noop,
		showArrowsForMedium = false,
		showArrowsForSmall = false,
		scrollerHeight,
		variant,
	} = props;

	return (
		<MediaNav
			additionalContainerClassNames={additionalContainerClassNames}
			additionalClassNames={{
				[styles['media-nav-prev']]: true,
			}}
			className={className}
			dataQa="media-nav-prev"
			trLinkEventName={'left navigation'}
			hideArrows={hideArrows}
			onClick={onClick}
			scrollerHeight={scrollerHeight}
			showArrowsForMedium={showArrowsForMedium}
			showArrowsForSmall={showArrowsForSmall}
			variant={variant}
		>
			<span className="tw-sr-only">
				Previous item
			</span>
		</MediaNav>
	);
});
