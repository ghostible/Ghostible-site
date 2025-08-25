import { useState } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { useRouter } from 'next/router'
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    toast({
        title: "🔐 Logging In",
        description: `Please wait while we sign you in...`,
    });
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      toast({
        title: "❌ Login Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
    else{
      router.push('/dashboard')
      toast({
          title: "✅ Login Successful",
          description: `Welcome back! 🎉`,
      });
    }
  }

  return (
    <div className="md:min-h-screen bg-black text-white flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="w-full max-w-md space-y-4  border border-neutral-800 p-4 rounded-2xl">
        <h2 className="text-3xl font-bold">Login</h2>
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
          Login
        </button>
        <p className="text-center mt-2 text-sm">
            <Link href="/signup" className="text-teal-400 hover:underline">Sign up</Link>
        </p>
        <p className="text-center mt-2 text-sm">
            <Link href="/forgot-password" className="text-teal-400 hover:underline">Forgot Password?</Link>
        </p>

      </form>
    </div>
  )
}
