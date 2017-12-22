import path from 'path';
import qs from 'qs';
import { renderToString } from 'react-dom/server';
import Express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../src/reducers/';
import App from '../src/containers/Root';

const app = Express();
const port = 3000;

// Serve static files
app.use('/static', Express.static('static'));

// This is fired every time the server side receives a request
app.use(handleRender);

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
  // Read the counter from the request, if provided
  const params = qs.parse(req.query);
  const counter = parseInt(params.counter, 10) || 0;

  // Compile an initial state
  let preloadedState = { counter };

  // Create a new Redux store instance
  const store = createStore(rootReducer, preloadedState);

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Grab the initial state from our Redux store
  const finalState = store.getState();

  // Send the rendered page back to the client
  res.send(renderFullPage(html, finalState));
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `;
}

app.listen(port);
