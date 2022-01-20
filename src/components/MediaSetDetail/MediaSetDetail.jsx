import React, { useRef } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

// import { useProductContext } from 'product/SharedProduct.context';
import { MediaControlCylindo } from './MediaControlCylindo';
import { MediaControlFullscreenClose, MediaControlFullscreenOpen } from 'components/media-set/Components/MediaControlFullscreen';
import { MediaCylindo } from 'components/media-set/Components/MediaCylindo';
import { MediaSet } from './MediaSet';
import { createMediaSetModel } from 'components/media-set/helpers/MediaSet.init';
import {
	mediaSetDetailFullscreenProps,
	mediaSetDetailProps,
	mediaSetModalSettings,
	openModalMediaCriteria,
} from 'components/media-set/helpers/media-set.constants';
import { MagicModal } from 'components/MagicModal/Components/MagicModal';
import { useGlobalContext } from 'global/Contexts/Global.context';

import styles from './media-set-detail.module.scss';

const mediaSetData = [
	{
		fileName: 'cade_232079_s1_16',
		type: 'IMAGE',
	},
	{
		fileName: 'cade_907266_CR_s1_18',
		type: 'IMAGE',
	},
	{
		fileName: 'andre_024463_s1_14',
		type: 'IMAGE',
	},
	{
		fileName: 'andre_798202_20e',
		type: 'IMAGE',
	},
];


export const MediaSetDetail = observer((props) => {
	const { hideMediaCylindo = false } = props;

	const {
		magicModal,
	} = useGlobalContext();

	const mediaData = mediaSetData.map((imageData) => {
		return {
			...imageData,
			hasCaption: true,
			caption: 'Example caption, please remember to Stay Awesome.',
		}
	});

	const detailModel = createMediaSetModel({ mediaSetData: mediaData });


	const mediaSetDetailProps = {
		numDotsToShow: 7,
		mainHeight: 400,
		mainWidth: 675,
		showArrowsForMedium: true,
		showDimensions: true,
	};

	// unbox selectedMediaIndex at initialization time - we don't want initialSlide prop to be observable
	const {
		mediaCylindoModel = {},
		mediaCylindoStore = {},
		mediaSetDetailModel = {},
		mediaSetDetailModel: {
			hasMediaModels = false,
			selectedMediaIndex = 0,
		} = {},
		mediaSetDetailStore = {},
		productCommons: {
			printModule = {}
		} = {},
		productGroupModel: {
			name: groupName,
		} = {},
		productModel: {
			longSalesText: productName,
			salesText: shortProductName,
		} = {},
		styliticsModel: {
			styliticsWidgetDidLoad,
			styliticsId,
			styliticsSku,
			styliticsWidgetIsHidden,
		} = {},
	} = {};


	const mediaControlFullscreenRef = useRef();
	const jumpLinkRef = useRef();

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


	const mediaSetOverrideFullscreen = (
		<MediaCylindo
			mediaCylindoId="media-cylindo-fullscreen"
			tooltipDragText="Drag to rotate. Click to zoom."
			tooltipZoomText="Move mouse to pan"
			mediaCylindoModel={mediaCylindoModel}
			zoom={true}
		/>
	);

	const mediaControlsFullscreen = (
		<>
			<MediaControlCylindo
				mediaSetStore={mediaSetDetailStore}
				mediaCylindoStore={mediaCylindoStore}
				mediaCylindoModel={mediaCylindoModel}
			/>
			<MediaControlFullscreenClose onClick={magicModal.closeModal} />
		</>
	);

	const openFullScreenModal = () => {
		// unbox selectedMediaIndex at initialization time - we don't want initialSlide prop to be observable
		const { selectedMediaIndex: selectedMediaIndexFullscreen = 0 } = detailModel;
		magicModal.openModal({
			...mediaSetModalSettings,
			alignToTopOfWindow: true,
			content: {
				children: (
					<div
						className={styles['media-set-detail-fullscreen']}
						data-qa="media-set-detail-fullscreen"
					>
						<MediaSet
							{...mediaSetDetailFullscreenProps}
							allowPinchZoom={true}
							initialSlide={selectedMediaIndexFullscreen}
							mediaControls={mediaControlsFullscreen}
							mediaSetModel={detailModel}
							mediaSetOverride={mediaSetOverrideFullscreen}
							// mediaSetOverrideBeforeChange={mediaSetOverrideBeforeChange}
							mediaSetStore={mediaSetDetailStore}
							showDots= {!window.matchMedia(openModalMediaCriteria).matches}
							showArrowsForSmall={true}
							trLinkEventCompName={groupName || productName || shortProductName}
						/>
					</div>
				),
			},
		});

	};

	const mediaControls = (
		<>
			<MediaControlCylindo
				mediaSetStore={mediaSetDetailStore}
				mediaCylindoStore={mediaCylindoStore}
				mediaCylindoModel={mediaCylindoModel}
			/>
			<MediaControlFullscreenOpen
				buttonRef={mediaControlFullscreenRef}
				hideForSmall={true}
				onClick={openFullScreenModal}
			/>
		</>
	);

	const mediaSetOverride = (
		<>
			{
				!hideMediaCylindo && (
					<MediaCylindo
						mediaCylindoModel={mediaCylindoModel}
					/>
				)
			}
		</>
	);

	return (
		<div
			aria-label="Product detail media carousel"
			className={`${styles['media-set-detail']} ${printModule['print-media-set-detail']}`}
			data-qa="media-set-detail"
			role="region"
		>
			<MediaSet
				{...mediaSetDetailProps}
				appendBeforeMediaControls={
					<div className="tw-relative">
						<a
							data-tr-link-event-name="stylitics jump link"
							data-qa="stylitics-jump-link"
							className={`${styles['stylitics-jump-link']} tw-hidden-for-print`}
							href='/test'
						>
							How to Style It
							<div className={styles['caret']} />
						</a>
					</div>

				}
				initialSlide={0}
				mediaControls={mediaControls}
				mediaMainOnClick={openFullScreenModal}
				mediaSetModel={detailModel}
				// mediaSetOverride={mediaSetOverride}
				// mediaSetOverrideBeforeChange={mediaSetOverrideBeforeChange}
				mediaSetStore={mediaSetDetailStore}
				variant="Product Detail"
			/>
			<MagicModal />
		</div>
	);
});
