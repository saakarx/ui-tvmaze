import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { loader as homeLoader } from './pages/Home';
import { loader as showsLoader } from './pages/Show';
import Home from './pages/Home';
import Show from './pages/Show';
import './scss/main.scss';

const router = createBrowserRouter([
  {
    path: '/',
    loader: homeLoader,
    element: <Home />
  },
  {
    path: '/shows/:showId',
    element: <Show />,
    loader: showsLoader
  }
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
