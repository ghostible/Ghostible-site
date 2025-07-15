import { useEffect, useState } from 'react'
import axios from 'axios'

const TempMailPage: React.FC = ({ }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [messages, setMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const saved = localStorage.getItem('tempMailAccount')
      if (saved) {
        const parsed = JSON.parse(saved)
        setEmail(parsed.email)
        setPassword(parsed.password)
        const newToken = await getToken(parsed.email, parsed.password)
        if (newToken) {
          setToken(newToken)
          setLoading(false)
          return
        }
      }
      await createTempAccount()
    }
    init()
  }, [])

  const createTempAccount = async () => {
    try {
      const domainRes = await axios.get('https://api.mail.tm/domains')
      const domain = domainRes.data['hydra:member'][0].domain
      const random = Math.random().toString(36).substring(2, 10)
      const newEmail = `${random}@${domain}`
      const newPassword = 'Ghostible123'

      await axios.post('https://api.mail.tm/accounts', {
        address: newEmail,
        password: newPassword,
      })

      const newToken = await getToken(newEmail, newPassword)

      const account = { email: newEmail, password: newPassword, token: newToken }
      localStorage.setItem('tempMailAccount', JSON.stringify(account))

      setEmail(newEmail)
      setPassword(newPassword)
      setToken(newToken)
      setLoading(false)
    } catch (err) {
      console.error('Error creating temp email', err)
    }
  }

  const getToken = async (email: string, password: string) => {
    try {
      const tokenRes = await axios.post('https://api.mail.tm/token', {
        address: email,
        password,
      })
      return tokenRes.data.token
    } catch {
      return null
    }
  }

  const fetchInbox = async () => {
    try {
      const res = await axios.get('https://api.mail.tm/messages', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setMessages(res.data['hydra:member'])
    } catch (err) {
      console.error('Inbox fetch error', err)
    }
  }

  useEffect(() => {
    if (!token) return
    fetchInbox()
    const interval = setInterval(fetchInbox, 3000)
    return () => clearInterval(interval)
  }, [token])

  const loadFullMessage = async (id: string) => {
    try {
      const res = await axios.get(`https://api.mail.tm/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setSelectedMessage(res.data)
    } catch (err) {
      console.error('Fetch full message error', err)
    }
  }

  const handleChangeEmail = () => {
    localStorage.removeItem('tempMailAccount')
    window.location.reload()
  }

  return (
    <div className="bg-[#f5f7fa] min-h-screen py-8 px-4 text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">📧 Temp Mail</h1>

        {/* Show current email and controls */}
        {!loading && !selectedMessage && (
          <div className="text-center mb-4">
            <p className="text-lg font-mono">
              Your Temp Email: <span className="text-green-600">{email}</span>
            </p>
            <button
              onClick={handleChangeEmail}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Change Email
            </button>
          </div>
        )}

        {/* Inbox or Message Viewer */}
        {selectedMessage ? (
          <div className="bg-white p-6 rounded shadow">
            <button
              onClick={() => setSelectedMessage(null)}
              className="mb-4 text-sm text-blue-600 hover:underline"
            >
              ← Back to Inbox
            </button>
            <h2 className="text-xl font-bold mb-2">{selectedMessage.subject}</h2>
            <p className="text-sm text-gray-600 mb-4">
              From: {selectedMessage.from?.address}
            </p>
            {selectedMessage.html ? (
              <div
                className="prose max-w-full"
                dangerouslySetInnerHTML={{ __html: selectedMessage.html }}
              />
            ) : (
              <p className="bg-gray-100 p-4 rounded">{selectedMessage.text}</p>
            )}
          </div>
        ) : (
          <div className="bg-white rounded shadow overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2">Sender</th>
                  <th className="px-4 py-2">Subject</th>
                  <th className="px-4 py-2 text-center">View</th>
                </tr>
              </thead>
              <tbody>
                {messages.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-16">
                      <div className="flex flex-col items-center text-gray-500">
                        <svg
                          className="w-12 h-12 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 10H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2z"
                          />
                        </svg>
                        <p className="text-lg font-semibold">Your inbox is empty</p>
                        <p className="text-sm">Waiting for incoming emails</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  messages.map((msg: any) => (
                    <tr
                      key={msg.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{msg.from?.address}</td>
                      <td className="px-4 py-2">{msg.subject}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => loadFullMessage(msg.id)}
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Upgrade CTA */}
        {!selectedMessage && (
          <div className="text-center mt-6">
            <p className="mb-2">Want to unlock burner phone numbers?</p>
            <a
              href="/login"
              className="inline-block bg-black text-white px-5 py-2 rounded hover:bg-gray-800"
            >
              Upgrade Now
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default TempMailPage;