import React from 'react';
import { observer } from 'mobx-react';
import cn from 'classnames';

import { useGlobalContext } from 'global/Contexts/Global.context';

const StandardModalTitle = observer(() => {
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
		<div className="MagicModal-title">
			<h1 data-qa="auto-modal-title" id="standard-modal-title" className="Heading Heading--4 tw-text-gray tw-leading-8 md:tw-text-2xl">
				{title}
			</h1>
		</div>
	);
});

export const StandardModal = observer((props) => {
	const {
		magicModal,
	} = useGlobalContext();
	const { closeModal } = magicModal;
	const {
		accessibleTitle,
		content,
		height,
		marginTop,
		maxWidth,
		showCloseButton,
		showHeader,
		title,
		widthOutput,
	} = magicModal.model;
	const modalProps = {
		'aria-label': accessibleTitle || title || 'modal dialog',
		'aria-labelledby': 'standard-modal-title',
		'className': cn('MagicModal', props.className),
		'key': 'mainModal',
		'role': 'dialog',
		'aria-modal': true,
		'style': {
			width: widthOutput,
			maxWidth,
			marginTop,
			height,
		}
	};

	return (
		<div {...modalProps}>
			{
				(showHeader || showCloseButton) &&
				<div className="MagicModal-header">
					{
						showHeader
							? <StandardModalTitle />
							: <h1 id="standard-modal-title" className="tw-sr-only">{magicModal?.model?.title}</h1>
					}
					{
						showCloseButton &&
						<div className="MagicModal-closeBtnWrapper">
							<button
								className="MagicModal-closeBtn"
								data-qa="auto-modal-close-button"
								data-tr-link-event-track={false}
								onMouseDown={(event) => {
									// Prevent form validation if the intent is to close.
									event.preventDefault();
								}}
								onClick={closeModal}
								title="Close modal window"
							>
								<div className="tw-sr-only">Close modal window</div>
							</button>
						</div>
					}
				</div>
			}
			{
				Boolean(content?.children) &&
				<div className="MagicModal-content" data-qa="magic-modal-content">{content.children}</div>
			}
		</div>
	);
});
