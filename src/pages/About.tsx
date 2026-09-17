import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Heart, Leaf, Award } from 'lucide-react';

export default function About() {
  const { theme } = useStore();

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 sparkle-bg"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">Our Story</h1>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Born from a passion for beauty and self-care, Glow & Sparkle is more than a brand — it's a movement celebrating your unique radiance.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className={`text-lg mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              We believe that everyone deserves to feel beautiful and confident in their own skin. That's why we create premium, thoughtfully formulated products that enhance your natural beauty.
            </p>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Every product in our collection is crafted with the finest ingredients, backed by science, and designed to make you feel like the best version of yourself.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop" alt="Beauty products" className="rounded-2xl w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=400&fit=crop" alt="Skincare routine" className="rounded-2xl w-full h-48 object-cover mt-8" />
            <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop" alt="Makeup collection" className="rounded-2xl w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop" alt="Hair care" className="rounded-2xl w-full h-48 object-cover mt-8" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-pink-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Sparkles, title: 'Premium Quality', desc: 'Only the finest ingredients make it into our formulas.' },
              { icon: Heart, title: 'Cruelty-Free', desc: 'We never test on animals. Beauty without compromise.' },
              { icon: Leaf, title: 'Clean Beauty', desc: 'Free from harmful chemicals. Good for you and the planet.' },
              { icon: Award, title: 'Dermatologist Tested', desc: 'Every product is tested and approved by skin experts.' },
            ].map((value, i) => (
              <div key={i} className={`text-center p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-pink-500" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{value.title}</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Hussna', role: 'Founder & CEO', img: 'https://image.qwenlm.ai/generated-images/4c39de47-32fd-471e-9935-658b3765892d/_result.png' },
            { name: 'Isabella Rose', role: 'Head of Product', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop' },
            { name: 'Emma Laurent', role: 'Creative Director', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop' },
          ].map((member, i) => (
            <div key={i} className="text-center">
              <img src={member.img} alt={member.name} className="w-40 h-40 rounded-full mx-auto mb-4 object-cover border-4 border-pink-100" />
              <h3 className="font-heading font-bold text-lg">{member.name}</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-pink-400' : 'text-pink-500'}`}>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gradient-to-r from-pink-100 to-rose-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '50K+', label: 'Happy Customers' },
              { value: '200+', label: 'Products' },
              { value: '15+', label: 'Countries' },
              { value: '4.8★', label: 'Average Rating' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-bold text-pink-600">{stat.value}</p>
                <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
