import React, { createContext, useContext } from 'react';
import { MagicModalModel } from 'components/MagicModal/MagicModal.model';
import { MagicModalStore } from 'components/MagicModal/MagicModal.store';

const globalContext = createContext();

export const GlobalContextProvider = ({ children, pageProps }) => {
	const magicModal = new MagicModalStore();
	magicModal.model = new MagicModalModel();

	return (
		<globalContext.Provider
			value={
				{
					magicModal,
				}
			} >
			{children}
		</globalContext.Provider>
	)
}

export const useGlobalContext = () => useContext(globalContext);