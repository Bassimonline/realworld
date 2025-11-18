// src/App.tsx
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Steps from './components/Steps';
import Hero from './components/Hero';
import Vision from './components/Vision';
import Roadmap from './components/Roadmap';
import Mission from './components/Mission';
import CoreValues from './components/CoreValues';
import TaglineIdeas from './components/TaglineIdeas';
import Qoute from './components/Qoute';
import TokenomicsSection from './components/TokenomicsSection';
import TokenSale from './page/TokenSale'
import BuyPage from './components/BuyPage';
import Instructions from './page/Instructions';
import WaitingForPaymentPage from './page/Waiting';
import RenderVideo from "./components/RenderVideo"
import HeroVideo from "./components/HeroVideo"

// Layout that wraps every page
const Layout: React.FC = () => (
  <>
    <Header />
    <main className="relative z-10 overflow-hidden bg-[#02040e] homeC">
      <Outlet />
    </main>
    <Footer />
  </>
);

// What lives at "/"
const HomePage: React.FC = () => (
  <>


    <Hero />
        <HeroVideo />
    {/* <RenderVideo /> */}
    <Steps />
    <Vision />

    <Roadmap />
    <TokenomicsSection />
    <BuyPage />
    <Mission />
    <CoreValues />
    <TaglineIdeas />
    <Qoute />
  </>
);






const App: React.FC = () => (
  <Routes>
    {/* Everything under Layout gets Header + Footer */}
    <Route element={<Layout />}>
      {/* / */}
      <Route index element={<HomePage />} />

      {/* /token */}
      <Route path="/token-sale" element={<TokenSale />} />
      <Route path="/instructions" element={<Instructions />} />
      <Route path="/waiting" element={<WaitingForPaymentPage />} />

      {/* Optional catch-all if you want a 404 */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Route>
  </Routes>
);

export default App;
