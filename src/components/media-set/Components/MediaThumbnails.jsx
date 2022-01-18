import { observer } from 'mobx-react';
import React from 'react';

import styles from './media-thumbnails.module.scss';

export const MediaThumbnails = observer((props = {}) => {
	const { dots = [] } = props;

	return (
		<ul
			className={styles['media-thumbnails']}
			data-qa="media-thumbnails"
		>
			{dots}
		</ul>
	);
});
