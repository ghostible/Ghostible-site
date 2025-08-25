import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";
import TemBannerSection from "@/components/TemBannerSection";
import TempPhoneEmailPlanPrice from "@/components/TempPhoneEmailPlanPrice";
import TempPhoneNumber from "@/components/TempPhoneNumber";
import FAQSection from "@/components/FAQSection";
import TransparentPricing from "@/components/Start/TransparentPricing";
import TrustedSection from "@/components/Trusted";
import TestimonialSection from "@/components/TestimonialSection";
import { useToast } from "@/hooks/use-toast";

type Plan = {
  id: string;
  unit_amount: number;
  recurring?: {
    interval: 'week' | 'month' ;
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
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.SITE_URL}/api/prices`);
  const data = await res.json();
  return { props: { plans: data } };
}

export default function TempphonePage({ plans }: TempphonePageProps) {
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
      <TemBannerSection />
      <TempPhoneEmailPlanPrice />
      <TransparentPricing plans={plans} currentPlan={currentPlan} handleSubscribe={handleSubscribe} />
      <TrustedSection />
      <TempPhoneNumber/>
      <FAQSection />
      <TestimonialSection />
    </>
  );
}
