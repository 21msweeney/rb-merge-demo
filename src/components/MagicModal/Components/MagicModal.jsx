import cn from 'classnames';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { CSSTransition } from 'react-transition-group';

import { isNumber } from 'util/isNumber';
import { isFunction } from 'util/isFunction';

import { LegacyModal } from 'components/MagicModal/Components/LegacyModal';
import { isOnServer } from 'global/global.constants';
import { StandardModal } from 'components/MagicModal/Components/StandardModal';
import { FocusLock } from 'util/Components/FocusLock';
import { useGlobalContext } from 'global/Contexts/Global.context';

export const MagicModal = observer((props) => {
	const {
		magicModal,
	} = useGlobalContext();

	const {
		model,
		closeModal,
		model: {
			closeModalOnEscKey,
			closeModalOnOverlayClick,
			containerClass,
			id,
			isLoading,
			isOpen,
			onOverlayClick,
			showOverlay,
			useLegacyWrapper,
			WrapperComponent,
			modalClassName,
		},
	} = magicModal;

	const onKeyupHandler = (e) => {
		if (e.keyCode !== 27) {
			return;
		}

		if (closeModalOnEscKey) {
			closeModal();
		}
	};

	// will mount / will unmount
	useEffect(() => {
		document.querySelector('body').addEventListener('scroll-to-top-of-modal', magicModal.scrollToTop);
		if (!isOnServer) {
			document.addEventListener('keyup', onKeyupHandler);
		}

		return function cleanup() {
			document.removeEventListener('keyup', onKeyupHandler);
		};
	}, []);

	// will update / did update
	useEffect(() => {
		const { initialScrollTop, keepScrollPosition } = model;

		if (!keepScrollPosition && isOpen && isNumber(initialScrollTop)) {
			window.scrollTo(0, initialScrollTop);
		}

		if (keepScrollPosition) {
			model.scrollTop = window.scrollY;
		}

		if (isOpen && keepScrollPosition) {
			window.scrollTo(0, model.scrollTop);
		}
	});

	const Wrapper = WrapperComponent || (useLegacyWrapper ? LegacyModal : StandardModal);
	const wrapperDivProps = {
		className: cn('react-magic-modal-open', id, Wrapper.WRAPPER_ID, modalClassName),
		...(id) && {
			'data-qa': id,
		},
	};

	return (
		<div id="react-magic-modal" className={containerClass}>
			<CSSTransition
				timeout={200}
				in={isOpen}
				classNames="fade"
				mountOnEnter
				unmountOnExit
			>
				<div {...wrapperDivProps}>
					{
						showOverlay &&
						<div // eslint-disable-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
							className="magic-modal-overlay"
							data-qa="magic-modal-overlay"
							key="magic-modal-overlay"
							tabIndex="-1"
							onClick={(event) => {
								if (event.target.className !== 'magic-modal-overlay') {
									return;
								}
								if (isFunction(onOverlayClick)) {
									onOverlayClick();
								} else if (closeModalOnOverlayClick) {
									closeModal();
								}
							}}
						/>
					}
					<FocusLock isLoading={isLoading}>
						<Wrapper {...props} />
					</FocusLock>
				</div>
			</CSSTransition>
		</div>
	);
});
