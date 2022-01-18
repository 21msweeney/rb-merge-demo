
class MediaSetVariant {
	variantClass

	constructor(variantClass) {
		this.variantClass = variantClass;
	}

	toString() {
		return this.variantClass;
	}
}

export const MediaSetVariants = {
	DEFAULT: new MediaSetVariant('default-variant'),
	SLIDING_THUMBNAILS: new MediaSetVariant('slider-with-nav-thumbnail'),
	MINIMAL: new MediaSetVariant('minimal-slider'),
};
