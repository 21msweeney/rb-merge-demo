import { observer } from 'mobx-react';
import React from 'react';

import { sitePath } from 'global/global.constants';
import { addToUrl } from 'util/addToUrl';

import styles from '../media-link-shop-this-room.module.scss';

export const MediaLinkShopThisRoom = observer((props = {}) => {
	const {
		mediaModel: {
			selected = false,
		} = {},
		link: {
			href = '',
		} = {},
	} = props;

	return (
		<a
			className={styles['media-link-shop-this-room']}
			data-qa="media-link-shop-this-room"
			data-tr-link-event-name="shop"
			href={addToUrl(href, 'hideRoomNavLinks=true')}
			tabIndex={selected ? 0 : -1}
		>
			<img
				alt=""
				className={styles['media-link-shop-this-room-image']}
				src={`${sitePath}/nextjs-static/img/svgs/shopping-tag.svg`}
			/>
			<span className={styles['media-link-shop-this-room-text']}>
				Shop<span className="tw-sr-only"> products in this image</span>
			</span>
		</a>
	);
});
