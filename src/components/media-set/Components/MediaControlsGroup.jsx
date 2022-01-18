import classNames from 'classnames';
import React from 'react';

import styles from './media-controls-group.module.scss';

export const MediaControlsGroup = (props = {}) => {
	const {
		isSingleMediaSet = false,
		mediaControls,
	} = props;

	if (!mediaControls) {
		return null;
	}

	return (
		<div className={
			classNames(styles['media-controls-group'], {
				[styles['media-controls-group-single']]: isSingleMediaSet,
			})
		}>
			{mediaControls}
		</div>
	);
};
