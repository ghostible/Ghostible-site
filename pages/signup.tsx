import { useState } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      return
    }

    // Insert into `profiles` table
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        plan: 'free',
        full_name: '',
      })
    }

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <form onSubmit={handleSignup} className="w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold">Sign Up</h2>
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
          Create Account
        </button>
        <p className="text-center text-sm">
            Already have an account? <Link href="/login" className="text-blue-400 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  )
}