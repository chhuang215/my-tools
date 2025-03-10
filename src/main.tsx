import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import Calc1 from './pages/Calc1';
import Calc2 from './pages/Calc2';
import CoffeeRatio from './pages/CoffeeRatio';
import PriceCompare from './pages/PriceCompare';
import Sum from './pages/Sum';
// import './index.css';

const router = createHashRouter(
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
          path: '/calc1',
          element: <Calc1 />,
        },
        {
          path: '/calc2',
          element: <Calc2 />,
        },
        {
          path: '/coffeeratio',
          element: <CoffeeRatio />,
        },
        {
          path: '/pricecompare',
          element: <PriceCompare />,
        },
        {
          path: '/sum',
          element: <Sum />,
        },
      ],
    },
  ],
  // { basename: import.meta.env.DEV ? '/MyTools' : '/MyTools' }
  // { basename: '/my-tools' }
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
  </React.StrictMode>
);
