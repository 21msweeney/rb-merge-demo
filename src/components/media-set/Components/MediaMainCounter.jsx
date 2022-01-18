import classNames from 'classnames';
import React from 'react';

import styles from './media-main-counter.module.scss';

export const MediaMainCounter = (props = {}) => {
	const {
		mediaModel: {
			index = 0,
			selected = false,
		} = {},
		mediaModelsCount = 0,
		showCounterForMedium = true,
		className = '',
	} = props;

	return (
		<span
			className={
				classNames(`${styles['media-main-counter']} tw-hidden-for-print`, className, {
					[styles['media-main-counter-selected']]: selected,
					'md:tw-hidden': !showCounterForMedium,
				})
			}
			data-qa={`media-main-counter-${index}`}
		>
			{`${index + 1}/${mediaModelsCount}`}
		</span>
	);
};
