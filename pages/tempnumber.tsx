import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/utils/supabaseClient'

const handleSubscribe = async (priceId: string, router: any) => {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    router.push('/login') // redirect to login if not logged in
    return
  }

  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: user.id, priceId }),
  })

  const { url } = await res.json()
  window.location.href = url
}

export default function TempphonePage() {
  const [plans, setPlans] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await fetch('/api/prices');
      const data = await res.json()
      setPlans(data)
    }
    fetchPlans()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">
        Burner Phone Number/Email Plans
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Static Free Plan */}
        <div className="bg-gray-900 p-8 rounded-lg text-center border border-gray-700">
          <h2 className="text-xl font-bold mb-2">Forever Free - Temp Mail</h2>
          <p className="text-4xl font-bold text-green-400 mb-2">$0</p>
          <ul className="text-left text-sm space-y-1 mb-6">
            <li>✅ 10 Minute Inbox</li>
            <li>✅ Change the disposable email</li>
            <li>✅ Protect from spam emails</li>
            <li>✅ Chat Support</li>
          </ul>
          <button className="w-full border border-white py-2 rounded">Get Started</button>
        </div>

        {/* Stripe Dynamic Plans */}
        {plans.map((plan) => {
          const price = (plan.unit_amount / 100).toFixed(2)
          const interval = plan.recurring?.interval || 'month'
          const product = typeof plan.product === 'string' ? null : plan.product

          return (
            <div key={plan.id} className="bg-gray-900 p-8 rounded-lg text-center border border-teal-500">
              <h2 className="text-xl font-bold mb-2">{product?.name}</h2>
              <p className="text-4xl font-bold text-teal-400 mb-2">${price}</p>
              <p className="text-sm text-gray-400 mb-4">/ {interval}</p>
              <ul className="text-left text-sm space-y-1 mb-6">
                <li>✅ Unlimited SMS verification</li>
                <li>✅ Change number if needed</li>
                <li>✅ Stop spam calls</li>
                <li>✅ Private browsing online</li>
              </ul>
              <button
                onClick={() => handleSubscribe(plan.id, router)}
                className="w-full bg-teal-500 hover:bg-teal-600 text-black py-2 rounded"
              >
                Get Started
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}