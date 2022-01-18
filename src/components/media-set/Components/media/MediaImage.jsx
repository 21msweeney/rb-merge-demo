import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

import { addToUrl } from 'util/addToUrl';

let Drift;

export const MediaImage = observer((props = {}) => {
	const {
		imageHeight = 0,
		imagePreset = '',
		imageWidth = 0,
		isZoomed = false,
		mediaModel: {
			altText = '',
			imageUrl = '',
		} = {},
		shouldLoad = false,
		showDriftZoom = false,
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

	return (
		<img
			alt={altText}
			className={classNames({ 'show-drift': showDriftZoom })}
			data-zoom={srcSetAttr}
			ref={mediaImageRef}
			src={finalSrc()}
			srcSet={`${shouldLoad ? srcSetAttr : srcSetAttrPlaceholder} 2x`}
		/>
	);
});
