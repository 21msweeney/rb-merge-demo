import './App.css';
import React from 'react';

import { breadcrumbModels } from './components/Breadcrumb/Breadcrumbs.data';
import { Breadcrumbs } from './components/Breadcrumb/Breadcrumbs';
import { GlobalContextProvider } from 'global/Contexts/Global.context';
import { MediaSetDetail } from './components/MediaSetDetail/MediaSetDetail';

function App() {
  return (
	  <GlobalContextProvider>
		  <div className="App tw-p-8">
			  <p className='tw-text-left tw-font-bold'>Breadcrumb:</p>
			  <Breadcrumbs model={breadcrumbModels} />
			  <p className='tw-text-left tw-font-bold tw-mt-10'>Media Set Detail:</p>
			  <MediaSetDetail />
		  </div>
	  </GlobalContextProvider>
  );
}

export default App;
