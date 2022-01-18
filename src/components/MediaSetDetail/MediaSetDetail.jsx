import React, { useRef } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import { useProductContext } from 'product/SharedProduct.context';
import { MediaControlCylindo } from './MediaControlCylindo';
import { MediaControlFullscreenClose, MediaControlFullscreenOpen } from 'components/media-set/Components/MediaControlFullscreen';
import { MediaCylindo } from './MediaControlCylindo';
import { MediaSet } from './MediaSet';
// import {
// 	mediaSetDetailFullscreenProps,
// 	mediaSetDetailProps,
// 	mediaSetModalSettings,
// 	openModalMediaCriteria,
// } from '~/product/common/media-set/media-set.constants';
import { useGlobalContext } from 'global/Contexts/Global.context';

import styles from './media-set-detail.module.scss';

export const MediaSetDetail = observer((props) => {
	const { hideMediaCylindo = false } = props;

	const {
		magicModal
	} = useGlobalContext();

	// unbox selectedMediaIndex at initialization time - we don't want initialSlide prop to be observable
	// const {
	// 	mediaCylindoModel = {},
	// 	mediaCylindoStore = {},
	// 	mediaSetDetailModel = {},
	// 	mediaSetDetailModel: {
	// 		hasMediaModels = false,
	// 		selectedMediaIndex = 0,
	// 	} = {},
	// 	mediaSetDetailStore = {},
	// 	productCommons: {
	// 		printModule = {}
	// 	},
	// 	productGroupModel: {
	// 		name: groupName,
	// 	} = {},
	// 	productModel: {
	// 		longSalesText: productName,
	// 		salesText: shortProductName,
	// 	} = {},
	// 	styliticsModel: {
	// 		styliticsWidgetDidLoad,
	// 		styliticsId,
	// 		styliticsSku,
	// 		styliticsWidgetIsHidden,
	// 	} = {},
	// } = useProductContext();

	// if (!hasMediaModels) {
	// 	return null;
	// }

	// const mediaControlFullscreenRef = useRef();
	// const jumpLinkRef = useRef();

	// const scrollToID = (event) => {
	// 	event.preventDefault(); // prevent default anchor tag onclick scroll behavior
	// 	if (styliticsId) {
	// 		const targetElement = document.getElementById(styliticsId);
	// 		targetElement.tabIndex = 0; // make targetElement focusable
	// 		targetElement.focus({ preventScroll: true }); // prevent focus from scrolling before smooth scroll finishes
	// 		// TODO: figure out better solution for scrolling after elem with scrollContainerClass enlarges
	// 		window.scroll({ top: 1 }); // prime product row height by scrolling (TwoColumnScroll only enlarges elem with class scrollContainerClass after a scroll)
	// 		setTimeout(() => targetElement.scrollIntoView({ behavior: 'smooth' }), 100); // wait for elem with scrollContainerClass to finish getting new height
	// 	}
	// };

	// const mediaSetOverrideBeforeChange = (mediaSetState) => {
	// 	const { nextIndex = null } = mediaSetState;

	// 	if (jumpLinkRef.current) {
	// 		// on mobile, only the first slide should have the jumpLink
	// 		jumpLinkRef.current.className = classNames(styles['stylitics-jump-link'], { [styles['mobile-hidden']]: nextIndex !== 0 });
	// 	}
	// 	if (mediaCylindoStore.setIsCylindoActive) {
	// 		mediaCylindoStore.setIsCylindoActive(false);
	// 	}

	// 	mediaSetDetailStore.setIsMediaSetOverrideActive(false);
	// };

	// const mediaControlsFullscreen = (
	// 	<>
	// 		<MediaControlCylindo
	// 			mediaSetStore={mediaSetDetailStore}
	// 			mediaCylindoStore={mediaCylindoStore}
	// 			mediaCylindoModel={mediaCylindoModel}
	// 		/>
	// 		<MediaControlFullscreenClose onClick={magicModal.closeModal} />
	// 	</>
	// );

	// const mediaSetOverrideFullscreen = (
	// 	<MediaCylindo
	// 		mediaCylindoId="media-cylindo-fullscreen"
	// 		tooltipDragText="Drag to rotate. Click to zoom."
	// 		tooltipZoomText="Move mouse to pan"
	// 		mediaCylindoModel={mediaCylindoModel}
	// 		zoom={true}
	// 	/>
	// );

	// const openFullScreenModal = () => {
	// 	// unbox selectedMediaIndex at initialization time - we don't want initialSlide prop to be observable
	// 	const { selectedMediaIndex: selectedMediaIndexFullscreen = 0 } = mediaSetDetailModel;
	// 	if (!window.matchMedia(openModalMediaCriteria).matches) { // remove openModalMediaCriteria when removing PRODUCT_PAGE_FULL_SCREEN_MODAL_ALLOW_ZOOM (if there are no other instances of use)
	// 		magicModal.openModal({
	// 			...mediaSetModalSettings,
	// 			alignToTopOfWindow: true,
	// 			content: {
	// 				children: (
	// 					<div
	// 						className={styles['media-set-detail-fullscreen']}
	// 						data-qa="media-set-detail-fullscreen"
	// 					>
	// 						<MediaSet
	// 							{...mediaSetDetailFullscreenProps}
	// 							allowPinchZoom={true}
	// 							initialSlide={selectedMediaIndexFullscreen}
	// 							mediaControls={mediaControlsFullscreen}
	// 							mediaSetModel={mediaSetDetailModel}
	// 							mediaSetOverride={mediaSetOverrideFullscreen}
	// 							mediaSetOverrideBeforeChange={mediaSetOverrideBeforeChange}
	// 							mediaSetStore={mediaSetDetailStore}
	// 							showDots= {!window.matchMedia(openModalMediaCriteria).matches}
	// 							showArrowsForSmall={true}
	// 							trLinkEventCompName={groupName || productName || shortProductName}
	// 						/>
	// 					</div>
	// 				),
	// 			},
	// 		});
	// 	}
	// };

	// const mediaControls = (
	// 	<>
	// 		<MediaControlCylindo
	// 			mediaSetStore={mediaSetDetailStore}
	// 			mediaCylindoStore={mediaCylindoStore}
	// 			mediaCylindoModel={mediaCylindoModel}
	// 		/>
	// 		<MediaControlFullscreenOpen
	// 			buttonRef={mediaControlFullscreenRef}
	// 			hideForSmall={true}
	// 			onClick={openFullScreenModal}
	// 		/>
	// 	</>
	// );

	// const mediaSetOverride = (
	// 	<>
	// 		{
	// 			!hideMediaCylindo && (
	// 				<MediaCylindo
	// 					mediaCylindoModel={mediaCylindoModel}
	// 				/>
	// 			)
	// 		}
	// 	</>
	// );

	return (
		<div
			aria-label="Product detail media carousel"
			// className={`${styles['media-set-detail']} ${printModule['print-media-set-detail']}`}
			data-qa="media-set-detail"
			role="region"
		>
			{/* <MediaSet
				{...mediaSetDetailProps}
				appendBeforeMediaControls={
					styliticsWidgetDidLoad && styliticsSku && !styliticsWidgetIsHidden && <div className="tw-relative">
						<a
							data-tr-link-event-name="stylitics jump link"
							data-qa="stylitics-jump-link"
							ref={jumpLinkRef}
							className={`${styles['stylitics-jump-link']} tw-hidden-for-print`}
							href={`#${styliticsId}`}
							onClick={scrollToID}
						>
							How to Style It
							<div className={styles['caret']} />
						</a>
					</div>

				}
				initialSlide={selectedMediaIndex}
				mediaControls={mediaControls}
				mediaMainOnClick={openFullScreenModal}
				mediaSetModel={mediaSetDetailModel}
				mediaSetOverride={mediaSetOverride}
				mediaSetOverrideBeforeChange={mediaSetOverrideBeforeChange}
				mediaSetStore={mediaSetDetailStore}
				trLinkEventCompName={groupName || productName || shortProductName}
				variant="Product Detail"
			/> */}
		</div>
	);
});
