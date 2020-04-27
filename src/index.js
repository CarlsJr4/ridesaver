import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import './stylesheets/drivers.css';
import './stylesheets/passengers.css';
import './stylesheets/nav.css';
import './stylesheets/modal.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faUserEdit, faLink, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(
	faTrash, 
	faUserEdit, 
	faLink,
	faPlus,
	faTimes
	);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
