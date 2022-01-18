import classNames from 'classnames';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';

import { MagicModalModel } from 'components/MagicModal/MagicModal.model';
import { MagicModalStore } from 'components/MagicModal/MagicModal.store';
import { MediaControl } from 'components/media-set/Components/MediaControl';
import { MediaCylindo } from 'components/media-set/Components/MediaCylindo';

import styles from 'components/media-set/Components/media-control-cylindo.module.scss';

export const MediaControlCylindo = observer((props = {}) => {
	const {
		mediaSetStore = {},
		mediaCylindoModel = {},
		mediaCylindoStore = {},
	} = props;

	const magicModal = new MagicModalStore();
	magicModal.model = new MagicModalModel();

	const {
		cylindo,
		isCylindoActive = false,
	} = mediaCylindoModel;

	if (!cylindo) {
		return null;
	}

	function handleClick(event) {
		event.stopPropagation();

		if (window.matchMedia('(max-width: 40em)').matches) {
			magicModal.openModal({
				title: '',
				content: {
					children: (
						<MediaCylindo
							forceLoad={true}
							mediaCylindoId="media-cylindo-modal"
							mediaCylindoModel={mediaCylindoModel}
							tooltipZoomText="Drag to pan"
							zoom={true}
						/>
					),
				},
				width: '100vw',
				maxWidth: '725px',
				useLegacyWrapper: false,
			});
		} else {
			runInAction(() => {
				mediaCylindoStore.setIsCylindoActive(!isCylindoActive);

				mediaSetStore.setIsMediaSetOverrideActive(!isCylindoActive);
			});
		}
	}

	return (
		<MediaControl>
			<button
				className={
					classNames(styles['media-control-cylindo'], {
						[styles['media-control-cylindo-active']]: isCylindoActive,
					})
				}
				data-qa="media-control-cylindo"
				onClick={handleClick}
			>
				<span className={styles['media-control-cylindo-text']}>
					<span className="tw-sr-only">View </span>360º<span className="tw-sr-only"> media</span>
				</span>
			</button>
		</MediaControl>
	);
});
