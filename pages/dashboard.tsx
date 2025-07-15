import { supabase } from '@/utils/supabaseClient'
import useAuthRedirect from '@/hooks/useAuthRedirect'

export default function Dashboard() {
  const { user, loading } = useAuthRedirect()

  if (loading) return <div className="text-white bg-black min-h-screen flex justify-center items-center">Loading...</div>
  if (!user) return null

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="bg-gray-900 p-6 rounded space-y-2 max-w-md">
        <p><strong>User ID:</strong> {user.id}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <button
        onClick={async () => {
          await supabase.auth.signOut()
          window.location.href = '/login'
        }}
        className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  )
}
