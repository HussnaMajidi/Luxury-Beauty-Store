import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

export default function Contact() {
  const { theme } = useStore();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 sparkle-bg"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className={`text-lg max-w-xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            We'd love to hear from you. Whether you have a question about our products, need help with an order, or just want to say hello.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              { icon: Mail, title: 'Email Us', info: 'hello@glowandsparkle.com', sub: 'We reply within 24 hours' },
              { icon: Phone, title: 'Call Us', info: '+1 (555) 123-4567', sub: 'Mon-Fri, 9am-6pm EST' },
              { icon: MapPin, title: 'Visit Us', info: '123 Beauty Lane, Suite 100', sub: 'New York, NY 10001' },
              { icon: Clock, title: 'Business Hours', info: 'Monday - Friday: 9am - 6pm', sub: 'Saturday: 10am - 4pm' },
            ].map((item, i) => (
              <div key={i} className={`flex items-start gap-4 p-5 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">{item.title}</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{item.info}</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{item.sub}</p>
                </div>
              </div>
            ))}

            {/* Live Chat */}
            <div className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-pink-900/50 to-purple-900/50' : 'bg-gradient-to-br from-pink-100 to-rose-100'}`}>
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-6 h-6 text-pink-500" />
                <h3 className="font-heading font-bold">Live Chat</h3>
              </div>
              <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Chat with our beauty experts in real-time.</p>
              <button className="px-4 py-2 bg-pink-500 text-white text-sm rounded-full hover:bg-pink-600 transition-colors">
                Start Chat
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`lg:col-span-2 rounded-2xl p-6 md:p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <h2 className="font-heading text-2xl font-bold mb-6">Send Us a Message</h2>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Your Name</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`}
                    placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Email Address</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`}
                    placeholder="jane@example.com" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Subject</label>
                <select value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`}>
                  <option value="">Select a topic</option>
                  <option value="order">Order Inquiry</option>
                  <option value="product">Product Question</option>
                  <option value="return">Returns & Refunds</option>
                  <option value="wholesale">Wholesale Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Message</label>
                <textarea required rows={6} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`}
                  placeholder="Tell us how we can help..." />
              </div>
              <button type="submit" className="btn-shimmer flex items-center gap-2 px-8 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-all shadow-lg shadow-pink-500/30">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: 'What is your return policy?', a: 'We offer a 30-day hassle-free return policy. If you\'re not satisfied with your purchase, simply contact us for a full refund.' },
              { q: 'Do you ship internationally?', a: 'Yes! We ship to over 15 countries worldwide. International shipping typically takes 7-14 business days.' },
              { q: 'Are your products cruelty-free?', a: 'Absolutely! All Glow & Sparkle products are 100% cruelty-free and never tested on animals.' },
              { q: 'How can I track my order?', a: 'Once your order ships, you\'ll receive a tracking number via email. You can also track orders in your account dashboard.' },
            ].map((faq, i) => (
              <details key={i} className={`group rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <summary className={`flex items-center justify-between p-5 cursor-pointer font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {faq.q}
                  <span className="text-pink-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className={`px-5 pb-5 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
