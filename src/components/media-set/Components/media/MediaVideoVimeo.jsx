import axios from 'axios';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import { MagicVimeoPlayer } from 'components/MagicVimeoPlayer/MagicVimeoPlayer';

import styles from './media-video-vimeo.module.scss';

export const MediaVideoVimeo = observer((props = {}) => {
	const {
		imageHeight = 0,
		imageWidth = 0,
		mediaModel: {
			fileName = '',
		} = {},
		showMediaPlayer = false,
	} = props;

	if (showMediaPlayer) {
		return (
			<div className={styles['media-video-vimeo']}>
				<MagicVimeoPlayer
					id={fileName}
					width={imageWidth}
				/>
			</div>
		);
	}

	const [duration, setDuration] = useState('');

	const [thumbnailUrl, setThumbnailUrl] = useState('');

	const vimeoApEndpoint = 'https://vimeo.com/api/oembed.json';

	const vimeoUrlParam = `https://api.vimeo.com/${fileName}`;

	useEffect(() => {
		let didUnmount = false;

		const customAxios = axios.create({ withCredentials: false });

		delete customAxios.defaults.headers.common['X-Requested-With'];

		delete customAxios.defaults.headers.common['rnb-is-mobile'];

		delete customAxios.defaults.headers.common['True-Client-IP'];

		delete customAxios.defaults.headers.common['X-Bypass-Ratelimiting'];

		delete customAxios.defaults.headers.common['X-Forwarded-For'];

		customAxios.get(vimeoApEndpoint, {
			params: { url: vimeoUrlParam }
		}).then(({ data = {} }) => {
			const {
				duration: durationData = 0,
				thumbnail_url: thumbnailUrlData = '',
			} = data;

			const hours = Math.floor(durationData / 60 / 60);

			const minutes = Math.floor(durationData / 60) - (hours * 60);

			const seconds = durationData % 60;

			const hoursString = hours ? `${hours}:` : '';

			if (!didUnmount) {
				setDuration(`${hoursString}${minutes}:${seconds}`);

				setThumbnailUrl(thumbnailUrlData.split('_')[0]);
			}
		});

		return () => {
			didUnmount = true;
		};
	}, []);

	const srcAttr = `${thumbnailUrl}_${imageWidth}x${imageHeight}.jpg`;

	const srcSetAttr = `${thumbnailUrl}_${imageWidth * 2}x${imageHeight * 2}.jpg`;

	return (
		<div className={styles['media-video-vimeo']}>
			{thumbnailUrl && <img
				alt=""
				src={srcAttr}
				srcSet={`${srcSetAttr} 2x`}
			/>}
			<span className={styles['media-video-vimeo-duration']}>
				<span className="tw-sr-only">Video item duration </span>{duration}
			</span>
		</div>
	);
});
