import React from 'react';

import { MediaSetDetail as MediaSetDetailM } from '../MediaSetDetail';

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

const mediaSetDetailProps = {
	numDotsToShow: 7,
	mainHeight: 400,
	mainWidth: 675,
	showArrowsForMedium: true,
	showDimensions: true,
};

export const MediaSetDetail = () => {
	return <MediaSetDetailM mediaSetData={mediaSetData} mediaSetDetailProps={mediaSetDetailProps} />
}