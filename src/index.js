import React from 'react';
import ReactDOM from 'react-dom';
import { FxApp } from './FX';
import App from './App';
import { buildNumber } from './version.json';

ReactDOM.render(
  <FxApp title="Sample FX App" version={buildNumber}>
    <App />
  </FxApp>,
  document.getElementById('root')
);
