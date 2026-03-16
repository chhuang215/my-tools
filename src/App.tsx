import { useEffect } from 'react';
// import reactLogo from './assets/react.svg';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
// import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <nav>
          <Link to="/">/</Link>
          <Link to="/calc1">c1</Link>
          <Link to="/calc2">c2</Link>
          <Link to="/coffeeratio">coffee</Link>
          <Link to="/pricecompare">$compare</Link>
          <Link to="/sum">sum</Link>
        </nav>
      </header>
      <hr />
      <BannerComponent />
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
    </div>
  );
}

function BannerComponent() {
  useEffect(() => {
    const bannerDiv = document.getElementById('keepandroidopen-banner');
    
    if (bannerDiv?.innerHTML === "") {
      const script = document.createElement('script');
      script.src = "https://keepandroidopen.org/banner.js?size=mini&id=keepandroidopen-banner";
      script.async = true;
      
      bannerDiv.appendChild(script);
    }
  }, []);

  return <div id="keepandroidopen-banner"></div>;
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

export default App;
