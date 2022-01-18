import classNames from 'classnames';
import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';

import { scaleLayeredProductImage } from 'components/media-set/helpers/MediaProduct.utils';
import { addToUrl } from 'util/addToUrl';

let Drift;

export const MediaProduct = observer((props = {}) => {
	const {
		isZoomed = false,
		imageHeight = 0,
		imagePreset = '',
		imageWidth = 0,
		mediaModel: {
			productAltText = '',
			productImageUrl = '',
			productImageUrlWithDimensions = '',
		} = {},
		shouldLoad = false,
		showDimensions = false,
		showDriftZoom = false,
	} = props;

	const driftRef = useRef();

	const mediaProductRef = useRef();

	const productImageUrlToUse = showDimensions ? productImageUrlWithDimensions : productImageUrl;

	const srcRoot = scaleLayeredProductImage(productImageUrlToUse, imageWidth, imageHeight);

	const srcSetRoot = scaleLayeredProductImage(productImageUrlToUse, imageWidth * 2, imageHeight * 2);

	const srcParams = `${imagePreset}&size=${imageWidth},${imageHeight}&scl=1`;

	const srcSetParams = `${imagePreset}&size=${imageWidth * 2},${imageHeight * 2}&scl=1`;

	const srcAttr = addToUrl(srcRoot, srcParams);

	const srcSetAttr = addToUrl(srcSetRoot, srcSetParams);

	const srcAttrPlaceholder = addToUrl(srcAttr, 'qlt=60');

	const srcSetAttrPlaceholder = addToUrl(srcSetAttr, 'qlt=60');

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

		driftRef.current = new Drift(mediaProductRef.current, {
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

		return () => {
			if (driftRef.current) {
				driftRef.current.destroy();
			}
		};
	}, []);

	useEffect(() => {
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
	}, [showDriftZoom]);

	return (
		<img
			alt={productAltText}
			className={classNames({ 'show-drift': showDriftZoom })}
			data-zoom={srcSetAttr} // used for on-hover drift-zoom functionality (on hover src should be the smaller of the two images. This is done to improve inital load times)
			ref={mediaProductRef}
			src={finalSrc()}
			srcSet={`${shouldLoad ? srcSetAttr : srcSetAttrPlaceholder} 2x`}
		/>
	);
});
