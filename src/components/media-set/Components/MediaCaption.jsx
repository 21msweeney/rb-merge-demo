import { observer } from 'mobx-react';
import React from 'react';
import classNames from 'classnames';

import styles from 'components/media-set/Components/media-caption.module.scss';
import { MediaSetVariants } from 'components/media-set/helpers/MediaSetVariants';

export const MediaCaption = observer((props = {}) => {
	const {
		mediaModel: {
			caption = '',
		} = {},
		variant = MediaSetVariants.DEFAULT,
	} = props;

	const placeholder = (
		<>&nbsp;</>
	);

	return (
		<div
			className={
				classNames(`${styles['media-caption']}`, {
					[styles[variant]]: variant !== MediaSetVariants.DEFAULT,
				})
			}
			aria-hidden="true"
		>
			{caption || placeholder}
		</div>
	);
});
