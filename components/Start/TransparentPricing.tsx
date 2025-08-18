import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { MoveRight, Check } from 'lucide-react';

interface TempPhoneEmailPlanProps {
  plans: StripePlan[];
  currentPlan: string | null;
  handleSubscribe: (priceId: string, planLabel: string, mode: "payment" | "subscription") => Promise<void>;
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

export default function TransparentPricing({plans, currentPlan, handleSubscribe,}: TempPhoneEmailPlanProps) {

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
      <section id="price_sec" className="pt-8 pb-16 pl-6 pr-6" data-aos="fade-up" data-aos-duration="5000">
        <div className="max-w-6xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans
              .sort((a, b) => {
                const getPriority = (plan: StripePlan) => {
                  if (!plan.recurring) return 0;
                  if (plan.recurring.interval === "week") return 1;
                  if (plan.recurring.interval === "month") return 2;
                  return 3;
                };
                return getPriority(a) - getPriority(b);
              })
              .map((plan) => {
                const price = (plan.unit_amount / 100).toFixed(2);
                const count = Number(plan.recurring?.interval_count ?? 1);
                const unit = plan.recurring?.interval ?? "month";

                let planLabel: string;
                let buttonText: string;
                if (!plan.recurring) {
                  planLabel = "One-Time Pass";
                  buttonText = "Buy One-Time Pass";
                } else if (plan.recurring.interval === "week") {
                  planLabel = "Weekly Pass";
                  buttonText = "Start Weekly Pass";
                } else if (plan.recurring.interval === "month") {
                  planLabel = "Monthly Pass";
                  buttonText = "Start Monthly Pass";
                } else {
                  planLabel = `${count} ${unit}${count > 1 ? "s" : ""}`;
                  const capitalized = unit.charAt(0).toUpperCase() + unit.slice(1);
                  buttonText = `Start ${capitalized}ly Pass`;
                }

                const product = typeof plan.product === "string" ? null : plan.product;
                const isActive = currentPlan === planLabel;

                return (
                  <>
                    <div key={plan.id}className={`bg-[#080808] border-opacity-50 hover:border-teal-400 rounded-2xl pt-6 pb-6 pl-8 pr-8 flex flex-col items-center ${planLabel === 'Weekly Pass' ? "scale-105 border-1 border-teal-400 relative" : "border border-gray-700"}`}
                      data-aos="fade-up"
                      data-aos-duration="6000">
                      {planLabel === 'Weekly Pass' ? (
                        <span className="absolute -top-6 bg-teal-400 text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold rounded-full">
                          Most Popular
                        </span>
                          ) : (
                          ''
                      )}
                      <h3 className="text-2xl font-bold text-white mb-1 mt-2.5">
                        {product?.name}
                      </h3>
                      <p className="text-gray-400 mb-6 text-sm">
                        {product?.description}
                      </p>
                      <p className="text-4xl font-bold text-white mb-6">
                        ${price}
                        {plan.recurring && (
                          <span className="text-gray-400 mb-6 text-sm font-light">
                            &nbsp;/ per {unit}
                          </span>
                        )}
                      </p>
                      <ul className="text-gray-300 text-sm space-y-2 mb-6 text-left w-full">
                        {product?.marketing_features.map((features) => (
                          <li className="flex items-center gap-2" key={features?.name}>
                            <Check className="text-teal-300 h-5 w-5 flex-shrink-0" size={20} /> {features?.name}
                          </li>
                        ))}
                      </ul>
                      {subscriptionId ? (
                        isActive ? (
                          <button className={`w-full cursor-pointer border border-gray-700 px-6 py-2 rounded-md hover:bg-teal-300 transition ${planLabel === 'Weekly Pass' ? "text-sm font-semibold text-black bg-teal-400" : "bg-black hover:text-black text-white"}`}
                                          disabled>Active Plan</button>
                        ) : (
                          <button onClick={() => handleSubscribe(plan.id, planLabel, !plan.recurring ? "payment" : "subscription")} className={`w-full cursor-pointer border border-gray-700 px-6 py-2 rounded-md hover:bg-teal-300 transition ${planLabel === 'Weekly Pass' ? "text-sm font-semibold text-black bg-teal-400" : "bg-black hover:text-black text-white"}`}>
                            {buttonText}
                          </button>
                        )
                      ) : (
                        <button onClick={() => handleSubscribe(plan.id, planLabel, !plan.recurring ? "payment" : "subscription")} className={`w-full cursor-pointer border border-gray-700 px-6 py-2 rounded-md hover:bg-teal-300 transition ${planLabel === 'Weekly Pass' ? "text-sm font-semibold text-black bg-teal-400" : "bg-black hover:text-black text-white"}`}>
                          {buttonText}
                        </button>
                      )}
                    </div>
                  </>
                );
              })
            }
          </div>
          <div className="mt-10">
            <button className="bg-teal-400 flex group gap-2.5  cursor-pointer mx-auto justify-center text-black font-medium px-8 py-3 rounded-md hover:bg-teal-300 transition">
              <span>Get a Temp Number Now</span>  <MoveRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>
  )
}
