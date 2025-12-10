'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle, ArrowUpRight, Check } from 'lucide-react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#FFFCFB' }}>
      
      {/* Hero Section */}
      <div className="px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{ background: '#3D646010', border: '1px solid #BE6C7730' }}
            >
              <MessageCircle size={14} style={{ color: '#94545C' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#3D6460' }}>
                Contact
              </span>
            </div>

            <h1 
              className="text-4xl md:text-5xl font-black leading-tight mb-4"
              style={{ color: '#2C2C2C', letterSpacing: '-0.02em' }}
            >
              Let Us Talk About
              <br />
              Your <span style={{ color: '#94545C' }}>Skin Goals</span>
            </h1>

            <p className="text-lg leading-relaxed" style={{ color: '#3D6460', opacity: 0.7 }}>
              We are here to answer questions, provide recommendations, and help you find the perfect products for your skin.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Form on Right, Info on Left */}
      <div className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column - Contact Info (40%) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Contact Methods */}
              <div>
                <h3 className="text-xl font-black mb-4" style={{ color: '#2C2C2C' }}>
                  Reach Out
                </h3>

                <div className="space-y-3">
                  {[
                    {
                      icon: Phone,
                      title: 'Phone',
                      value: '+962 6 123 4567',
                      desc: 'Mon-Fri, 9AM-6PM'
                    },
                    {
                      icon: Mail,
                      title: 'Email',
                      value: 'hello@deadsea.com',
                      desc: '24h response time'
                    },
                    {
                      icon: MapPin,
                      title: 'Location',
                      value: 'Amman, Jordan',
                      desc: 'By appointment'
                    }
                  ].map((item, i) => (
                    <div 
                      key={i}
                      className="group p-5 rounded-xl transition-all duration-300 cursor-pointer"
                      style={{
                        background: '#3D646005',
                        border: '2px solid #BE6C7715'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#3D646010';
                        e.currentTarget.style.borderColor = '#94545C';
                        e.currentTarget.style.transform = 'translateX(6px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#3D646005';
                        e.currentTarget.style.borderColor = '#BE6C7715';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: '#3D646015' }}
                          >
                            <item.icon size={18} style={{ color: '#94545C' }} />
                          </div>
                          <div>
                            <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#3D6460', opacity: 0.5 }}>
                              {item.title}
                            </div>
                            <div className="text-base font-black mb-1" style={{ color: '#2C2C2C' }}>
                              {item.value}
                            </div>
                            <div className="text-sm" style={{ color: '#3D6460', opacity: 0.6 }}>
                              {item.desc}
                            </div>
                          </div>
                        </div>
                        <ArrowUpRight 
                          size={18} 
                          className="transition-all duration-300 opacity-0 group-hover:opacity-100"
                          style={{ color: '#94545C' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div 
                className="p-6 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, #3D6460 0%, #94545C 100%)',
                  boxShadow: '0 20px 40px rgba(148, 84, 92, 0.2)'
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <Clock size={20} style={{ color: '#FFFCFB' }} />
                  <h3 className="text-lg font-black" style={{ color: '#FFFCFB' }}>
                    Business Hours
                  </h3>
                </div>

                <div className="space-y-3">
                  {[
                    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
                    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
                    { day: 'Sunday', hours: 'Closed' }
                  ].map((item, i) => (
                    <div 
                      key={i}
                      className="flex justify-between items-center pb-3"
                      style={{ 
                        borderBottom: i < 2 ? '1px solid rgba(255, 252, 251, 0.2)' : 'none'
                      }}
                    >
                      <span className="text-sm font-medium" style={{ color: '#FFFCFB', opacity: 0.9 }}>
                        {item.day}
                      </span>
                      <span className="text-sm font-black" style={{ color: '#FFFCFB' }}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Teaser */}
              <div 
                className="p-5 rounded-xl"
                style={{ background: '#3D646008', border: '2px solid #BE6C7720' }}
              >
                <h4 className="text-base font-black mb-2" style={{ color: '#2C2C2C' }}>
                  Need Quick Answers?
                </h4>
                <p className="text-sm mb-3" style={{ color: '#3D6460', opacity: 0.7 }}>
                  Check our FAQ section for instant solutions to common questions.
                </p>
                <button
                  className="text-sm font-bold flex items-center gap-2 transition-all duration-300"
                  style={{ color: '#94545C' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  View FAQs
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>

            {/* Right Column - Form (60%) */}
            <div className="lg:col-span-7">
              <div 
                className="relative p-8 rounded-2xl"
                style={{
                  background: '#FFFCFB',
                  border: '3px solid #BE6C7730',
                  boxShadow: '0 25px 60px rgba(61, 100, 96, 0.12)'
                }}
              >
                {/* Success Message Overlay */}
                {submitted && (
                  <div 
                    className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl z-20"
                    style={{
                      background: 'rgba(255, 252, 251, 0.98)',
                      animation: 'fadeIn 0.3s ease-out'
                    }}
                  >
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{
                        background: 'linear-gradient(135deg, #3D6460 0%, #94545C 100%)',
                        animation: 'scaleUp 0.5s ease-out'
                      }}
                    >
                      <Check size={32} style={{ color: '#FFFCFB' }} />
                    </div>
                    <h3 className="text-2xl font-black mb-2" style={{ color: '#2C2C2C' }}>
                      Message Sent!
                    </h3>
                    <p className="text-base" style={{ color: '#3D6460' }}>
                      We will respond within 24 hours
                    </p>
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-2xl font-black mb-2" style={{ color: '#2C2C2C' }}>
                    Send a Message
                  </h2>
                  <p className="text-sm" style={{ color: '#3D6460', opacity: 0.7 }}>
                    Fill out the form below and our team will get back to you shortly
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Email Row */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: '#3D6460' }}>
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 focus:outline-none"
                        style={{
                          background: 'transparent',
                          border: '2px solid #BE6C7720',
                          color: '#2C2C2C'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#94545C';
                          e.target.style.background = '#3D646008';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#BE6C7720';
                          e.target.style.background = 'transparent';
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: '#3D6460' }}>
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 focus:outline-none"
                        style={{
                          background: 'transparent',
                          border: '2px solid #BE6C7720',
                          color: '#2C2C2C'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#94545C';
                          e.target.style.background = '#3D646008';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#BE6C7720';
                          e.target.style.background = 'transparent';
                        }}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: '#3D6460' }}>
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 focus:outline-none"
                      style={{
                        background: 'transparent',
                        border: '2px solid #BE6C7720',
                        color: '#2C2C2C'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#94545C';
                        e.target.style.background = '#3D646008';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#BE6C7720';
                        e.target.style.background = 'transparent';
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: '#3D6460' }}>
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Tell us what's on your mind..."
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 focus:outline-none resize-none"
                      style={{
                        background: 'transparent',
                        border: '2px solid #BE6C7720',
                        color: '#2C2C2C'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#94545C';
                        e.target.style.background = '#3D646008';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#BE6C7720';
                        e.target.style.background = 'transparent';
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="group px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #94545C 0%, #BE6C77 100%)',
                      color: '#FFFCFB',
                      boxShadow: '0 15px 35px rgba(148, 84, 92, 0.3)'
                    }}
                  >
                    Send Message
                    <Send size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>

                  <p className="text-xs" style={{ color: '#3D6460', opacity: 0.5 }}>
                    By submitting this form, you agree to our privacy policy.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0) rotate(0deg); }
          to { transform: scale(1) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ContactUsPage;