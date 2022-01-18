import classNames from 'classnames';
import { observer } from 'mobx-react';
import React from 'react';

import { MediaSetSlider } from 'components/media-set/Components/MediaSetSlider';
import { MediaCaption } from 'components/media-set/Components/MediaCaption';

import styles from 'components/media-set/Components/media-set.module.scss';

export const MediaSet = observer((props = {}) => {
	const {
		mediaSetModel: {
			hasCaption = false,
			isMediaSetOverrideActive = false,
			selectedMediaModel = 0,
		} = {},
		mediaSetOverride,
		variant,
		trLinkEventCompType,
		trLinkEventCompName,
	} = props;

	return (
		<div
			className={
				classNames(styles['media-set'], {
					'media-set-has-caption': hasCaption,
					[styles['media-set-override']]: isMediaSetOverrideActive,
				})
			}
			data-qa="media-set"
			data-adobe-region="Media Carousel"
			data-adobe-variant={variant}
			data-tr-link-event-comp-name={trLinkEventCompName}
			data-tr-link-event-comp-type={trLinkEventCompType}
		>
			<p className="tw-sr-only">
				This section of the page contains a carousel that visually displays various linked images one at a time. For screen reader users, these images appear in a list below. Selecting the links changes the main slide visually.
			</p>
			{
				mediaSetOverride && (
					<div
						className={
							classNames({
								'tw-block': isMediaSetOverrideActive,
								'tw-hidden': !isMediaSetOverrideActive,
							})
						}
					>
						{mediaSetOverride}
					</div>
				)
			}
			<MediaSetSlider {...props} />
			{
				hasCaption && (
					<div className="md:tw-hidden tw-hidden-for-print">
						<MediaCaption mediaModel={selectedMediaModel} />
					</div>
				)
			}
		</div>
	);
});
