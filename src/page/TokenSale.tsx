import PreSale from "../components/PreSale";
import {useEffect} from "react"
import LiveSession from "../components/LiveSession";
import HeroSection from "../components/HeroSection";
import WhatWillYouLearn from "../components/WhatWillYouLearn";
import GetAccess from "../components/GetAccess";

const TokenSale = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
    
    <PreSale/>
    <HeroSection/>
    <WhatWillYouLearn />
    <LiveSession/>
    <GetAccess/>
    </>
  );
};

export default TokenSale;