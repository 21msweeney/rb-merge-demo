import React, { createContext, useContext } from 'react';
import { enableStaticRendering } from 'mobx-react';

import { isOnServer } from '~/global/global.constants';
import { clearanceProductContext } from '~/product/clearance/Contexts/ClearanceStores.context';
import { productMultiOptionsContext } from '~/product/multi-options/Contexts/ProductMultiOptions.context';
import { productCasegoodsContext } from '~/product/casegoods/Contexts/ProductCasegoods.context';
import { productMultiContext } from '~/product/multi/Contexts/ProductMulti.context';
import { productStandardContext } from '~/product/standard/Contexts/ProductStandard.context';

const productContext = createContext();

enableStaticRendering(isOnServer);

export const ProductContextProvider = (pageProps) => {
	const {
		children,
		pageType = '',
	} = pageProps;

	let context = {};

	switch (pageType) {
		case 'clearance':
			context = clearanceProductContext(pageProps);
			break;

		case 'casegoods':
			context = productCasegoodsContext(pageProps);
			break;

		case 'multi':
			context = productMultiContext(pageProps);
			break;

		case 'multi-options':
			context = productMultiOptionsContext(pageProps);
			break;

		case 'standard':
			context = productStandardContext(pageProps);
			break;

		default:
			context = productCasegoodsContext(pageProps);
			break;
	}

	return <productContext.Provider value={context}>{children}</productContext.Provider>;
};

export const useProductContext = () => useContext(productContext);
