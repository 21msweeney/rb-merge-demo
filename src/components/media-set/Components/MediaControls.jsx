import classNames from 'classnames';
import React from 'react';

import { MediaControlsGroup } from 'components/media-set/Components/MediaControlsGroup';
import { MediaDots } from 'components/media-set/Components/MediaDots';
import { MediaThumbnails } from 'components/media-set/Components/MediaThumbnails';

import styles from './media-controls.module.scss';

export const MediaControls = (props = {}) => {
	const {
		dots = [],
		dotWidth = 30,
		isSingleMediaSet = false,
		mediaControls = [],
		numDotsToShow = 1,
		showDotsForMedium = false,
		showThumbnailsForSmall = false,
	} = props;

	return (
		<div className={`${styles['media-controls']} tw-hidden-for-print`}>
			{
				!isSingleMediaSet && (
					<div
						className={
							classNames({
								'md:tw-block': showThumbnailsForSmall,
								'md:tw-hidden': !showDotsForMedium,
								'tw-hidden': showThumbnailsForSmall,
							})
						}
					>
						<MediaDots
							dots={dots}
							numDotsToShow={numDotsToShow}
							dotWidth={dotWidth}
						/>
					</div>
				)
			}
			{
				!isSingleMediaSet && (!showDotsForMedium || showThumbnailsForSmall) && (
					<div
						className={
							classNames({
								'md:tw-block': !showThumbnailsForSmall,
								'md:tw-hidden': showDotsForMedium,
								'tw-hidden': !showThumbnailsForSmall,
							})
						}
					>
						<MediaThumbnails dots={dots} />
					</div>
				)
			}
			<MediaControlsGroup
				isSingleMediaSet={isSingleMediaSet}
				mediaControls={mediaControls}
			/>
		</div>
	);
};
