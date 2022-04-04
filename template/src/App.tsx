import React from 'react';
import { useRoutes } from 'react-router-dom';

import 'dummy.scss';
import 'assets/stylesheets/application.scss';

import routes from 'routes';

const App = (): JSX.Element => {
  const appRoutes = useRoutes(routes);

  return <>{appRoutes}</>;
};

export default App;
