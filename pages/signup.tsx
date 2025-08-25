import { useState } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    toast({
        title: "🔐 Signup",
        description: `Please wait while we sign you in...`,
    });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "https://ghostible.io/start?redirect=price_sec",
      }
    })

    if (error) {
        toast({
          title: "❌ Signup Failed",
          description: error.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      return
    }

    if (data.user) {
      const email = data.user.email || ''
      const nickname = email.split('@')[0];
      await supabase.from('profiles').insert({
        id: data.user.id,
        full_name: nickname,
        email: data.user.email
      })
    }
    setEmail('');
    setPassword('');
    toast({
      title: "Confirmations Email",
      description: `You have recieve a email, please Varify the emails for Create Account.`, 
    });

  }

  return (
    <div className="md:min-h-screen bg-black text-white flex items-center justify-center p-4">
      <form onSubmit={handleSignup} className="w-full max-w-md space-y-4 border border-neutral-800 p-4 rounded-2xl">
        <h2 className="text-2xl font-bold">Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-teal-400 text-black font-semibold py-3 px-8 rounded-full hover:bg-teal-300 transition cursor-pointer">
          Create Account
        </button>
        <p className="text-center text-sm">
            Already have an account? <Link href="/login" className="text-teal-400 hover:underline">Login</Link>
        </p>

      </form>
    </div>
  )
}