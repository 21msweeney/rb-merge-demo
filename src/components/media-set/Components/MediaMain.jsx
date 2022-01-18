import React from 'react';

import { MediaMainButton } from 'components/media-set/Components/MediaMainButton';
import { MediaMainCounter } from 'components/media-set/Components/MediaMainCounter';
import { MediaMainLinks } from 'components/media-set/Components/MediaMainLinks';
import { noop } from 'util/noop';
import styles from './media-main.module.scss';

export const MediaMain = (props = {}) => {
	const {
		hideCounter = false,
		hideMediaMainLinks = false,
		isZoomed = false,
		mainHeight = 0,
		mainWidth = 0,
		mediaComponentsOverride = {},
		mediaModel = {},
		mediaSetModel = {},
		mediaSetModel: {
			mediaModelsCount = 0,
		} = {},
		mediaSetStore = {},
		onClick = noop,
		showCounterForMedium = false,
		showDimensions = false,
		showDriftZoom = false,
		showFullScreenButton = false,
	} = props;

	return (
		<div className={`${styles['media-main-container']}`}>
			<div
				className={styles['media-main']}
				data-qa="media-main"
			>
				<MediaMainButton
					isZoomed={isZoomed}
					mainHeight={mainHeight}
					mainWidth={mainWidth}
					mediaComponentsOverride={mediaComponentsOverride}
					mediaModel={mediaModel}
					mediaSetModel={mediaSetModel}
					mediaSetStore={mediaSetStore}
					onClick={onClick}
					showDimensions={showDimensions}
					showDriftZoom={showDriftZoom}
					showFullScreenButton={showFullScreenButton} />
				{
					!hideMediaMainLinks && (
						<MediaMainLinks mediaModel={mediaModel} />
					)
				}
			</div>
			{!hideCounter && <MediaMainCounter
				mediaModel={mediaModel}
				mediaModelsCount={mediaModelsCount}
				showCounterForMedium={showCounterForMedium}
			/>}
		</div>
	);
};
