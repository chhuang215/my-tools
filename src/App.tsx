// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import Calc1 from './pages/Calc1';
import Calc2 from './pages/Calc2';
import CoffeeRatio from './pages/CoffeeRatio';
// import './App.css';

function App() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">/</Link>
          <Link to="/calc1">c1</Link>
          <Link to="/calc2">c2</Link>
          <Link to="/coffeeratio">coffee</Link>
          <Link to="/pricecompare">$</Link>
        </nav>
      </header>
      <hr />
      <Outlet />
      {/* <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="calc1" element={<Calc1 />} />
          <Route path="calc2" element={<Calc2 />} />
          <Route path="coffeeratio" element={<CoffeeRatio />} /> */}

      {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
      {/* <Route path="*" element={<Home />} />
        </Route>
      </Routes> */}
    </>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Layout() {
  return (
    <header>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <Link to="/">/</Link>
        <Link to="/calc1">c1</Link>
        <Link to="/calc2">c2</Link>
        <Link to="/coffeeratio">coffee</Link>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </header>
  );
}

export default App;
