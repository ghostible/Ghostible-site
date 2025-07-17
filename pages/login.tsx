import { useState } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { useRouter } from 'next/router'
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return setError(error.message)
    router.push('/dashboard') // or homepage after login
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="w-full max-w-md space-y-4">
        <h2 className="text-3xl font-bold">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
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
        <button className="w-full bg-white text-black py-3 rounded font-bold hover:bg-gray-200 transition">
          Login
        </button>
        <p className="text-center mt-2 text-sm">
            <Link href="/signup" className="text-blue-400 hover:underline">Sign up</Link>
        </p>
        <p className="text-center mt-2 text-sm">
            <Link href="/forgot-password" className="text-blue-400 hover:underline">Forgot Password?</Link>
        </p>

      </form>
    </div>
  )
}
