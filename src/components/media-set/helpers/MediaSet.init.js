import { createMediaModels } from 'components/media-set/helpers/Media.init';
import { MediaSetModelFactory } from 'components/media-set/Models/MediaSet.model';

export const createMediaSetModel = ({
	mediaModelsHead = [],
	mediaModelsTail = [],
	mediaSetData = [],
}) => {
	const mediaModels = createMediaModels({ mediaSetData });

	const mediaModelsCombined = [
		...mediaModelsHead,
		...mediaModels,
		...mediaModelsTail,
	];

	// normalize the indicies after combining mediaModels
	mediaModelsCombined.forEach((mediaModel, index) => {
		mediaModel.index = index;
	});

	const mediaSetModel = MediaSetModelFactory.create({ mediaModels: mediaModelsCombined });

	return mediaSetModel;
};
