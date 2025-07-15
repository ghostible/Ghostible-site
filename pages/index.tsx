import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from "next/image";
import HeroSection from "./Components/HeroSection";
import FeatureSection from "./Components/FeatureSection";
import HowWork from "./Components/HowWork";
import InstantAccess from "./Components/InstantAccess";
import TempPhoneEmailPlan from "./Components/TempPhoneEmailPlan";
import PrivateAnonymous from "./Components/PrivateAnonymous";
import SMSVerificationReady from "./Components/SMSVerificationReady";
import TempEmailAddresses from "./Components/TempEmailAddresses";
import FAQSection from "./Components/FAQSection";
import TestimonialSection from "./Components/TestimonialSection";

const Home: React.FC = ({ }) => {
  return (
   <>
   <HeroSection/>
   <FeatureSection/>
   <InstantAccess/>
   <PrivateAnonymous/>
   <SMSVerificationReady/>
   <TempEmailAddresses/>
   <HowWork/>
   <TempPhoneEmailPlan/>
   <FAQSection/>
   <TestimonialSection/>
   </>
  );
}

export default Home;