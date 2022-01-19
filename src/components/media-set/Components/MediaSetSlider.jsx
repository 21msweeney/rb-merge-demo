import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
// import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import classNames from 'classnames';

import { useGlobalContext } from 'global/Contexts/Global.context';
import { MediaMainCounter } from 'components/media-set/Components/MediaMainCounter';
import { MediaCaption } from 'components/media-set/Components/MediaCaption';
import { MediaControls } from 'components/media-set/Components/MediaControls';
import { MediaMain } from 'components/media-set/Components/MediaMain';
import { MediaNavNext, MediaNavPrev } from 'components/media-set/Components/MediaNav';
import { MediaThumbnail } from 'components/media-set/Components/MediaThumbnail';
import { noop } from 'util/noop';

export const MediaSetSlider = observer((props = {}) => {
	const {
		allowPinchZoom = false,
		appendBeforeMediaControls = null,
		dotWidth = 30,
		counterClassName = '',
		hideMediaMainLinks = false,
		infinite = true,
		initialSlide = 0,
		mainHeight = 400,
		mainWidth = 600,
		mediaComponentsOverride = {},
		mediaControls = [],
		mediaMainOnClick,
		mediaSetModel = {},
		mediaSetModel: {
			hasCaption = false,
			isMediaSetOverrideActive = false,
			isSingleMediaSet = false,
			mediaModels = [],
			mediaModelsCount = 0,
			selectedMediaModel = 0,
			selectedMediaIndex = 0,
		} = {},
		mediaSetOverrideBeforeChange = noop,
		mediaSetStore = {},
		numDotsToShow = 1,
		showArrowsForMedium = false,
		showArrowsForSmall = false,
		showCounterForMedium = false,
		showDimensions = false,
		showDots = true,
		showDriftZoom = false,
		showDotsForMedium = false,
		showThumbnailsForSmall = false,
		slidesToShow = 1,
		sliderClassName = '',
		speed = 300,
		thumbnailHeight = 45,
		thumbnailWidth = 65,
		touchMove = true,
	} = props;

	// const {
	// 	featureTogglesModel: {
	// 		isOn = () => { },
	// 	} = {},
	// } = useGlobalContext();

	const didInitializeRef = useRef(false);
	const mediaSetRef = useRef();
	const [resetZoom, setResetZoom] = useState(null);
	const [canSliderPan, setCanSliderPan] = useState(true);

	const beforeChange = (prevIndex, nextIndex) => {
		if (resetZoom) {
			resetZoom();
			setResetZoom(null);
		}
		setTimeout(() => {
			runInAction(() => {
				if (mediaModelsCount > nextIndex) {
					mediaSetStore.selectMediaModel(mediaModels[nextIndex]);
				}

				mediaSetOverrideBeforeChange({ nextIndex });
			});
		}, 150);
	};

	const settings = {
		appendDots: (dots) => {
			// when slidesToShow is set to 0 for single mediaSet, the library was returning 2 dots.
			// so we need to trim off the last dot when in that scenario
			const dotsToRender = dots.slice(0, mediaModelsCount);

			return (
				<>
					{
						hasCaption && (
							<div className="tw-hidden md:tw-block tw-hidden-for-print">
								<MediaCaption mediaModel={selectedMediaModel} />
							</div>
						)
					}
					{appendBeforeMediaControls}
					<MediaControls
						appendBeforeMediaControls={appendBeforeMediaControls}
						dots={dotsToRender}
						dotWidth={dotWidth}
						isSingleMediaSet={isSingleMediaSet}
						mediaControls={mediaControls}
						numDotsToShow={numDotsToShow}
						showDotsForMedium={showDotsForMedium}
						showThumbnailsForSmall={showThumbnailsForSmall}
					/>
				</>
			);
		},
		arrows: !isSingleMediaSet,
		beforeChange: (prevIndex, nextIndex) => { beforeChange(prevIndex, nextIndex); },
		customPaging: (index) => {
			const hasMediaModelAtIndex = mediaModelsCount > index;

			const mediaModel = hasMediaModelAtIndex ? mediaModels[index] : {};

			return (
				<MediaThumbnail
					hideSelected={isMediaSetOverrideActive}
					mediaComponentsOverride={mediaComponentsOverride}
					mediaModel={mediaModel}
					mediaSetModel={mediaSetModel}
					showDotsForMedium={showDotsForMedium}
					showThumbnailsForSmall={showThumbnailsForSmall}
					thumbnailHeight={thumbnailHeight}
					thumbnailIndex={index}
					thumbnailWidth={thumbnailWidth}
				/>
			);
		},
		dots: showDots,
		draggable: canSliderPan, // is able to change slides through dragging (desktop)
		swipe: canSliderPan, // is able to change slides through swipe mothing (mobile)
		infinite: isSingleMediaSet ? false : infinite,
		initialSlide,
		nextArrow: (
			<MediaNavNext
				hideArrows={isMediaSetOverrideActive}
				showArrowsForMedium={showArrowsForMedium}
				showArrowsForSmall={showArrowsForSmall}
			/>
		),
		prevArrow: (
			<MediaNavPrev
				hideArrows={isMediaSetOverrideActive}
				showArrowsForMedium={showArrowsForMedium}
				showArrowsForSmall={showArrowsForSmall}
			/>
		),
		// setting slidesToShow to 0 will force the thumbnails to render for the single mediaSet scenario
		slidesToShow: isSingleMediaSet ? 0 : slidesToShow,
		speed,
		touchMove: isSingleMediaSet ? false : touchMove,
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
		<Slider {...settings} ref={mediaSetRef}>
			{mediaModels.map((mediaModel, index) => (
				<div
					key={`media-main-${index}`}
					className={classNames(
						'tw-flex tw-items-center tw-mx-auto tw-relative',
						{ 'show-navigation': showDots },
						sliderClassName,
					)}
				>
					{/* {isOn('PRODUCT_PAGE_FULL_SCREEN_MODAL_ALLOW_ZOOM') && allowPinchZoom
						? <TransformWrapper
							disabled={!allowPinchZoom}
							panning={{ disabled: canSliderPan }} // if slider can pan then individual image shouldn't be able to, and vise versa
							onZoomStart={(context) => { setResetZoom(() => context.resetTransform); }}
							onZoomStop={(context) => { setCanSliderPan((context.state.scale <= 1)); }}
						>
							{({ state: { scale } = {} }) => (
								<TransformComponent wrapperClass="tw-overflow-visible tw-mx-auto tw-flex tw-items-center">
									<MediaMain
										allowPinchZoom={allowPinchZoom}
										hideCounter={true}
										hideMediaMainLinks={hideMediaMainLinks}
										isZoomed={scale !== 1}
										mainHeight={mainHeight}
										mainWidth={mainWidth}
										mediaComponentsOverride={mediaComponentsOverride}
										mediaModel={mediaModel}
										mediaSetModel={mediaSetModel}
										onClick={mediaMainOnClick}
										showCounterForMedium={showCounterForMedium}
										showDimensions={showDimensions}
										showDriftZoom={scale === 1 && showDriftZoom}
									/>
								</TransformComponent>
							)}
						</TransformWrapper>
						: <MediaMain
							allowPinchZoom={allowPinchZoom}
							hideCounter={true}
							hideMediaMainLinks={hideMediaMainLinks}
							mainHeight={mainHeight}
							mainWidth={mainWidth}
							mediaComponentsOverride={mediaComponentsOverride}
							mediaModel={mediaModel}
							mediaSetModel={mediaSetModel}
							onClick={mediaMainOnClick}
							showCounterForMedium={showCounterForMedium}
							showDimensions={showDimensions}
							showDriftZoom={showDriftZoom}
						/>

					} */}
					<MediaMain
							allowPinchZoom={allowPinchZoom}
							hideCounter={true}
							hideMediaMainLinks={hideMediaMainLinks}
							mainHeight={mainHeight}
							mainWidth={mainWidth}
							mediaComponentsOverride={mediaComponentsOverride}
							mediaModel={mediaModel}
							mediaSetModel={mediaSetModel}
							onClick={mediaMainOnClick}
							showCounterForMedium={showCounterForMedium}
							showDimensions={showDimensions}
							showDriftZoom={showDriftZoom}
						/>
					{/* Turned off counter for MediaMain component and placed one here for this instance to A) keep count in same place despite zoom and B) keep original styling */}
					<MediaMainCounter
						className={counterClassName}
						mediaModel={mediaModel}
						mediaModelsCount={mediaModelsCount}
						showCounterForMedium={showCounterForMedium}
					/>
				</div>
			))}
		</Slider>
	);
});
