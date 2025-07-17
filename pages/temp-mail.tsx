import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Image from "next/image";
import Link from 'next/link';

type Message = {
  id: string;
  subject: string;
  from: { address: string };
  text?: string;
  html?: string;
};

const TempMailPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [, setPassword] = useState(''); // password value not needed
  const [token, setToken] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  const getToken = async (email: string, password: string): Promise<string | null> => {
    try {
      const tokenRes = await axios.post('https://api.mail.tm/token', {
        address: email,
        password,
      });
      return tokenRes.data.token;
    } catch {
      return null;
    }
  };

  const createTempAccount = useCallback(async () => {
    try {
      const domainRes = await axios.get('https://api.mail.tm/domains');
      const domain = domainRes.data['hydra:member'][0].domain;
      const random = Math.random().toString(36).substring(2, 10);
      const newEmail = `${random}@${domain}`;
      const newPassword = 'Ghostible123';

      await axios.post('https://api.mail.tm/accounts', {
        address: newEmail,
        password: newPassword,
      });

      const newToken = await getToken(newEmail, newPassword);

      const account = { email: newEmail, password: newPassword, token: newToken, createdAt: Date.now() };
      localStorage.setItem('tempMailAccount', JSON.stringify(account));


      setEmail(newEmail);
      setPassword(newPassword);
      setToken(newToken || '');
      setLoading(false);
    } catch (err) {
      console.error('Error creating temp email', err);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const saved = localStorage.getItem('tempMailAccount');
      if (saved) {
        const parsed = JSON.parse(saved);
        const now = Date.now();
        const createdAt = parsed.createdAt ?? 0;

        if (now - createdAt < 10 * 60 * 1000) {
          // Less than 10 mins — continue using
          setEmail(parsed.email);
          setPassword(parsed.password);
          const newToken = await getToken(parsed.email, parsed.password);
          if (newToken) {
            setToken(newToken);
            setLoading(false);
            return;
          }
        }

        // Expired — reset
        localStorage.removeItem('tempMailAccount');
      }

      await createTempAccount(); // Will create a new email and reset inbox
    };
    init();
  }, [createTempAccount]);

  useEffect(() => {
    const saved = localStorage.getItem('tempMailAccount');
    if (saved) {
      const { createdAt } = JSON.parse(saved);
      const remainingTime = 10 * 60 * 1000 - (Date.now() - createdAt);

      if (remainingTime > 0) {
        const timeout = setTimeout(() => {
          localStorage.removeItem('tempMailAccount');
          window.location.reload();
        }, remainingTime);
        return () => clearTimeout(timeout);
      } else {
        localStorage.removeItem('tempMailAccount');
        window.location.reload();
      }
    }
  }, []);

  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const saved = localStorage.getItem('tempMailAccount');
      if (saved) {
        const { createdAt } = JSON.parse(saved);
        const remaining = 10 * 60 * 1000 - (Date.now() - createdAt);
        setTimeLeft(Math.max(0, Math.floor(remaining / 1000)));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  const fetchInbox = useCallback(async () => {
    try {
      const res = await axios.get('https://api.mail.tm/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data['hydra:member']);
    } catch (err) {
      console.error('Inbox fetch error', err);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    fetchInbox();
    const interval = setInterval(fetchInbox, 3000);
    return () => clearInterval(interval);
  }, [token, fetchInbox]);

  const loadFullMessage = async (id: string) => {
    try {
      const res = await axios.get(`https://api.mail.tm/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedMessage(res.data);
    } catch (err) {
      console.error('Fetch full message error', err);
    }
  };

  const handleChangeEmail = () => {
    localStorage.removeItem('tempMailAccount');
    window.location.reload();
  };

  return (
    <div className="bg-[#070806] min-h-screen py-8 px-4 text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6"><Image className="m-auto" src="/Ghost_temp.png" alt="imagetext" width={500} height={500} /></h1>

        {/* Show current email and controls */}
        {!loading && !selectedMessage && (
          <div className="text-center mb-4">
            <p className="text-lg font-mono mt-4 mb-6 text-gray-300">
              Your Temp Email: <span className="text-teal-300">{email}</span>
            </p>
            <p className="text-lg font-mono mt-4 mb-6 text-gray-300">
              Expire in: {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
            </p>
            <button onClick={handleChangeEmail}  className="bg-teal-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-teal-300 transition mb-2 cursor-pointer">
              Change Email
            </button>
          </div>
        )}

        {/* Inbox or Message Viewer */}
        {selectedMessage ? (
          <div className=" p-6 bg-[#111313] border  h-full border-[#383838] rounded-md">
            <button  onClick={() => setSelectedMessage(null)} className="mb-4 text-sm text-teal-300 hover:underline">
              ← Back to Inbox
            </button>
            <h2 className="text-xl font-bold mb-2 text-gray-300">{selectedMessage.subject}</h2>
            <p className="text-sm text-gray-300 mb-4">
              From: {selectedMessage.from?.address}
            </p>
            {selectedMessage.html ? (
              <div
                className="prose max-w-full text-gray-300"
                dangerouslySetInnerHTML={{ __html: selectedMessage.html }}
              />
            ) : (
              <p className="bg-gray-100 p-4 rounded">{selectedMessage.text}</p>
            )}
          </div>
        ) : (
          <div className="bg-[#111313] border  h-full border-[#383838] rounded-md mt-8">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2 bg-teal-400">Sender</th>
                  <th className="px-4 py-2 bg-teal-400">Subject</th>
                  <th className="px-4 py-2 bg-teal-400 text-center">View</th>
                </tr>
              </thead>
              <tbody>
                {messages.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-16 ">
                      <div className="flex flex-col items-center text-gray-500">
                        <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  messages.map((msg) => (
                    <tr key={msg.id} className="border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-2 px-4 py-2 bg-[#111313] font-mono mt-4 mb-6 text-gray-300">{msg.from?.address}</td>
                      <td className="px-4 py-2 px-4 py-2 bg-[#111313] font-mono mt-4 mb-6 text-gray-300">{msg.subject}</td>
                      <td className="px-4 py-2 px-4 py-2 bg-[#111313] font-mono mt-4 mb-6 text-gray-300 text-center">
                        <button onClick={() => loadFullMessage(msg.id)} className="text-teal-300 hover:underline">
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
            <Link href="/tempnumber" className="bg-teal-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-teal-300 transition">
              Upgrade Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TempMailPage;