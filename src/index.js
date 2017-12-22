/* eslint-disable import/default */

import React from 'react';
import { render, hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import configureStore, { history } from './store/configureStore';
import Root from './containers/Root';
import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
require('./favicon.ico'); // Tell webpack to load favicon.ico
import reducerRoot from './reducers/';

// const store = configureStore();

// render(
//   <AppContainer>
//     <Root store={store} history={history} />
//   </AppContainer>,
//   document.getElementById('app')
// );
//
// if (module.hot) {
//   module.hot.accept('./containers/Root', () => {
//     const NewRoot = require('./containers/Root').default;
//     render(
//       <AppContainer>
//         <NewRoot store={store} history={history} />
//       </AppContainer>,
//       document.getElementById('app')
//     );
//   });
// }

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = createStore(reducerRoot, preloadedState);

hydrate(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);
