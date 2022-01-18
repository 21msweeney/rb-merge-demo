import { observer } from 'mobx-react';
import React, { useRef } from 'react';

import { Media } from 'components/media-set/Components/Media';
import { noop } from 'util/noop';

import styles from './media-main-button.module.scss';

export const MediaMainButton = observer((props = {}) => {
	const {
		isZoomed = false,
		mainHeight = 0,
		mainWidth = 0,
		mediaComponentsOverride = {},
		mediaModel = {},
		mediaModel: {
			index = 0,
			selected = false,
		} = {},
		mediaSetModel = {},
		mediaSetStore = {},
		onClick = noop,
		showDimensions = false,
		showDriftZoom = false,
		showFullScreenButton = false,
	} = props;

	const clientXRef = useRef(0);

	const clientYRef = useRef(0);

	const eventButtonRef = useRef(0);

	function onMouseDown(event) {
		const {
			button = 0,
			clientX = 0,
			clientY = 0,
		} = event;

		clientXRef.current = clientX;

		clientYRef.current = clientY;

		eventButtonRef.current = button;
	}

	function onMouseUp(event) {
		const {
			clientX = 0,
			clientY = 0,
		} = event;

		const didMove = clientX !== clientXRef.current || clientY !== clientYRef.current;

		if (!didMove && eventButtonRef.current !== 2) {
			// take the click handler out of the event loop so modal focus lock gets set correctly
			setTimeout(onClick, 0);
		}
	}

	return (
		<button
			className={styles['media-main-button']}
			data-qa={`media-main-${index}`}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			tabIndex={selected ? 0 : -1}
		>
			<Media
				imageHeight={mainHeight}
				imagePreset="$prodzoom0$"
				imageWidth={mainWidth}
				isZoomed={isZoomed}
				mediaComponentsOverride={mediaComponentsOverride}
				mediaModel={mediaModel}
				mediaSetModel={mediaSetModel}
				mediaSetStore={mediaSetStore}
				showDimensions={showDimensions}
				showDriftZoom={showDriftZoom}
				showFullScreenButton={showFullScreenButton}
				showMediaPlayer={true}
			/>
			<span className="tw-sr-only">View fullscreen media</span>
		</button>
	);
});
