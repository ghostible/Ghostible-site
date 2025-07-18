import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabaseClient'
import useAuthRedirect from '@/hooks/useAuthRedirect'

type Profile = {
  id: string
  temp_number: string
  expires_at: string
}

type Message = {
  id: string
  from_number: string
  message: string
  received_at: string
}

export default function Dashboard() {
  const { user, loading } = useAuthRedirect()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    if (!user) return

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, temp_number, expires_at')
        .eq('id', user.id)
        .single()

      if (!error && data) {
        setProfile(data)

        // ✅ Use user_id filter (this must match exactly!)
        const { data: smsData, error: smsError } = await supabase
          .from('sms_messages')
          .select('id, from_number, message, received_at')
          .eq('user_id', data.id)
          .order('received_at', { ascending: false })

        if (smsError) {
          console.error('SMS fetch error:', smsError)
        }

        setMessages(smsData || [])
      }
    }

    fetchProfile()
  }, [user])

  if (loading) {
    return (
      <>
        <div className="text-white bg-black min-h-screen flex justify-center items-center">
          Loading...
        </div>
      </>
    )
  }

  if (!user || !profile) return null

  return (
    <>
      <div className="min-h-screen bg-black text-white px-6 py-10">
        <h1 className="text-4xl font-bold text-center text-teal-400 mb-10">Ghostible Dashboard</h1>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* 🔢 Burner Number Card */}
          <div className="bg-[#111313] border border-[#383838] rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Ghostible Burner Number</h2>
            <p className="text-teal-300 font-mono text-lg">{profile.temp_number}</p>
            <p className="text-sm text-gray-400 mt-1">
              Expires at: {new Date(profile.expires_at).toLocaleDateString()}
            </p>
            <div className="mt-4 space-x-2">
              <button className="px-4 py-1.5 border border-white text-white rounded-full hover:bg-white hover:text-black transition cursor-pointer">
                Cancel
              </button>
              <button className="px-4 py-1.5 bg-teal-400 text-black rounded-full hover:bg-white transition cursor-pointer">
                Renew
              </button>
            </div>
          </div>

          {/* 💬 Message Inbox */}
          <div className="bg-[#111313] border border-[#383838] rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Inbox</h2>
            {messages.length === 0 ? (
              <p className="text-gray-500">No messages received yet.</p>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-[#181a1b] p-4 rounded border border-gray-700">
                    <p className="text-sm text-gray-400">From: {msg.from_number}</p>
                    <p className="text-white mt-1">{msg.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(msg.received_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 🚪 Logout */}
        <div className="text-center mt-10">
          <button
            onClick={async () => {
              await supabase.auth.signOut()
              window.location.href = '/login'
            }}
            className="bg-teal-400 text-black font-semibold py-3 px-8 rounded-full hover:bg-teal-300 transition cursor-pointer">
            Logout
          </button>
        </div>
      </div>
    </>
  )
}
