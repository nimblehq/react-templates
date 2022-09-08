import React from 'react';
import { useTranslation } from 'react-i18next';

import logo from 'assets/images/logo.svg';

const HomeScreen = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <p>{t('sample_page.message', { codeSample: '<code>src/App.tsx</code>' })}</p>
        <a className="app-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" data-test-id="app-link">
          {t('sample_page.learn_react')}
        </a>
      </header>
    </div>
  );
};

export default HomeScreen;
