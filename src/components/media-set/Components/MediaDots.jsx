import { observer } from 'mobx-react';
import React from 'react';
import MagicSliderDots from 'react-magic-slider-dots';

import styles from './media-dots.module.scss';

export const MediaDots = observer((props = {}) => {
	const {
		dots = [],
		dotWidth = 30,
		numDotsToShow = 1,
	} = props;

	return (
		<div
			className={styles['media-dots']}
			data-qa="media-dots"
		>
			<MagicSliderDots
				dots={dots}
				dotWidth={dotWidth}
				numDotsToShow={numDotsToShow}
			/>
		</div>
	);
});
