import { MediaModelFactory } from 'components/media-set/Models/Media.model';

export const createMediaModel = ({ mediaData = {} }) => {
	const mediaModel = MediaModelFactory.create(mediaData);

	return mediaModel;
};

export const createMediaModels = ({ mediaSetData = [] }) => {
	const mediaModels = mediaSetData.map(mediaData => createMediaModel({ mediaData }));

	return mediaModels;
};
