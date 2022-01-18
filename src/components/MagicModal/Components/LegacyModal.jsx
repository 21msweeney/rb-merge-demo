import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

import { isEmpty } from 'util/isEmpty';
import { WeaveContent } from 'util/content-weaver/Components/WeaveContent';
import { useGlobalContext } from 'global/Contexts/Global.context';

export const LegacyModalTitle = observer(() => {
	const {
		magicModal,
		magicModal: {
			model: {
				title
			} = {},
		} = {},
	} = useGlobalContext();

	if (!magicModal) {
		return null;
	}
	return (
		<h1 id="magic-modal-title" data-qa="auto-modal-title" className="Heading Heading--3 magic-modal-title">
			{title}
		</h1>
	);
});

export const ContentDataAttrsToMagicModal = observer((props) => {
	const {
		magicModal,
		magicModal: {
			model: {
				content: {
					urlToGet,
				} = {},
			} = {},
		} = {},
	} = useGlobalContext();

	const unpackAndSetMagicModalChanges = (data) => {
		const options = data?.automodalOptions;

		if (isEmpty(options)) {
			return;
		}
		if (options.modalHeaderTitle) {
			magicModal.alterModal({
				title: options.modalHeaderTitle
			});
		}
		if (options.modalWidth) {
			magicModal.alterModal({
				width: options.modalWidth
			});
		}
	};

	if (urlToGet) {
		return React.cloneElement(props.children, {
			dataAttrHandler: unpackAndSetMagicModalChanges,
		});
	}
	return props.children;
});

export const LegacyModalContent = observer((props) => {
	const {
		magicModal: {
			model: {
				content,
			} = {},
		} = {},
	} = useGlobalContext();
	return (
		<div className="modal-content" data-qa="modal-content">
			<ContentDataAttrsToMagicModal {...props}>
				<WeaveContent {...content} />
			</ContentDataAttrsToMagicModal>
		</div>
	);
});

export const LegacyModal = observer((props) => {
	const {
		magicModal,
		pageStore,
	} = useGlobalContext();
	const { closeModal } = magicModal;
	const {
		accessibleTitle,
		anchorBottom,
		closeButtonText,
		dropShadow,
		flushSides,
		fullBleed,
		height,
		marginTop,
		reverseCloseButton,
		showCloseButton,
		showHeader,
		title,
		width,
		widthOutput,
		maxWidth,
	} = magicModal.model;
	const modalClasses = {
		'legacy-modal-anchor-bottom': anchorBottom,
		'legacy-modal-drop-shadow': dropShadow,
		'legacy-modal-full-bleed': fullBleed,
		'legacy-modal-mobile': !pageStore.isMediaQueryMd,
		'legacy-modal-no-close-button': !showCloseButton,
		'legacy-modal-no-side-margin': flushSides,
		'legacy-modal-no-title': !title || !showHeader,
		'legacy-modal-reverse-close-button': reverseCloseButton
	};
	const modalAttrs = {
		'aria-label': accessibleTitle || title || 'modal dialog',
		'aria-labelledby': 'magic-modal-title',
		'aria-modal': true,
		'className': classNames('react-modal legacy-modal', modalClasses, props.className),
		'key': 'mainModal',
		'role': 'dialog',
		'style': {
			left: anchorBottom && `calc(50% - ${width / 2}px)`,
			width: widthOutput,
			maxWidth,
			marginTop,
			height,
		}
	};

	return (
		<div {...modalAttrs}>
			<div className={classNames('modal-header', { 'modal-mobile': !pageStore.isMediaQueryMd })}>
				{
					showCloseButton &&
					<button
						className="modal-close"
						data-tr-link-event-track={false}
						data-qa="auto-modal-close-button"
						onMouseDown={(event) => {
							// Prevent form validation if the intent is to close.
							event.preventDefault();
						}}
						onClick={closeModal}
						title="Close modal window"
					>
						<div className="modal-close-text">{closeButtonText}</div>
					</button>
				}
				{
					showHeader
						? <LegacyModalTitle />
						: <h1 id="magic-modal-title" className="tw-sr-only">{magicModal?.model?.title}</h1>
				}
			</div>
			{props.children}
			<LegacyModalContent />
		</div>
	);
});
