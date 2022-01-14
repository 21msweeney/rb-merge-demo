import logo from './logo.svg';
import './App.css';

import { breadcrumbModels } from './components/Breadcrumb/Breadcrumbs.data';

import { Breadcrumbs } from './components/Breadcrumb/Breadcrumbs';

function App() {
  return (
    <div className="App">
		<Breadcrumbs model={breadcrumbModels} />
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
