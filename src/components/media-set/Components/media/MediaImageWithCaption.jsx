import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

import { addToUrl } from 'util/addToUrl';
import {
	mediaSetDetailFullscreenProps,
	mediaSetModalSettings,
} from 'components/media-set/helpers/media-set.constants';
import { useGlobalContext } from 'global/Contexts/Global.context';
import styles from '../media-image.module.scss';
import { MediaControlFullscreen } from 'components/media-set/Components/MediaControlFullscreen';
import { s7ContentPath } from 'global/global.constants';
import { MediaSetMinimal } from 'components/media-set/Components/MediaSetMinimal';

let Drift;

export const MediaImageWithCaption = observer((props = {}) => {
	const { magicModal = {} } = useGlobalContext();

	const {
		imageHeight = 0,
		imagePreset = '',
		imageWidth = 0,
		isMediaThumbnail = false,
		isZoomed = false,
		mediaModel: {
			altText = '',
			caption = '',
			imageUrl = '',
			hasShopThisRooms = false,
			shopThisRoomUrl = '',
			selected = false,
		} = {},
		mediaSetModel = {},
		mediaSetStore = {},
		allowShopThisRoom = true,
		shouldLoad = false,
		showDriftZoom = false,
		showFullScreenButton = false,
	} = props;

	const driftRef = useRef();

	const mediaImageRef = useRef();

	const srcRoot = imageUrl;

	const srcParams = `${imagePreset}&size=${imageWidth},${imageHeight}&scl=1`;

	const srcSetParams = `${imagePreset}&size=${imageWidth * 2},${imageHeight * 2}&scl=1`;

	const srcAttr = addToUrl(srcRoot, srcParams);

	const srcSetAttr = addToUrl(srcRoot, srcSetParams);

	const srcAttrPlaceholder = addToUrl(srcAttr, 'qlt=1');

	const srcSetAttrPlaceholder = addToUrl(srcSetAttr, 'qlt=1');

	const finalSrc = () => {
		let src = null;
		if (shouldLoad) {
			src = isZoomed ? srcSetAttr : srcAttr;
		} else {
			src = srcAttrPlaceholder;
		}
		return src;
	};

	async function importDriftZoom() {
		if (!Drift) {
			Drift = (await import('drift-zoom')).default;
		}

		driftRef.current = new Drift(mediaImageRef.current, {
			hoverDelay: 600,
			inlinePane: true,
			touchDelay: 600,
			zoomFactor: 2,
		});
	}

	useEffect(() => {
		if (showDriftZoom) {
			importDriftZoom();
		}
		if (!showDriftZoom && driftRef.current) {
			driftRef.current.disable();
		}
		if (showDriftZoom && driftRef.current) {
			driftRef.current.enable();
		}
		return () => {
			if (driftRef.current) {
				driftRef.current.destroy();
			}
		};
	}, []);

	const image = (
		<img
			alt={altText}
			className={classNames({ 'show-drift': showDriftZoom })}
			data-zoom={srcSetAttr}
			ref={mediaImageRef}
			src={finalSrc()}
			srcSet={`${shouldLoad ? srcSetAttr : srcSetAttrPlaceholder} 2x`}
		/>
	);

	const imageButtons = [];

	if (showFullScreenButton) {
		const openFullScreenModal = () => {
			// unbox selectedMediaIndex at initialization time - we don't want initialSlide prop to be observable
			const { selectedMediaIndex: selectedMediaIndexFullscreen = 0 } = mediaSetModel;

			magicModal.openModal({
				...mediaSetModalSettings,
				content: {
					children: (
						<div
							className={styles['media-set-detail-fullscreen']}
							data-qa="media-set-detail-fullscreen"
						>
							<MediaSetMinimal
								{...mediaSetDetailFullscreenProps}
								initialSlide={selectedMediaIndexFullscreen}
								// mediaControls={mediaControlsFullscreen}
								mediaSetModel={mediaSetModel}
								// mediaSetOverride={mediaSetOverrideFullscreen}
								// mediaSetOverrideBeforeChange={mediaSetOverrideBeforeChange}
								mediaSetStore={mediaSetStore}
								showArrows={true}
								showCounterForMedium={false}
							/>
						</div>
					),
				},
			});
		};

		imageButtons.push(
			<MediaControlFullscreen
				key="media-control-fullscreen"
				dataQa="media-control-fullscreen-close"
				onClick={openFullScreenModal}
				screenReaderText="Close fullscreen media"
				src={`${s7ContentPath}/enlarge`}
			/>
		);
	}

	if (hasShopThisRooms && allowShopThisRoom) {
		const conditionalButtonAttrs = {};

		if (!selected) {
			conditionalButtonAttrs.tabIndex = '-1';
		}
		imageButtons.push(
			<a
				{ ...conditionalButtonAttrs }
				data-qa="shop-room-button"
				className={`${styles['shop-this-room-link']} slide-dependent-button`}
				href={shopThisRoomUrl}
			>
				<svg role="img" xmlns="http://www.w3.org/2000/svg" id="Layer_1" x="0" y="0" viewBox="0 0 24.77 24.44">
					<path d="M13.71 22.42L2.95 11.66l-1-4.79 5.13-5.13 4.75 1.04 10.75 10.76-8.87 8.88z" />
					<circle cx="6.62" cy="6.46" r="1.25" />
				</svg>
				<span className={styles['shop-this-room-link-text']}>Shop</span>
			</a>
		);
	}

	return (
		<div className={styles['media-image-container']}>
			{image}
			{
				!isMediaThumbnail && (
					<div className="tw-sr-only">
						{caption}
					</div>
				)
			}
			{
				imageButtons.length > 0 && (
					<div className={styles['media-buttons']}>
						{imageButtons}
					</div>
				)
			}
		</div>
	);
});
