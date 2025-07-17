import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";
import TempPhoneEmailPlan from "@/Components/TempPhoneEmailPlan";
import TemBannerSection from "@/Components/TemBannerSection";
import TempPhoneEmailPlanPrice from "@/Components/TempPhoneEmailPlanPrice";
import TempPhoneNumber from "@/Components/TempPhoneNumber";
import FAQSection from "@/Components/FAQSection";

type Plan = {
  id: string;
  unit_amount: number;
  recurring?: {
    interval: "week" | "month";
  };
  product:
    | {
        name: string;
      }
    | string;
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

export default function TempphonePage({ plans }: TempphonePageProps) {
  const router = useRouter();
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

  const handleSubscribe = async (priceId: string, plan: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, priceId, plan }),
    });

    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <>
      <div className="w-full">
        <TemBannerSection />
        <TempPhoneEmailPlanPrice />
        <TempPhoneEmailPlan
          plans={plans}
          currentPlan={currentPlan}
          handleSubscribe={handleSubscribe}
        />
         <TempPhoneNumber/>
          <FAQSection />
      </div>
    </>
  );
}
