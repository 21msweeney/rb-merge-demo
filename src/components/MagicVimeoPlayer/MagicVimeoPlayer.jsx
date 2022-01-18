import React, { useEffect, useRef } from 'react';
import Player from '@vimeo/player';

import { useGlobalContext } from 'global/Contexts/Global.context';
import { isOnServer } from 'global/global.constants';
// import { VimeoAnalyticsProviderFactory } from '~/lib/adobe/VimeoAnalyticsProvider';
import { noop } from 'util/noop';

export const MagicVimeoPlayer = (props) => {
	const {
		addVimeoPlayer = noop,
		id = '',
		width = 770,
		responsive = false,
		autoplay = false,
		playsinline = true,
		trLinkEventName = 'play',
		trLinkEventCompType = 'vimeo player',
	} = props;

	const {
		linkEventStore,
		featureTogglesModel: {
			isOn = () => false,
		} = {},
	} = useGlobalContext();

	const instanceId = `magic-vimeo-player-${id}`;

	const vimeoPlayerRef = useRef();

	const vimeoPlayeObserverRef = useRef(createInsersectionObserver());

	function createInsersectionObserver() {
		const options = { rootMargin: '200px 0px 200px 0px' };

		if (isOnServer) {
			return null;
		}

		return new IntersectionObserver(handleIntersect, options);
	}

	function createPlayer() {
		const vimeoPlayer = new Player(vimeoPlayerRef.current, {
			id,
			width,
			responsive,
			autoplay,
			playsinline,
		});

		addVimeoPlayer(vimeoPlayer);

		// VimeoAnalyticsProviderFactory.create({
		// 	id,
		// 	vimeoPlayer,
		// });

		if (isOn('ADOBE_LAUNCH_GLOBAL_PROPERTY')) {
			vimeoPlayer.on('play', function () {
				Promise.all([vimeoPlayer.getVideoTitle(), vimeoPlayer.getVideoUrl()]).then((results) => {
					const name = results[0];
					const url = results[1];
					linkEventStore.trackVideo(name, url, trLinkEventName, trLinkEventCompType);
				}).catch((error) => {
					console.error('Error tracking link event, type Video:', error.message);
				});
			});
		}
	}

	function handleIntersect(entries = [], reviewsObserver = {}) {
		const hasIsIntersecting = entries.some(({ isIntersecting = false }) => isIntersecting);

		entries.forEach(({
			isIntersecting = false,
			target = {},
		}) => {
			if (isIntersecting) {
				reviewsObserver.unobserve(target);
			}
		});

		if (hasIsIntersecting) {
			createPlayer();
		}
	}

	useEffect(() => {
		if (vimeoPlayerRef.current && vimeoPlayeObserverRef.current) {
			vimeoPlayeObserverRef.current.observe(vimeoPlayerRef.current);
		}

		return () => vimeoPlayeObserverRef.current && vimeoPlayeObserverRef.current.disconnect;
	}, [vimeoPlayerRef.current]);

	return (
		<div className="magic-vimeo-player-container">
			<div
				className="magic-vimeo-player"
				id={instanceId}
				ref={vimeoPlayerRef}
			></div>
		</div>
	);
};
