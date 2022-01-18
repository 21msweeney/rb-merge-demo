import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { observer } from 'mobx-react';
import classNames from 'classnames';

import { isEmpty } from 'util/isEmpty';

// https://github.com/chenglou/react-spinner/blob/master/index.js

export const LoadingSpinner = observer((props) => {
	const {
		showLoadingSpinner = true,
		spinnerPosX = null,
		spinnerPosY = null,
		isLoading,
		isGlobal,
		className = '',
		minHeight,
	} = props;

	const spinnerStyle = {};
	const spinnerProps = {};
	const classes = classNames('react-spinner-wrapper', { 'global-spinner': isGlobal }, className);

	const barCount = 12;
	const bars = Object.keys([...new Array(barCount)]).map((i) => {
		const animationDelay = `${Math.round((i / barCount) * 1200) - 1200}ms`;
		const transform = `rotate(${(i * Math.round(360 / barCount))}deg) translate(146%)`;
		const barStyle = {
			animationDelay,
			WebkitAnimationDelay: animationDelay,
			transform,
			WebkitTransform: transform,
		};

		return <div style={{ ...barStyle }} className="react-spinner_bar" key={i} />;
	});

	if (spinnerPosX !== null) {
		spinnerStyle.left = spinnerPosX;
	}
	if (spinnerPosY !== null) {
		spinnerStyle.top = spinnerPosY;
	}
	spinnerProps.className = classNames('react-spinner', {
		[className]: Boolean(className)
	});
	if (!isEmpty(spinnerStyle)) {
		spinnerProps.style = spinnerStyle;
	}
	const container = (
		<CSSTransition
			component="div"
			timeout={{
				enter: 500,
				exit: 500
			}}
			in={isLoading}
			mountOnEnter={true}
			unmountOnExit={true}
			key="loading-spinner"
			style={{ minHeight }}
		>
			<div className={classes}>
				{
					showLoadingSpinner &&
					<div {...spinnerProps}>
						{bars}
					</div>
				}
			</div>
		</CSSTransition>
	);

	return (
		<div>
			{container}
		</div>
	);
});
