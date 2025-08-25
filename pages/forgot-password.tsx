import { useState } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { useToast } from "@/hooks/use-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const { toast } = useToast();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    if (error) {
      //return setError(error.message)
      toast({
        title: "Password reset",
        description: error.message || "Failed to send email", 
        variant: "destructive",
      });
    }else{
      toast({
        title: "Password reset",
        description: `Password reset link sent! Check your email.`, 
      });
    }
    
  }

  return (
    <div className="md:min-h-screen bg-black text-white flex items-center justify-center p-4">
      <form onSubmit={handleReset} className="w-full max-w-md space-y-4 border border-neutral-800 p-4 rounded-2xl">
        <h2 className="text-teal-400 text-2xl font-bold">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button className="w-full bg-teal-400 text-black font-semibold py-3 px-8 rounded-full hover:bg-teal-300 transition cursor-pointer">
          Send Reset Link
        </button>
      </form>
    </div>
  )
}