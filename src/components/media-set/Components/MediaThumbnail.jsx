import classNames from 'classnames';
import { observer } from 'mobx-react';
import React from 'react';

import { Media } from 'components/media-set/Components/Media';
import { noop } from 'util/noop';
import { MediaSetVariants } from 'components/media-set/helpers/MediaSetVariants';
import styles from './media-thumbnail.module.scss';

export const MediaThumbnail = observer((props = {}) => {
	const {
		hideSelected = false,
		mediaComponentsOverride = {},
		mediaModel = {},
		mediaModel: {
			index = 0,
			selected = false,
		} = {},
		mediaSetModel: {
			mediaModelsCount = 0,
		} = {},
		onClick = noop,
		showDotsForMedium = false,
		showThumbnailsForSmall = false,
		thumbnailHeight = 0,
		thumbnailIndex = 0,
		thumbnailWidth = 0,
		variant = MediaSetVariants.DEFAULT,
	} = props;

	const buttonProps = {
		'aria-current': selected || null,
		'data-qa': `media-thumbnail-${index}`,
		'data-tr-link-event-comp-position': `${index + 1}:${mediaModelsCount}`,
		'data-tr-link-event-name': `${showDotsForMedium ? 'dot' : 'thumbnail'} navigation`,
		'data-tr-link-event-track': selected ? false : null,
		'aria-hidden': !selected,
		'onClick': onClick,
		'className': classNames(`${styles['media-thumbnail']} slide-dependent-button`, {
			[styles['media-thumbnail-selected']]: !hideSelected && selected,
			[styles[variant]]: variant !== MediaSetVariants.DEFAULT,
		}),
	};

	return (
		<button
			{ ...buttonProps }
		>
			<span className="tw-sr-only">
				View media {thumbnailIndex + 1} of {mediaModelsCount}
			</span>
			{
				(!showDotsForMedium || showThumbnailsForSmall) && (
					<Media
						allowShopThisRoom={false}
						forceLoad={true}
						imageHeight={thumbnailHeight}
						imagePreset="$more$"
						imageWidth={thumbnailWidth}
						isMediaThumbnail={true}
						mediaComponentsOverride={mediaComponentsOverride}
						mediaModel={mediaModel}
					/>
				)
			}
		</button>
	);
});
