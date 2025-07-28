import { useState } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { useRouter } from 'next/router'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    //const { data, error } = await supabase.auth.updateUser({ password })
    const { error } = await supabase.auth.updateUser({ password })
    if (error) return setError(error.message)
    setSuccess('Password updated! Redirecting to login...')
    setTimeout(() => router.push('/login'), 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <form onSubmit={handleUpdate} className="w-full max-w-md space-y-4 border border-neutral-800 p-4 rounded-2xl">
        <h2 className="text-teal-400 text-2xl font-bold">Reset Password</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-teal-400 text-black font-semibold py-3 px-8 rounded-full hover:bg-teal-300 transition cursor-pointer">
          Update Password
        </button>
      </form>
    </div>
  )
}
