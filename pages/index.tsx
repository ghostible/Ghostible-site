import HeroSection from "@/Components/HeroSection"
// import FeatureSection from "@/Components/FeatureSection"
import HowWork from "@/Components/HowWork"
import InstantAccess from "@/Components/InstantAccess"
import PrivateAnonymous from "@/Components/PrivateAnonymous"
import SMSVerificationReady from "@/Components/SMSVerificationReady"
import TempEmailAddresses from "@/Components/TempEmailAddresses"
import FAQSection from "@/Components/FAQSection"
import TestimonialSection from "@/Components/TestimonialSection"
import TempPhoneEmailPlan from '@/Components/TempPhoneEmailPlan'

interface Plan {
  id: string;
  unit_amount: number;
  recurring?: {
    interval: 'week' | 'month';
  };
  product: {
    name: string;
  } | string;
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.SITE_URL}/api/prices`);
  const data = await res.json();
  return { props: { plans: data } };
}

const Home = ({ plans }: { plans: Plan[] }) => {
  const noop = async () => {}

  return (
    <>
      <HeroSection />
      {/* <FeatureSection /> */}
      <InstantAccess />
      <PrivateAnonymous />
      <SMSVerificationReady />
      <TempEmailAddresses />
      <HowWork />
      <TempPhoneEmailPlan
        plans={plans}
        currentPlan={null}
        handleSubscribe={noop}
      />
      <FAQSection />
      <TestimonialSection />
    </>
  )
}

export default Home
