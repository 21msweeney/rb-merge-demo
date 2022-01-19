import logo from './logo.svg';
import './App.css';

import { breadcrumbModels } from './components/Breadcrumb/Breadcrumbs.data';

import { Breadcrumbs } from './components/Breadcrumb/Breadcrumbs';
import { MediaSetDetail } from './components/MediaSetDetail/MediaSetDetail';

function App() {
  return (
    <div className="App tw-p-8">
		<p className='tw-text-left tw-font-bold'>Breadcrumb:</p>
		<Breadcrumbs model={breadcrumbModels} />
		<p className='tw-text-left tw-font-bold tw-mt-10'>Media Set Detail:</p>
		<MediaSetDetail />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
