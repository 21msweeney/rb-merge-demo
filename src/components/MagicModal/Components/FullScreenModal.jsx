import React, { useEffect, useRef } from 'react';

import { LegacyModal } from 'components/MagicModal/Components/LegacyModal';
import { useGlobalContext } from 'global/Contexts/Global.context';

export const FullScreenModal = (props) => {
	const { magicModal = {} } = useGlobalContext();

	const modalRef = useRef(null);

	function onClick() {
		magicModal.closeModal();
	}

	useEffect(() => {
		document.querySelector('body').classList.add('tw-overflow-hidden');

		return () => {
			document.querySelector('body').classList.remove('tw-overflow-hidden');
		};
	}, []);

	return (
		<div className="full-screen-modal-container" ref={modalRef}>
			<LegacyModal {...props}>
				<div className="full-screen-media-viewer-close">
					<button
						type="button"
						className="full-screen-media-viewer-close-btn"
						onClick={onClick}
						data-tr-link-event-track={false}
					>
						<span className="tw-sr-only">Close modal</span>
					</button>
				</div>
			</LegacyModal>
		</div>
	);
};

FullScreenModal.WRAPPER_ID = 'full-screen-modal';
