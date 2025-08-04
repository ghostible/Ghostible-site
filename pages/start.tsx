import FAQSection from "@/components/FAQSection";
import BannerStart from "@/components/Start/BannerStart";
import HowItWorks from "@/components/Start/HowItWorks";
import PerfectApp from "@/components/Start/PerfectApp";
import PhoneVerification from "@/components/Start/PhoneVerification";
import Review from "@/components/Start/Review";
import TransparentPricing from "@/components/Start/TransparentPricing";
import TrustGhostible from "@/components/Start/TrustGhostible";
import WhyPay from "@/components/Start/WhyPay";
import Head from "next/head";


const PrivacyPolicyPage: React.FC = ({}) => {
  return (
    <>
      <Head>
        <title>start Ghostible</title>
        <meta name="description" content="Read Saasta's start" />
      </Head>

        <BannerStart/>
        <Review/>
        <WhyPay/>
        <PerfectApp/>
        <TrustGhostible/>
        <TransparentPricing/>
        <HowItWorks/>
        <FAQSection/>
        <PhoneVerification/>
    </>
  );
};

export default PrivacyPolicyPage;
