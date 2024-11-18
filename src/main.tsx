import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Calc1 from './pages/Calc1';
import Calc2 from './pages/Calc2';
import CoffeeRatio from './pages/CoffeeRatio';
import PriceCompare from './pages/PriceCompare';
// import './index.css';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <>hi</>,
        },
        {
          path: '/calc1/',
          element: <Calc1 />,
        },
        {
          path: '/calc2/',
          element: <Calc2 />,
        },
        {
          path: '/coffeeratio/',
          element: <CoffeeRatio />,
        },
        {
          path: '/pricecompare/',
          element: <PriceCompare />,
        },
      ],
    },
  ],
  // { basename: import.meta.env.DEV ? '/MyTools' : '/MyTools' }
  { basename: '/my-tools' }
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
  </React.StrictMode>
);
