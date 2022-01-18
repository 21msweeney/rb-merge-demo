import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { fromPromise } from 'mobx-utils';
import axios from 'axios';
import { isFunction } from 'util/isFunction';

import { addToUrl } from 'util/addToUrl';
import { LoadingSpinner } from 'components/LoadingSpinner/LoadingSpinner';

export const GetUrlContent = observer((props) => {
	const urlToGet = addToUrl(props.urlToGet, 'decorator=nowrap');
	const promise = axios.get(urlToGet);
	const [contentPromise, setContentPromise] = useState(null);

	useEffect(() => {
		setContentPromise(fromPromise(promise));

		if (isFunction(props.promiseHandler)) {
			props.promiseHandler(promise, props);
		}

		// unpack the first item's data attributes
		if (props.dataAttrHandler) {
			promise.then((response) => {
				if (!response.data) {
					return;
				}
				const htmlParser = new DOMParser();
				const html = htmlParser.parseFromString(response.data, 'text/html');
				const siteMessageNode = html.querySelector('[data-automodal-options]');

				if (siteMessageNode) {
					const automodalAttr = siteMessageNode.getAttribute('data-automodal-options');

					try {
						// Fail on any JSON parse issues
						const automodalOptions = JSON.parse(automodalAttr || {});
						props.dataAttrHandler({ automodalOptions }, response, props);
					} catch (error) {
						console.error(`Could not parse automodalOptions from the resource at ${urlToGet}: `, html);
					}
				}
			});
		}
	}, []);

	return (
		<div className="content-weaver-getUrl">
			{
				contentPromise &&
				contentPromise.case({
					pending: () => <LoadingSpinner parentSettings={{ width: '100%' }} isLoading />,
					rejected: error => <h2>{error.statusText}</h2>,
					fulfilled: (response) => {
						const divProps = {
							className: 'content-weaver-wrapped-getUrl',
							...(props.dangerouslyExecuteJsOnLoad) && {
								ref: (containerDiv) => {
									containerDiv.innerHTML(response.data);
								}
							},
							...(!props.dangerouslyExecuteJsOnLoad) && {
								dangerouslySetInnerHTML: { __html: response.data },
							},
						};

						return <div {...divProps} />;
					}
				})
			}
		</div>
	);
});
