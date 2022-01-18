import { FullScreenModal } from 'components/MagicModal/Components/FullScreenModal';
import styles from '#/media-set/media-set.module.scss';

export const openModalMediaCriteria = '(max-width: 40em)';

export const mediaModalSettings = {
	id: 'media-set-fullscreen',
	width: '100%',
	maxWidth: '100%',
	showHeader: false,
	showCloseButton: false,
	showOverlay: false,
	absoluteScrollTop: 0,
	WrapperComponent: FullScreenModal,
};

export const mediaFullscreenProps = {
	counterClassName: styles['media-counter'],
	hideMediaMainLinks: true,
	infinite: false,
	mainHeight: 650,
	mainWidth: 1200,
	showDriftZoom: true,
	sliderClassName: 'tw-h-screen',
};

// MEDAI SET
export const mediaSetModalSettings = {
	...mediaModalSettings,
	title: 'Fullscreen media',
};

export const mediaSetDetailProps = {
	numDotsToShow: 7,
	mainHeight: 400,
	mainWidth: 675,
	showArrowsForMedium: true,
	showDimensions: true,
	trLinkEventCompType: 'product details media viewer',
};

export const mediaSetDetailFullscreenProps = {
	...mediaSetDetailProps,
	...mediaFullscreenProps,
	showDimensions: false,
};

// MEDIA DIMENSIONS
export const mediaSetDimensionsProps = {
	numDotsToShow: 7,
	mainHeight: 400,
	mainWidth: 750,
	showArrowsForMedium: true,
	showDotsForMedium: true,
	trLinkEventCompType: 'product dimensions media viewer',
};

// MEDIA ENVIRONMENT
export const mediaSetEnvironmentModalSettings = {
	...mediaModalSettings,
	title: 'Media Viewer',
};

export const mediaSetEnvironmentProps = {
	numDotsToShow: 7,
	mainHeight: 520,
	mainWidth: 778,
	showArrowsForMedium: true,
	showDotsForMedium: true,
	trLinkEventCompType: 'product environment media viewer',
};

export const mediaSetEnvironmentFullscreenProps = {
	...mediaSetEnvironmentProps,
	...mediaFullscreenProps,
};

// MEDIA VIDEO
export const mediaSetVideoProps = {
	mainHeight: 520,
	mainWidth: 778,
	showThumbnailsForSmall: true,
	touchMove: false,
};
