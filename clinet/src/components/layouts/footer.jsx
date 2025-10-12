import { Mail, MapPin, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'Face Care', href: '#face-care' },
      { name: 'Body Care', href: '#body-care' },
      { name: 'Bath & Spa', href: '#bath-spa' },
      { name: 'Gift Sets', href: '#gift-sets' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Story', href: '#story' },
      { name: 'Sustainability', href: '#sustainability' },
      { name: 'Press', href: '#press' }
    ],
    support: [
      { name: 'Contact Us', href: '#contact' },
      { name: 'FAQs', href: '#faq' },
      { name: 'Shipping', href: '#shipping' },
      { name: 'Returns', href: '#returns' }
    ]
  };

  return (
    <footer 
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1a1a2e 0%, #2d2d4a 100%)'
      }}
    >
      {/* Decorative top border */}
      <div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: 'linear-gradient(90deg, #cbc2d7, #F6F4F7, #cbc2d7)',
          opacity: 0.3
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #cbc2d7, #F6F4F7)',
                  boxShadow: '0 4px 12px rgba(203,194,215,0.3)'
                }}
              >
                <span className="text-2xl font-black" style={{ color: '#1a1a2e' }}>✦</span>
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight leading-none" style={{ 
                  background: 'linear-gradient(135deg, #F6F4F7 0%, #cbc2d7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  DEAD SEA
                </h3>
                <p className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: '#cbc2d7', opacity: 0.7 }}>
                  Pure Minerals
                </p>
              </div>
            </div>
            
            <p 
              className="text-sm leading-relaxed mb-6"
              style={{ color: '#F6F4F7', opacity: 0.7 }}
            >
              Experience the ancient healing powers of the Dead Sea. Premium skincare crafted from nature's most powerful minerals.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' }
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                    style={{
                      background: 'rgba(203,194,215,0.1)',
                      border: '1px solid rgba(203,194,215,0.2)'
                    }}
                    aria-label={social.label}
                  >
                    <Icon 
                      size={18}
                      className="transition-colors duration-300"
                      style={{ color: '#cbc2d7' }}
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Shop Links */}
          <div className="lg:col-span-2">
            <h4 
              className="text-sm font-black tracking-wider uppercase mb-4"
              style={{ color: '#cbc2d7' }}
            >
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-sm transition-all duration-300 hover:translate-x-1 inline-block group"
                    style={{ color: '#F6F4F7', opacity: 0.7 }}
                  >
                    <span className="group-hover:opacity-100 transition-opacity duration-300">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h4 
              className="text-sm font-black tracking-wider uppercase mb-4"
              style={{ color: '#cbc2d7' }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-sm transition-all duration-300 hover:translate-x-1 inline-block"
                    style={{ color: '#F6F4F7', opacity: 0.7 }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-2">
            <h4 
              className="text-sm font-black tracking-wider uppercase mb-4"
              style={{ color: '#cbc2d7' }}
            >
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-sm transition-all duration-300 hover:translate-x-1 inline-block"
                    style={{ color: '#F6F4F7', opacity: 0.7 }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h4 
              className="text-sm font-black tracking-wider uppercase mb-4"
              style={{ color: '#cbc2d7' }}
            >
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={16} style={{ color: '#cbc2d7', marginTop: '2px' }} />
                <span className="text-sm" style={{ color: '#F6F4F7', opacity: 0.7 }}>
                  Zarqa, Jordan
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} style={{ color: '#cbc2d7', marginTop: '2px' }} />
                <span className="text-sm" style={{ color: '#F6F4F7', opacity: 0.7 }}>
                  +962 XX XXX XXXX
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} style={{ color: '#cbc2d7', marginTop: '2px' }} />
                <span className="text-sm" style={{ color: '#F6F4F7', opacity: 0.7 }}>
                  info@deadsea.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div 
          className="rounded-2xl p-8 mb-12"
          style={{
            background: 'rgba(203,194,215,0.1)',
            border: '1px solid rgba(203,194,215,0.2)'
          }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h4 
              className="text-2xl md:text-3xl font-black mb-3"
              style={{ 
                background: 'linear-gradient(135deg, #F6F4F7 0%, #cbc2d7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Join Our Community
            </h4>
            <p 
              className="text-sm mb-6"
              style={{ color: '#F6F4F7', opacity: 0.7 }}
            >
              Subscribe to receive exclusive offers, skincare tips, and updates
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-300"
                style={{
                  background: 'rgba(246,244,247,0.1)',
                  border: '1px solid rgba(203,194,215,0.3)',
                  color: '#F6F4F7',
                  focusRingColor: '#cbc2d7'
                }}
              />
              <button 
                className="px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, #cbc2d7, #F6F4F7)',
                  color: '#1a1a2e',
                  boxShadow: '0 4px 12px rgba(203,194,215,0.3)'
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(203,194,215,0.2)' }}
        >
          <p 
            className="text-sm text-center md:text-left"
            style={{ color: '#F6F4F7', opacity: 0.6 }}
          >
            © {currentYear} Dead Sea Pure Minerals. All rights reserved.
          </p>
          
          <div className="flex gap-6">
            <a 
              href="#privacy" 
              className="text-sm transition-colors duration-300 hover:opacity-100"
              style={{ color: '#F6F4F7', opacity: 0.6 }}
            >
              Privacy Policy
            </a>
            <a 
              href="#terms" 
              className="text-sm transition-colors duration-300 hover:opacity-100"
              style={{ color: '#F6F4F7', opacity: 0.6 }}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;