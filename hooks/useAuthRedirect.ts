import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/utils/supabaseClient'

export default function useAuthRedirect() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.replace('/login')
      } else {
        setUser(data.user)
      }
      setLoading(false)
    }

    getUser()
  }, [router])

  return { user, loading }
}
