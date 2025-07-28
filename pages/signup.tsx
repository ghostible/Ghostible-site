import { useState } from 'react'
import { supabase } from '@/utils/supabaseClient'
//import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  //const router = useRouter()
  const [successmessage, setsuccessmessage] = useState('')

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
      const email = data.user.email || ''
      const nickname = email.split('@')[0];
      await supabase.from('profiles').insert({
        id: data.user.id,
        plan: 'free',
        full_name: nickname,
        email: data.user.email
      })
    }
    setEmail('');
    setPassword('');
    setsuccessmessage('You have recieve a email, please Varify the emails for Create Account.'); 
    //router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <form onSubmit={handleSignup} className="w-full max-w-md space-y-4 border border-neutral-800 p-4 rounded-2xl">
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
        <button className="w-full bg-teal-400 text-black font-semibold py-3 px-8 rounded-full hover:bg-teal-300 transition cursor-pointer">
          Create Account
        </button>
        <p className="text-center text-sm">
            Already have an account? <Link href="/login" className="text-teal-400 hover:underline">Login</Link>
        </p>

        <div className='text-teal-400'>
          <p className='text-center text-sm'>{successmessage}</p>
        </div>
      </form>
    </div>
  )
}