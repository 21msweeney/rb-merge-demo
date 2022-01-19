import React, { createContext, useContext } from 'react';

const globalContext = createContext();


export const GlobalContextProvider = (props) => {
	debugger;
	const {
		children,
	} = props;

	const context = {
		magicModal: 'testing',
	}

	return (
		<globalContext.Provider value={context}>
			{children}
		</globalContext.Provider>
	);
};

export const useGlobalContext = () => useContext(globalContext);
// export const useGlobalContext = () => console.log('context');
