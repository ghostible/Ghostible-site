import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabaseClient';
import { useEffect, useState } from 'react';
import HeroSection from "@/components/HeroSection"
import HowWork from "@/components/HowWork"
import InstantAccess from "@/components/InstantAccess"
import FAQSection from "@/components/FAQSection"
import TestimonialSection from "@/components/TestimonialSection"
import TempPhoneEmailPlan from "@/components/TempPhoneEmailPlan"
import { useToast } from "@/hooks/use-toast";
import TransparentPricing from "@/components/Start/TransparentPricing";
import TrustedSection from "@/components/Trusted"

type Plan = {
  id: string;
  unit_amount: number;
  recurring?: {
    interval: 'week' | 'month';
    interval_count: '1' | '1';
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
  handleSubscribe: (priceId: string, planLabel: string, mode: "payment" | "subscription") => Promise<void>;
  ShowselectedCountry: (selectedCountry: string) => Promise<void>;
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.SITE_URL}/api/prices`);
  const data = await res.json();
  return { props: { plans: data } };
}

const Home: React.FC<TempphonePageProps> = ({ plans}) => {

  const router = useRouter();
  const { toast } = useToast();
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  // const [selectedTier, setSelectedTier] = useState("");
  // const [showNumberModal, setShowNumberModal] = useState(false);

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

  const handleSubscribe = async (
    priceId: string,
    planLabel: string,
    mode: "payment" | "subscription"
  ) => {
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

    if (profile?.subscription_id && mode === "subscription") {
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
        toast({
          title: "Plan Upgrade",
          description: "Plan Upgraded Successfully.",
        });
      } else {
        toast({
          title: "Plan Upgrade",
          description: "Failed to upgrade plan.",
          variant: "destructive",
        });
      }

    } else {
      // New purchase flow
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, priceId, mode, planLabel }),
      });

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        toast({
          title: "Plan Purchase",
          description: "Failed to create checkout session.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <HeroSection />
      <InstantAccess />
      <HowWork />
      <TempPhoneEmailPlan />
      <TransparentPricing
        plans={plans}
        currentPlan={currentPlan}
        handleSubscribe={handleSubscribe}
      />
      {/* <NumberGeneratorModal isOpen={showNumberModal} onClose={() => setShowNumberModal(false)} selectedTier={selectedTier} countryCode={'0'} /> */}
      <TrustedSection />
      <FAQSection />
      <TestimonialSection />
    </>
  )
}

export default Home
