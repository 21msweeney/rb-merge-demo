import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';

import styles from './media-cylindo.module.scss';
import { isOnServer } from 'global/global.constants';

export const MediaCylindo = observer((props = {}) => {
	const {
		forceLoad = false,
		mediaCylindoId = 'media-cylindo',
		tooltipDragText = 'Drag to rotate',
		tooltipZoomText = '',
		zoom = false,
		mediaCylindoModel = {},
	} = props;

	const {
		cylindo: cylindoData,
		cylindo: {
			productCode = '',
		} = {},
		cylindoFeatures = [],
		isCylindoActive = false,
	} = mediaCylindoModel;

	const viewerInstanceRef = useRef();

	const [cylindoLoaded, setCylindoLoaded] = useState(!isOnServer && window.cylindo);

	const shouldLoad = !cylindoLoaded && (isCylindoActive || forceLoad);

	function handleLoad() {
		setCylindoLoaded(true);
	}

	function loadViewer() {
		const options = {
			accountID: 4951,
			ARDesktop: true,
			containerID: mediaCylindoId,
			features: cylindoFeatures,
			fullscreen: false,
			missingCombinationErrorText: '',
			productCode,
			thumbs: false,
			tooltipDragText,
			tooltipZoomText,
			zoom,
		};

		if (window.cylindo) {
			window.cylindo.on('ready', (() => {
				viewerInstanceRef.current = window.cylindo.viewer.create(options);
			}));
		}
	}

	function destroyViewer() {
		if (viewerInstanceRef.current) {
			viewerInstanceRef.current.destroy();

			viewerInstanceRef.current = null;
		}
	}

	function updateViewer() {
		if ((forceLoad || isCylindoActive) && cylindoData) {
			loadViewer();
		} else {
			destroyViewer();
		}
	}

	useEffect(updateViewer, [cylindoLoaded, isCylindoActive]);

	useEffect(() => destroyViewer, []);

	return (
		<>
			<div
				className={styles['media-cylindo']}
				data-qa="media-cylindo"
				id={mediaCylindoId}
			/>
			{
				cylindoLoaded && (
					<span
						className="tw-hidden"
						data-qa="cylindo-loaded"
					/>
				)
			}
			{
				// shouldLoad && (
				// 	<Script
				// 		src="https://viewer.cylindo.com/v4/viewer.min.js"
				// 		strategy="lazyOnload"
				// 		onLoad={handleLoad}
				// 	/>
				// )
			}
		</>
	);
});
