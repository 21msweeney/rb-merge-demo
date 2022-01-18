import React from 'react';

import { s7ContentPath, sitePath } from 'global/global.constants';
import { MediaControl } from 'components/media-set/Components/MediaControl';
import { noop } from 'util/noop';

import styles from './media-control-fullscreen.module.scss';

export const MediaControlFullscreen = (props = {}) => {
	const {
		buttonRef,
		onClick = noop,
		src = '',
	} = props;

	return (
		<button
			className={styles['media-control-fullscreen']}
			onClick={onClick}
			ref={buttonRef}
		>
			<img
				alt=""
				className={styles['media-control-fullscreen-image']}
				src={src}
			/>
			<span className="tw-sr-only">
				View fullscreen media
			</span>
		</button>
	);
};

export const MediaControlFullscreenOpen = (props = {}) => {
	const {
		buttonRef,
		hideForSmall = false,
		onClick = noop,
	} = props;

	return (
		<MediaControl hideForSmall={hideForSmall}>
			<MediaControlFullscreen
				buttonRef={buttonRef}
				dataTrLinkEventName="fullscreen view"
				dataQa="media-control-fullscreen"
				onClick={onClick}
				screenReaderText="View fullscreen media"
				src={`${s7ContentPath}/enlarge`}
			/>
		</MediaControl>
	);
};

export const MediaControlFullscreenClose = (props = {}) => {
	const { onClick = noop } = props;
	return (
		<MediaControl>
			<MediaControlFullscreen
				dataTrLinkEventTrack={false}
				dataQa="media-control-fullscreen-close"
				onClick={onClick}
				screenReaderText="Close fullscreen media"
				src={`${s7ContentPath}/enlarge-close`}
			/>
		</MediaControl>
	);
};
