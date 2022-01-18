import React from 'react';

import { s7ContentPath, sitePath } from '~/global/global.constants';
import { MediaControl } from '~/media-set/Components/MediaControl';
import { noop } from '~/util/noop';

import styles from '#/media-set/media-control-fullscreen.module.scss';

import { LinkEventTypes } from '~/tracking/link-event/Models/LinkEvent.model';

export const MediaControlFullscreen = (props = {}) => {
	const {
		buttonRef,
		dataTrLinkEventName = '',
		dataTrLinkEventTrack = null,
		dataQa = '',
		onClick = noop,
		src = '',
	} = props;

	return (
		<button
			className={styles['media-control-fullscreen']}
			data-tr-link-event-name={dataTrLinkEventName}
			data-tr-link-event-track={dataTrLinkEventTrack}
			data-tr-link-event-type={LinkEventTypes.SITE_ACTION}
			data-qa={dataQa}
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