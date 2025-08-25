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
import { useToast } from "@/hooks/use-toast";
import TrustGhostible from "@/components/Start/TrustGhostible";
import WhyPay from "@/components/Start/WhyPay";
import Head from "next/head";

type Plan = {
  id: string;
  unit_amount: number;
  recurring?: {
    interval: 'week' | 'month';
    interval_count: '1' | '1';
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
  const { toast } = useToast();
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  
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

  //  useEffect(() => {
  //   if (router.query.redirect) {
  //     const el = document.getElementById(router.query.redirect as string);
  //     if (el) {
  //       setTimeout(() => {
  //         el.scrollIntoView({ behavior: "smooth" });
  //       }, 600);
  //     }
  //   }
  // }, [router.query]);
  
  const handleSubscribe = async (
    priceId: string,
    planLabel: string,
    mode: "payment" | "subscription"
  ) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast({
        title: "🔐 Login/Signup",
        description: "Please 🔐 login/Signup for proceedings to checkout.",
      });
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
      toast({
        title: "❌ Error profile",
        description: error.message || "Error fetching profile..",
        variant: "destructive",
      });
      return;
    }

    if (profile?.subscription_id && mode === "subscription") {
      toast({
        title: "🛒 Proceedings to Upgrade",
        description: `You Selected: ${planLabel} for Upgrade`,
      });

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
          description: "🎉 Plan Upgraded Successfully.",
        });
      } else {
        toast({
          title: "⚠️ Plan Upgrade",
          description: "Failed to upgrade plan. Please try again.",
          variant: "destructive",
        });
      }

    } else {
      toast({
        title: "🛒 Processing Checkout",
        description: `Redirecting you to payment page with selected: ${planLabel}`,
      });

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
          title: "⚠️ Payment Error",
          description: "We couldn't process your payment. Please try again.",
          variant: "destructive",
        });
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
        <HowItWorks/>
        <FAQSection/>
        <PhoneVerification/>
    </>
  );
};

export default StartPage;
