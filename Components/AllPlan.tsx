// import React from 'react'
import { useEffect, useState } from 'react'
import { CircleCheck } from "lucide-react";
import { supabase } from '@/utils/supabaseClient'
//import useAuthRedirect from '@/hooks/useAuthRedirect'
// import { Check } from 'lucide-react';
import Link from 'next/link'

interface TempPhoneEmailPlanProps {
  plans: StripePlan[];
  currentPlan: string | null;
  //handleSubscribe: (priceId: string, plan: string) => Promise<void>;
  handleSubscribe: (priceId: string, planLabel: string) => Promise<void>;
}

interface StripePlan {
  id: string;
  unit_amount: number;
  recurring?: {
    interval: 'day' | 'week' | 'month' | 'year';
    interval_count: '1' | '3' | '6';
  };
  product: {
    name: string;
    description: string;
    marketing_features: marketing_features[];
  } | string;
}

type marketing_features = {
  name: string;
};

export default function AllPlan({ plans, currentPlan, handleSubscribe }: TempPhoneEmailPlanProps) {

  //const [upgrademessage, setupgrademessage] = useState('')
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null)

  useEffect(() => {
    const fetchSubscription = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data, error } = await supabase
        .from('profiles')
        .select('subscription_id')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error fetching subscription ID:', error)
      } else {
        setSubscriptionId(data?.subscription_id || null)
      }
    }

    fetchSubscription()
  }, [])

  return (
    <>
     <div className="w-full">
        <section className="lg:max-w-7xl w-full mx-auto px-4 text-center price-section">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full lg:w-5xl mx-auto gap-6 pb-12">
              <div className="bg-[#111111] rounded-xl card-affter">
                <div>
                  <h3 className="text-lg font-medium mb-1 text-white p-8">
                    Forever Free – Temp Mail
                  </h3>
                  <p className="text-3xl font-bold mb-2 text-white border-t border-[#1e2939] py-5">
                    $0
                  </p>
                </div>
                <p className="text-sm text-white mb-4 mt-4 bg-[#16181c] py-3.5">
                  Awesome Free Temp Mail.
                </p>
                <ul className="text-left space-y-2 text-white sm:px-8">
                  <li className="flex py-1 gap-3">
                    <CircleCheck className="text-teal-300" size={20} />
                    <span>
                      <strong className="text-teal-300">1</strong>
                      <span className="text-gray-300"> Non-VOIP Number</span>
                    </span>
                  </li>
                  <li className="flex py-1 gap-3">
                    <CircleCheck className="text-teal-300" size={20} />
                    <span>
                      <span className="text-gray-300">Register for </span>
                      <strong className="text-teal-300">
                        any online platform
                      </strong>
                    </span>
                  </li>
                  <li className="flex py-1 gap-3">
                    <CircleCheck className="text-teal-300" size={20} />
                    <span>
                      <span className="text-gray-300"> Works in</span>
                      <strong className="text-teal-300"> all countries</strong>
                    </span>
                  </li>
                  <li className="flex py-1 gap-3">
                    <CircleCheck className="text-teal-300" size={20} />
                    <span>
                      <span className="text-gray-300">Get</span>
                      <strong className="text-teal-300"> instant</strong>
                      <span className="text-gray-300"> SMS 24/7</span>
                    </span>
                  </li>
                  <li className="flex py-1 gap-3">
                    <CircleCheck className="text-teal-300" size={20} />
                    <span>
                      <span className="text-gray-300">Receive unlimited </span>
                      <strong className="text-teal-300">SMS verifications</strong>
                    </span>
                  </li>
                </ul>
                <div className="sm:px-8 my-7">
                  <Link href="/temp-mail" className="block w-full cursor-pointer px-6 py-3 rounded-md text-center font-medium transition border bg-teal-400 text-black hover:bg-teal-300">Buy Now</Link>
                </div>
              </div>
              {plans
                .sort((a, b) => {
                  const getDays = (plan: StripePlan) => {
                    const count = Number(plan.recurring?.interval_count ?? 1);
                    const unit = plan.recurring?.interval ?? 'month';

                    switch (unit) {
                      case 'day': return count;
                      case 'week': return count * 7;
                      case 'month': return count * 30;
                      case 'year': return count * 365;
                      default: return Infinity;
                    }
                  };

                  return getDays(a) - getDays(b);
                })
                .map((plan) => {
                  
                 

                  const price = (plan.unit_amount / 100).toFixed(2);
                  const count = Number(plan.recurring?.interval_count ?? 1);
                  const unit = plan.recurring?.interval ?? 'month';
                  const planLabel = `${count} ${unit}${count > 1 ? 's' : ''}`;
                  const product = typeof plan.product === 'string' ? null : plan.product;
                  const isActive = currentPlan === planLabel;
                  return (
                     
                     
                    <div key={plan.id} className="bg-[#111111] rounded-xl card-affter opacity-100">
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
                      <ul className="text-left space-y-2 text-white sm:px-8">
                        {product?.marketing_features.map((features) => (
                          <li className="flex py-1 gap-3" key={features?.name}>
                            <CircleCheck className="text-teal-300" size={20} />
                            <span>
                              <strong className="text-gray-300">{features?.name}</strong>
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="sm:px-8 my-7">
                        {subscriptionId ? (
                          isActive ? (
                            <button className="w-full px-6 py-3 rounded-md text-center font-medium bg-gray-700 text-white cursor-not-allowed" disabled>Current Plan</button>
                          ) : (
                            <button onClick={() => handleSubscribe(plan.id, planLabel)} className="w-full cursor-pointer px-6 py-3 rounded-md text-center font-medium transition border bg-teal-400 text-black hover:bg-teal-300">Upgrade</button>
                          )
                        ) : (
                          <button onClick={() => handleSubscribe(plan.id, planLabel)} className="w-full cursor-pointer px-6 py-3 rounded-md text-center font-medium transition border bg-teal-400 text-black hover:bg-teal-300">Buy Now</button>
                        )}
                      </div>
                      {/* {upgrademessage && (
                        <div className="text-teal-400 mt-4">
                          <p className="text-sm">{upgrademessage}</p>
                        </div>
                      )} */}
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
