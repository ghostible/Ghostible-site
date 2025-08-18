import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";
import FAQSection from "@/components/FAQSection";
import BannerStart from "@/components/Start/BannerStart";
import HowItWorks from "@/components/Start/HowItWorks";
import PerfectApp from "@/components/Start/PerfectApp";
import PhoneVerification from "@/components/Start/PhoneVerification";
import Review from "@/components/Start/Review";
import Topplancontent from "@/components/Start/topplancontent";
import TransparentPricing from "@/components/Start/TransparentPricing";
import { NumberGeneratorModal } from "@/components/SmsActivate";
import { toast } from "@/hooks/use-toast";
import TrustGhostible from "@/components/Start/TrustGhostible";
import WhyPay from "@/components/Start/WhyPay";
import Head from "next/head";

type Plan = {
  id: string;
  unit_amount: number;
  recurring?: {
    interval: 'week' | 'month' | 'year';
    interval_count: '1' | '3' | '6';
  };
  product:
    | {
        name: string;
        description: string;
        marketing_features: marketing_features[];
      }
    | string;
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

const StartPage: React.FC<TempphonePageProps> = ({ plans }) => {

  const router = useRouter();
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState("");
  const [showNumberModal, setShowNumberModal] = useState(false);
  
  useEffect(() => {
    const fetchUserPlan = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("plan")
          .eq("id", user.id)
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

    toast({
      title: "Proceeding to checkout...",
      description: `Selected:  - `,
    });

    // For demo: simulate purchase and open number generator
    setTimeout(() => {
      setSelectedTier(planLabel);
      setShowNumberModal(true);
      console.log('toast', toast);
      
      toast({
        title: "Purchase completed!",
        description: "You can now generate temporary numbers.",
      });
    }, 1000);

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
        alert("Plan upgraded successfully.");
      } else {
        alert("Failed to upgrade plan.");
      }

    } else {
      // New purchase flow
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, priceId, mode }),  // 👈 pass mode here
      });

      const { url } = await res.json();
      if (url) {
        //window.location.href = url;
      } else {
        //alert("Failed to create checkout session.");
      }
    }
  };

  return (
    <>
      <Head>
        <title>start Ghostible</title>
        <meta name="description" content="Read Saasta's start" />
      </Head>

        <BannerStart/>
        <Review rating= {1} />
        <WhyPay />
        <PerfectApp/>
        <TrustGhostible/>
        <Topplancontent />
        <TransparentPricing plans={plans} currentPlan={currentPlan} handleSubscribe={handleSubscribe} />
        <NumberGeneratorModal isOpen={showNumberModal} onClose={() => setShowNumberModal(false)} selectedTier={selectedTier} countryCode={'0'} />
        <HowItWorks/>
        <FAQSection/>
        <PhoneVerification/>
    </>
  );
};

export default StartPage;
