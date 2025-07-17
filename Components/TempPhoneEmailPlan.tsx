import { Check } from 'lucide-react';
import Link from 'next/link'

interface TempPhoneEmailPlanProps {
  plans: StripePlan[];
  currentPlan: string | null;
  handleSubscribe: (priceId: string, plan: string) => Promise<void>;
}

interface StripePlan {
  id: string;
  unit_amount: number;
  recurring?: {
    interval: 'week' | 'month';
  };
  product: {
    name: string;
  } | string;
}

export default function TempPhoneEmailPlan({ plans, currentPlan, handleSubscribe }: TempPhoneEmailPlanProps) {

  return (
    <>
      <section className="text-white px-6 py-3 md:py-20 burnerPhoneNumberEmailPlans mt-10">
        <div className="text-center mb-12">
          <div className="inline-block bg-[#1d1e1f] text-[#46edd5] font-semibold px-3 py-1 rounded-full mb-4">
            * PRICING
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-teal-300">
            Burner Phone<br />Number/Email Plans
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
          {/* Static Free Plan */}
          <div className="bg-[#111111] p-8 rounded-xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Forever Free – Temp Mail</h3>
              <p className="text-gray-400 mb-6">Forever free, even after the launch</p>
              <div className="font-bold text-teal-300 span_month">
                <h2 className="text-5xl">$0 <span className="text-white font-medium">/ per month</span></h2>
              </div>
              <ul className="mt-6 space-y-2 text-gray-300">
                <li className="flex items-center gap-3"><Check className='text-teal-300' size={20} /> No signup for temp mail required</li>
                <li className="flex items-center gap-3"><Check className='text-teal-300' size={20} /> Change the disposable email</li>
                <li className="flex items-center gap-3"><Check className='text-teal-300' size={20} /> Protect from spam emails</li>
                <li className="flex items-center gap-3"><Check className='text-teal-300' size={20} /> Chat Support</li>
              </ul>
            </div>
            <Link href="/temp-mail" className="mt-8 inline-block border border-white text-white px-6 py-3 rounded-full text-center hover:bg-white hover:text-black transition">Get Started</Link>
          </div>

          {/* Stripe Plans */}
          {plans.map((plan) => {
            const price = (plan.unit_amount / 100).toFixed(2);
            const interval = plan.recurring?.interval || 'month';
            const product = typeof plan.product === 'string' ? null : plan.product;
            const isCurrent = currentPlan === interval;

            return (
              <div key={plan.id} className={`p-8 rounded-xl flex flex-col justify-between ${interval === 'week' ? 'bg-gradient-to-b from-[#1f2d22] to-[#111111] card-affter' : 'bg-[#111111]'}`}>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{product?.name}</h3>
                  <p className="text-gray-400 mb-6">{interval === 'week' ? 'Unlimited SMS verification' : 'Unlimited SMS verification, Better Price'}</p>
                  <div className="font-bold text-teal-300 span_month">
                    <h2 className="text-5xl">${price} <span className="text-white font-medium">/ {interval === 'week' ? 'Per Week' : 'Per Month'}</span></h2>
                  </div>
                  <ul className="mt-6 space-y-2 text-gray-300">
                    {interval === 'week' ? (
                      <>
                        <li className="flex items-center gap-3"><Check className='text-teal-300' size={20} /> Up to 50 SMS verifications/week</li>
                        <li className="flex items-center gap-3"><Check className='text-teal-300' size={20} /> Auto-expiry in 7 days</li>
                        <li className="flex items-center gap-3"><Check className='text-teal-300' size={20} /> Change number once</li>
                        <li className="flex items-center gap-3"><Check className='text-teal-300' size={20} /> Chat support</li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-center gap-3"><Check className='text-teal-300' size={20} /> Unlimited SMS verifications</li>
                        <li className="flex items-center gap-3"><Check className='text-teal-300' size={20} /> Valid for 1 full month</li>
                        <li className="flex items-center gap-3"><Check className='text-teal-300' size={20} /> Change number anytime</li>
                        <li className="flex items-center gap-3"><Check className='text-teal-300' size={20} /> Priority email support</li>
                      </>
                    )}
                  </ul>
                </div>
                <button
                  onClick={() => handleSubscribe(plan.id, interval)}
                  className={`mt-28 inline-block px-6 py-3 rounded-full text-center font-medium transition ${isCurrent ? 'border border-white text-white cursor-not-allowed' : 'bg-teal-400 text-black hover:bg-teal-300'}`}
                  disabled={isCurrent}
                >
                  {isCurrent ? 'Current Plan' : 'Get Started'}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}