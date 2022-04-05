import React from 'react';
import { RouteObject } from 'react-router-dom';

import HomeScreen from 'screens/Home';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomeScreen />,
  },
];

export default routes;
