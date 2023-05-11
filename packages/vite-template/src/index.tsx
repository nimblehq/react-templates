import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { createRoot } from 'react-dom/client';

import App from './App';
import configureI18n from './i18n';
import reportWebVitals from './reportWebVitals';

configureI18n();

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Suspense fallback="loading">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
