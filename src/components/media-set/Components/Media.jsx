import { observer } from 'mobx-react';
import React, { useRef } from 'react';

import { mediaComponents } from 'components/media-set/Components/media-components';
import { inRange } from 'util/inRange';

export const Media = observer((props = {}) => {
	const {
		allowShopThisRoom = true,
		forceLoad = false,
		imageHeight = 0,
		imagePreset = '',
		imageWidth = 0,
		isMediaThumbnail = false,
		isZoomed = false,
		mediaComponentsOverride = {},
		mediaModel = {},
		mediaModel: {
			index = 0,
			type = '',
		} = {},
		mediaSetModel,
		mediaSetModel: {
			mediaModelsCount = 0,
			selectedMediaIndex = 0,
		} = {},
		mediaSetStore = {},
		showDimensions = false,
		showDriftZoom = false,
		showFullScreenButton = false,
		showMediaPlayer = false,
	} = props;

	const didLoadRef = useRef(forceLoad);

	const mediaIndexInRange = inRange(index, selectedMediaIndex - 1, selectedMediaIndex + 2);

	const mediaIndexInRangeHead = (index === 0) && (selectedMediaIndex === mediaModelsCount - 1);

	const mediaIndexInRangeTail = (index === mediaModelsCount - 1) && (selectedMediaIndex === 0);

	const shouldLoad = didLoadRef.current || mediaIndexInRange || mediaIndexInRangeHead || mediaIndexInRangeTail;

	didLoadRef.current = shouldLoad;

	let MediaComponent = mediaComponentsOverride[type] || mediaComponents[type];

	if (!MediaComponent) {
		MediaComponent = mediaComponents.IMAGE;

		console.warn(`No media renderer found for "${type}"`);
	}

	return (
		<MediaComponent
			allowShopThisRoom={allowShopThisRoom}
			imageHeight={imageHeight}
			imagePreset={imagePreset}
			imageWidth={imageWidth}
			isMediaThumbnail={isMediaThumbnail}
			isZoomed={isZoomed}
			mediaModel={mediaModel}
			mediaSetModel={mediaSetModel}
			mediaSetStore={mediaSetStore}
			shouldLoad={shouldLoad}
			showDimensions={showDimensions}
			showDriftZoom={showDriftZoom}
			showFullScreenButton={showFullScreenButton}
			showMediaPlayer={showMediaPlayer}
		/>
	);
});
