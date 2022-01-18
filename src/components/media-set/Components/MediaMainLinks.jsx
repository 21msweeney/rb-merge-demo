import React from 'react';

import { mediaLinkComponents } from 'components/media-set/Components/media-link-components';

export const MediaMainLinks = (props = {}) => {
	const {
		mediaModel = {},
		mediaModel: {
			_links = {},
		} = {},
	} = props;

	return (
		<>
			{
				Object.entries(_links).map(([key = '', link = {}], index) => {
					const MediaLinkComponent = mediaLinkComponents[key];

					if (!MediaLinkComponent) {
						console.warn(`No media link renderer found for "${key}"`);

						return null;
					}

					return (
						<MediaLinkComponent
							key={`media-link-${index}`}
							link={link}
							mediaModel={mediaModel}
						/>
					);
				})
			}
		</>
	);
};
