import { Mail, MapPin, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const colors = {
    background: '#FFFCFB',     // 60% - Dominant
    secondary: '#3D6460',       // 30% - Secondary
    accent: '#94545C',          // 10% - Accent (Primary CTA)
    border: '#BE6C77',          // Border
    text: '#2C2C2C'             // Text
  };

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
        background: colors.secondary
      }}
    >
      {/* Decorative top border */}
      <div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: colors.border,
          opacity: 0.4
        }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 mb-10 md:mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div 
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: colors.accent,
                  border: `2px solid ${colors.border}`,
                  boxShadow: '0 4px 12px rgba(148,84,92,0.3)'
                }}
              >
                <span className="text-xl font-black" style={{ color: colors.background }}>✦</span>
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight leading-none" style={{ 
                  color: colors.background
                }}>
                  MAR UNITED
                </h3>
                <p className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: colors.background, opacity: 0.8 }}>
                  Premium Quality
                </p>
              </div>
            </div>
            
            <p 
              className="text-sm leading-relaxed mb-5"
              style={{ color: colors.background, opacity: 0.8 }}
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
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                    style={{
                      backgroundColor: 'rgba(255, 252, 251, 0.15)',
                      border: `1px solid ${colors.border}`
                    }}
                    aria-label={social.label}
                  >
                    <Icon 
                      size={16}
                      className="transition-colors duration-300"
                      style={{ color: colors.background }}
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Shop Links */}
          <div className="lg:col-span-2">
            <h4 
              className="text-xs font-black tracking-wider uppercase mb-4"
              style={{ color: colors.background }}
            >
              Shop
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-sm transition-all duration-300 hover:translate-x-1 inline-block group"
                    style={{ color: colors.background, opacity: 0.75 }}
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
              className="text-xs font-black tracking-wider uppercase mb-4"
              style={{ color: colors.background }}
            >
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-sm transition-all duration-300 hover:translate-x-1 inline-block"
                    style={{ color: colors.background, opacity: 0.75 }}
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
              className="text-xs font-black tracking-wider uppercase mb-4"
              style={{ color: colors.background }}
            >
              Support
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-sm transition-all duration-300 hover:translate-x-1 inline-block"
                    style={{ color: colors.background, opacity: 0.75 }}
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
              className="text-xs font-black tracking-wider uppercase mb-4"
              style={{ color: colors.background }}
            >
              Contact
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <MapPin size={14} style={{ color: colors.background, marginTop: '2px', flexShrink: 0 }} />
                <span className="text-sm" style={{ color: colors.background, opacity: 0.75 }}>
                  Zarqa, Jordan
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={14} style={{ color: colors.background, marginTop: '2px', flexShrink: 0 }} />
                <span className="text-sm" style={{ color: colors.background, opacity: 0.75 }}>
                  +962 XX XXX XXXX
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={14} style={{ color: colors.background, marginTop: '2px', flexShrink: 0 }} />
                <span className="text-sm" style={{ color: colors.background, opacity: 0.75 }}>
                  info@marunited.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div 
          className="rounded-xl p-6 md:p-8 mb-10 md:mb-12"
          style={{
            backgroundColor: 'rgba(255, 252, 251, 0.1)',
            border: `1px solid ${colors.border}`
          }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h4 
              className="text-xl md:text-2xl font-black mb-2"
              style={{ 
                color: colors.background
              }}
            >
              Join Our Community
            </h4>
            <p 
              className="text-sm mb-5"
              style={{ color: colors.background, opacity: 0.8 }}
            >
              Subscribe to receive exclusive offers, skincare tips, and updates
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(255, 252, 251, 0.15)',
                  border: `1px solid ${colors.border}`,
                  color: colors.background
                }}
              />
              <button 
                className="px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 hover:scale-105 whitespace-nowrap"
                style={{
                  background: colors.accent,
                  color: colors.background,
                  border: `2px solid ${colors.border}`,
                  boxShadow: '0 4px 12px rgba(148, 84, 92, 0.3)'
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="pt-6 md:pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: colors.border }}
        >
          <p 
            className="text-xs md:text-sm text-center md:text-left"
            style={{ color: colors.background, opacity: 0.6 }}
          >
            © {currentYear} Mar United. All rights reserved.
          </p>
          
          <div className="flex gap-5 md:gap-6">
            <a 
              href="#privacy" 
              className="text-xs md:text-sm transition-colors duration-300 hover:opacity-100"
              style={{ color: colors.background, opacity: 0.6 }}
            >
              Privacy Policy
            </a>
            <a 
              href="#terms" 
              className="text-xs md:text-sm transition-colors duration-300 hover:opacity-100"
              style={{ color: colors.background, opacity: 0.6 }}
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