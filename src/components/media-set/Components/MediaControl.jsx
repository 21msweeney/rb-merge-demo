import classNames from 'classnames';
import { observer } from 'mobx-react';
import React from 'react';

import styles from './media-control.module.scss';

export const MediaControl = observer((props = {}) => {
	const {
		children,
		hideForSmall = false,
	} = props;

	return (
		<div
			className={
				classNames(styles['media-control'], {
					[styles['md-media-control-block']]: hideForSmall,
					[styles['media-control-hidden']]: hideForSmall,
				})
			}
		>
			{children}
		</div>
	);
});
