import './App.css';
import React from 'react';
import 'lib/mobx.config';

import { Breadcrumbs } from './components/Breadcrumbs/Merge/Breadcrumbs/Breadcrumbs';
import { GlobalContextProvider } from 'global/Contexts/Global.context';
import { MediaSetDetail } from './components/MediaSetDetail/MediaSetDetail';
import { MagicModal } from './components/MagicModal/Components/MagicModal';

function App() {
  return (
	  <GlobalContextProvider>
		  <div className="App tw-p-8 tw-relative">
			  <p className='tw-text-left tw-font-bold'>Breadcrumb:</p>
			  <Breadcrumbs />
			  <p className='tw-text-left tw-font-bold tw-mt-10'>Media Set Detail:</p>
			  <MediaSetDetail />
			  <p className='tw-text-left tw-font-bold tw-mt-10'>Magic Modal:</p>
			  <button className="HollowButton HollowButton--navy">Modal open</button>
			  <MagicModal />
		  </div>
	  </GlobalContextProvider>
  );
}

export default App;
