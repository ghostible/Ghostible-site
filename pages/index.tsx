import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabaseClient';
import { useEffect, useState } from 'react';
import HeroSection from "@/components/HeroSection"
import HowWork from "@/components/HowWork"
import InstantAccess from "@/components/InstantAccess"
import PrivateAnonymous from "@/components/PrivateAnonymous"
import SMSVerificationReady from "@/components/SMSVerificationReady"
import TempEmailAddresses from "@/components/TempEmailAddresses"
import FAQSection from "@/components/FAQSection"
import TestimonialSection from "@/components/TestimonialSection"
import TempPhoneEmailPlan from "@/components/TempPhoneEmailPlan"
import AllPlan from "@/components/AllPlan";

type Plan = {
  id: string;
  unit_amount: number;
  recurring?: {
    interval: 'week' | 'month' | 'year';
    interval_count: '1' | '3' | '6';
  };
  product: {
    name: string;
    description: string;
    marketing_features: marketing_features[];
  } | string;
};

type marketing_features = {
  name: string;
};

interface TempphonePageProps {
  plans: Plan[];
  currentPlan: string | null;
  handleSubscribes: (priceId: string, plan: string) => Promise<void>;
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.SITE_URL}/api/prices`);
  const data = await res.json();
  return { props: { plans: data } };
}

const Home: React.FC<TempphonePageProps> = ({ plans}) => {

  const router = useRouter();
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserPlan = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('plan')
          .eq('id', user.id)
          .single();

        if (!error && data?.plan) setCurrentPlan(data.plan);
      }
    };

    fetchUserPlan();
  }, []);

  const handleSubscribe = async (priceId: string, plan: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
  
      if (!user) {
        router.push("/login");
        return;
      }
  
      // Fetch the user's current subscription from Supabase
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("subscription_id")
        .eq("id", user.id)
        .single();
  
      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }
  
      if (profile?.subscription_id) {
        // User already has a subscription, so this is an upgrade
        const res = await fetch("/api/upgrade-subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            planId: priceId,
          }),
        });
  
        const data = await res.json();
        if (data.success) {
          alert("Plan upgraded successfully.");
        } else {
          alert("Failed to upgrade plan.");
        }
  
      } else {
        // New purchase flow
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, priceId, plan }),
        });
  
        const { url } = await res.json();
        if (url) {
          window.location.href = url;
        } else {
          alert("Failed to create checkout session.");
        }
      }
    };

  return (
    <>
      <HeroSection />
      <InstantAccess />
      <PrivateAnonymous />
      <SMSVerificationReady />
      <TempEmailAddresses />
      <HowWork />
      <TempPhoneEmailPlan />
      <AllPlan
        plans={plans}
        currentPlan={currentPlan}
        handleSubscribe={handleSubscribe}
      />
      <FAQSection />
      <TestimonialSection />
    </>
  )
}

export default Home
