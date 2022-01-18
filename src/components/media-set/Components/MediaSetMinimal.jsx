import classNames from 'classnames';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';

import { MediaMain } from 'components/media-set/Components/MediaMain';
import { MediaNavNext, MediaNavPrev } from 'components/media-set/Components/MediaNav';
import { noop } from 'util/noop';
import styles from './media-set.module.scss';
import { MediaSetVariants } from 'components/media-set/helpers/MediaSetVariants';

export const MediaSetMinimal = observer((props = {}) => {
	const {
		hideMediaMainLinks = false,
		infinite = true,
		initialSlide = 0,
		mainHeight = 400,
		mainWidth = 600,
		mediaComponentsOverride = {},
		mediaMainOnClick,
		mediaSetModel = {},
		mediaSetModel: {
			isMediaSetOverrideActive = false,
			isSingleMediaSet = false,
			mediaModels = [],
			mediaModelsCount = 0,
			selectedMediaModel = 0,
			selectedMediaIndex = 0,
		} = {},
		mediaSetOverride,
		mediaSetOverrideBeforeChange = noop,
		mediaSetStore = {},
		showArrows = false,
		showCounterForMedium = true,
		showDimensions = false,
		speed = 300,
	} = props;

	const didInitializeRef = useRef(false);

	const mediaSetRef = useRef();

	const settings = {
		arrows: showArrows,
		beforeChange: (prevIndex, nextIndex) => {
			// let react-slick finish animating before triggering a re-render, or it will jank noticeably
			setTimeout(() => {
				runInAction(() => {
					if (mediaModelsCount > nextIndex) {
						mediaSetStore.selectMediaModel(mediaModels[nextIndex]);
					}

					mediaSetOverrideBeforeChange();
				});
			}, 150);
		},
		dots: false,
		infinite: isSingleMediaSet ? false : infinite,
		initialSlide,
		nextArrow: (
			<MediaNavNext
				hideArrows={isMediaSetOverrideActive}
				showArrowsForMedium={showArrows}
				showArrowsForSmall={showArrows}
				variant={MediaSetVariants.SLIDING_THUMBNAILS}
			/>
		),
		prevArrow: (
			<MediaNavPrev
				hideArrows={isMediaSetOverrideActive}
				showArrowsForMedium={showArrows}
				showArrowsForSmall={showArrows}
				variant={MediaSetVariants.SLIDING_THUMBNAILS}
			/>
		),
		// setting slidesToShow to 0 will force the thumbnails to render for the single mediaSet scenario
		slidesToShow: 1,
		speed,
		touchMove: true,
	};

	// keep the slick instance in sync with programmatic selectedMediaIndex changes after intial mount
	useEffect(() => {
		if (didInitializeRef.current) {
			// allow mobx-react observer to finish its re-render before calling slickGoTo
			setTimeout(() => {
				mediaSetRef.current.slickGoTo(selectedMediaIndex);
			}, 200);
		} else {
			didInitializeRef.current = true;
		}
	}, [selectedMediaIndex]);

	return (
		<div
			className={
				classNames(styles['media-set'], {
					[styles['media-set-override']]: isMediaSetOverrideActive,
				})
			}
			data-qa="media-set"
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
			<Slider
				{...settings}
				ref={mediaSetRef}
			>
				{
					mediaModels.map((mediaModel, index) => {
						return (
							<MediaMain
								hideMediaMainLinks={hideMediaMainLinks}
								key={`media-main-${index}`}
								mainHeight={mainHeight}
								mainWidth={mainWidth}
								mediaComponentsOverride={mediaComponentsOverride}
								mediaModel={mediaModel}
								mediaSetModel={mediaSetModel}
								onClick={mediaMainOnClick}
								showCounterForMedium={showCounterForMedium}
								showDimensions={showDimensions}
								showDriftZoom={false}
							/>
						);
					})
				}
			</Slider>
		</div>
	);
});
