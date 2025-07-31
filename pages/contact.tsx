import { useState } from 'react';
import FAQSection from "@/components/FAQSection";

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    const res = await fetch('/api/contactform', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus('Message successfully send!');
      setForm({ name: '', email: '', message: '' });
    } else {
      setStatus('Failed to send message.');
    }
  };

  return (
    <>
      <section className="text-white px-6 py-5 md:py-16 md:px-20 contact">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 md:gap-10  gap-5 items-start">
          <div data-aos="fade-right">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 md:text-start text-center">Contact Us</h2>
            <p className="text-gray-300  md:text-start text-center">Need assistance or have questions? Reach out to us.</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 md:p-10 rounded-lg space-y-4 "  data-aos="fade-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="bg-gray-100 text-black p-3 rounded outline-none"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="bg-gray-100 text-black p-3 rounded outline-none"
                required
              />
            </div>
            <textarea
              name="message"
              rows={6}
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              className="bg-gray-100 text-black p-3 w-full rounded outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-teal-400 text-black font-semibold py-3 rounded hover:bg-teal-300 transition cursor-pointer"
            >
              Send Message
            </button>
            {status && <p className="text-sm mt-2 text-white">{status}</p>}
          </form>
        </div>
        {/* ... your contact blocks */}
      </section>
      <FAQSection />
    </>
  );
};

export default ContactPage;