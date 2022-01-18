import { addToUrl } from 'util/addToUrl';

export const scaleLayeredProductImage = (imageUrl, imageWidth, imageHeight) => {
	let formattedImageUrl = '';
	const rgx = (/layer=+\d*/ig);
	const imageUrlArray = imageUrl.split(rgx);

	if (imageUrl.indexOf('layer=') >= 0) {
		imageUrlArray.forEach((urlFragment, index) => {
			let formattedUrlFragment = '';

			if (index === imageUrlArray.length - 1 && imageUrlArray.length > 2) {
				formattedUrlFragment = `layer=${urlFragment}`;
			} else if (index > 0) {
				formattedUrlFragment = `layer=${index - 1}&size=${imageWidth},${imageHeight}&scl=1${urlFragment}`;
			} else {
				formattedUrlFragment = urlFragment;
			}

			formattedImageUrl += formattedUrlFragment;
		});
	} else {
		formattedImageUrl = addToUrl(imageUrl, `size=${imageWidth},${imageHeight}&scl=1`);
	}

	return formattedImageUrl;
};
