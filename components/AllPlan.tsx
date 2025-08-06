// import React from 'react'
import { useEffect, useState } from "react";
import { CircleCheck } from "lucide-react";
import { supabase } from "@/utils/supabaseClient";

interface TempPhoneEmailPlanProps {
  plans: StripePlan[];
  currentPlan: string | null;
  handleSubscribe: (priceId: string, planLabel: string) => Promise<void>;
}

interface StripePlan {
  id: string;
  unit_amount: number;
  recurring?: {
    interval: "day" | "week" | "month" | "year";
    interval_count: "1" | "3" | "6";
  };
  product:
    | {
        name: string;
        description: string;
        marketing_features: marketing_features[];
      }
    | string;
}

type marketing_features = {
  name: string;
};

export default function AllPlan({
  plans,
  currentPlan,
  handleSubscribe,
}: TempPhoneEmailPlanProps) {
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("subscription_id")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching subscription ID:", error);
      } else {
        setSubscriptionId(data?.subscription_id || null);
      }
    };

    fetchSubscription();
  }, []);

  return (
    <>
      <div className="w-full">
        <section className="lg:max-w-7xl w-full mx-auto px-4 text-center price-section">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full lg:w-5xl mx-auto gap-8 md:pb-12 postion-relative">
              {plans
                .sort((a, b) => {
                  const getDays = (plan: StripePlan) => {
                    const count = Number(plan.recurring?.interval_count ?? 1);
                    const unit = plan.recurring?.interval ?? "month";

                    switch (unit) {
                      case "day":
                        return count;
                      case "week":
                        return count * 7;
                      case "month":
                        return count * 30;
                      case "year":
                        return count * 365;
                      default:
                        return Infinity;
                    }
                  };

                  return getDays(a) - getDays(b);
                })
                .map((plan) => {
                  const price = (plan.unit_amount / 100).toFixed(2);
                  const count = Number(plan.recurring?.interval_count ?? 1);
                  const unit = plan.recurring?.interval ?? "month";
                  const planLabel = `${count} ${unit}${count > 1 ? "s" : ""}`;
                  const product =
                    typeof plan.product === "string" ? null : plan.product;
                  const isActive = currentPlan === planLabel;
                  return (
                    <div
                      key={plan.id}
                      className="bg-[#111111] rounded-xl
                      shadow-[0_0_20px_rgba(0,255,255,0.1)] 
                      transition-all duration-300 p-6 flex flex-col justify-between cursor-pointer card-affter opacity-100"
                      data-aos="fade-up"
                      data-aos-duration="6000"
                    >
                  <div className="left-glow"></div>
                   <div className="right-glow"></div>
                      <div>
                        <h3 className="text-lg font-medium mb-1 text-white p-8">
                          {product?.name}
                        </h3>
                        <p className="text-3xl font-bold mb-2 text-white border-t border-[#1e2939] py-5">
                          ${price}
                        </p>
                      </div>
                      <p className="text-sm text-white mb-4 mt-4 bg-[#16181c] py-3.5">
                        {product?.description}
                      </p>
                      <ul className="text-left space-y-2 text-white px-8">
                        {product?.marketing_features.map((features) => (
                          <li className="flex py-1 gap-3" key={features?.name}>
                            <CircleCheck className="text-teal-300" size={20} />
                            <span>
                              <strong className="text-gray-300">
                                {features?.name}
                              </strong>
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="px-8 my-7">
                        {subscriptionId ? (
                          isActive ? (
                            <button
                              className="w-max px-8 py-3 rounded-full text-center font-medium bg-gray-700 text-white cursor-not-allowed"
                              disabled
                            >
                              Current Plan
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleSubscribe(plan.id, planLabel)
                              }
                              className="w-max cursor-pointer px-8 py-3 rounded-full text-center font-medium transition border bg-teal-400 text-black hover:bg-teal-300"
                            >
                              Upgrade
                            </button>
                          )
                        ) : (
                          <button
                            onClick={() => handleSubscribe(plan.id, planLabel)}
                            className="w-max cursor-pointer px-8 py-3 rounded-full text-center font-medium transition border bg-teal-400 text-black hover:bg-teal-300"
                          >
                            Buy Now
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
