import React, { createContext, useContext } from 'react';

import { MagicModalModel } from 'components/MagicModal/MagicModal.model';
import { MagicModalStore } from 'components/MagicModal/MagicModal.store';

const globalContext = createContext();


export const GlobalContextProvider = (props) => {
	const {
		children,
	} = props;

	const magicModal = new MagicModalStore();
	magicModal.model = new MagicModalModel();

	const context = {
		magicModal,
	}

	return (
		<globalContext.Provider value={context}>
			{children}
		</globalContext.Provider>
	);
};

export const useGlobalContext = () => useContext(globalContext);