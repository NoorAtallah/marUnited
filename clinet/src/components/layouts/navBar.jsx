'use client';

import { useState } from 'react';
import { ShoppingCart, Search, User, Home, Grid3x3, Menu } from 'lucide-react';

const UpdatedNavbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [language, setLanguage] = useState('EN');
  const [currency, setCurrency] = useState('USD');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const languages = [
    { code: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'AR', name: 'العربية', flag: '🇸🇦' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' }
  ];

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JOD', symbol: 'JD', name: 'Jordanian Dinar' },
    { code: 'AED', symbol: 'AED', name: 'UAE Dirham' }
  ];

  const mobileNavItems = [
    { 
      id: 'home', 
      icon: <Home className="w-6 h-6" />,
      label: 'Home'
    },
    { 
      id: 'search', 
      icon: <Search className="w-6 h-6" />,
      label: 'Search'
    },
    { 
      id: 'collections', 
      icon: <Grid3x3 className="w-6 h-6" />,
      label: 'Shop'
    },
    { 
      id: 'cart', 
      icon: <ShoppingCart className="w-6 h-6" />,
      label: 'Cart',
      badge: cartCount
    },
    { 
      id: 'account', 
      icon: <User className="w-6 h-6" />,
      label: 'Account'
    }
  ];

  return (
    <>
      {/* Desktop Navbar - Top */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-1000 px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div 
            className="rounded-2xl px-6 py-4 flex items-center justify-between backdrop-blur-xl border transition-all duration-300"
            style={{
              background: '#FFFCFB', // 60% - Dominant background
              borderColor: '#BE6C77', // Border color
              boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)'
            }}
          >
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer"
                style={{
              
                }}
              >
                <img 
                  src="/images/1.png" 
                  alt="Mar United Logo" 
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'block';
                  }}
                />
                <span 
                  className="text-2xl font-black hidden" 
                  style={{ color: '#FFFCFB', display: 'none' }}
                >
                  M
                </span>
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight leading-none cursor-pointer" style={{ 
                  color: '#2C2C2C', // Text color
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}>
                  MAR UNITED
                </h1>
                <p className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: '#94545C' }}> {/* 10% - Accent */}
                  Premium Quality
                </p>
              </div>
            </div>

            {/* Center Navigation Links */}
            <div className="flex items-center gap-8">
              {['Collections', 'Benefits', 'Reviews', 'About'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-sm font-bold tracking-wide group cursor-pointer transition-colors duration-300"
                  style={{ 
                    color: '#2C2C2C', // Text color
                    textShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}
                >
                  {item}
                  <span 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{ background: '#94545C' }} // 10% - Accent for hover
                  />
                </a>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setLangDropdownOpen(!langDropdownOpen);
                    setCurrencyDropdownOpen(false);
                  }}
                  className="h-10 px-3 rounded-xl flex items-center gap-2 transition-all duration-300 hover:scale-105"
                  style={{
                    background: '#3D6460', // 30% - Secondary
                    border: '1px solid #BE6C77', // Border
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <span className="text-xs font-bold" style={{ color: '#FFFCFB' }}>{language}</span>
                  <svg className="w-3 h-3" style={{ color: '#FFFCFB' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {langDropdownOpen && (
                  <div 
                    className="absolute top-12 right-0 rounded-xl p-2 min-w-[140px] shadow-xl"
                    style={{
                      background: '#FFFCFB', // 60% - Dominant
                      border: '1px solid #BE6C77', // Border
                      backdropFilter: 'blur(20px)'
                    }}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-200"
                        style={{ 
                          color: '#2C2C2C',
                          ':hover': { background: 'rgba(61, 100, 96, 0.1)' }
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(61, 100, 96, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <span className="text-sm font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Currency Selector */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setCurrencyDropdownOpen(!currencyDropdownOpen);
                    setLangDropdownOpen(false);
                  }}
                  className="h-10 px-3 rounded-xl flex items-center gap-2 transition-all duration-300 hover:scale-105"
                  style={{
                    background: '#3D6460', // 30% - Secondary
                    border: '1px solid #BE6C77', // Border
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <span className="text-xs font-bold" style={{ color: '#FFFCFB' }}>{currency}</span>
                  <svg className="w-3 h-3" style={{ color: '#FFFCFB' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {currencyDropdownOpen && (
                  <div 
                    className="absolute top-12 right-0 rounded-xl p-2 min-w-[160px] shadow-xl"
                    style={{
                      background: '#FFFCFB', // 60% - Dominant
                      border: '1px solid #BE6C77', // Border
                      backdropFilter: 'blur(20px)'
                    }}
                  >
                    {currencies.map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => {
                          setCurrency(curr.code);
                          setCurrencyDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-lg flex items-center justify-between gap-2 transition-all duration-200"
                        style={{ color: '#2C2C2C' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(61, 100, 96, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <span className="text-xs font-medium">{curr.name}</span>
                        <span className="text-[10px] font-bold" style={{ color: '#94545C' }}>{curr.symbol}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Icon */}
              <button 
                className="h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(61, 100, 96, 0.1)', // 30% - Secondary (subtle)
                  border: '1px solid #BE6C77' // Border
                }}
              >
                <Search className="w-4 h-4" style={{ color: '#2C2C2C' }} />
              </button>

              {/* Cart Button */}
              <button 
                className="h-10 px-4 rounded-xl flex items-center gap-2 transition-all duration-300 hover:scale-105 relative"
                style={{
                  background: '#94545C', // 10% - Accent (Primary CTA)
                  border: '1px solid #BE6C77', // Border
                  boxShadow: '0 4px 16px rgba(148, 84, 92, 0.3)'
                }}
              >
                <ShoppingCart className="w-4 h-4" style={{ color: '#FFFCFB' }} />
                {/* <span className="text-xs font-bold" style={{ color: '#FFFCFB' }}>Cart</span> */}
                {cartCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black"
                    style={{ 
                      background: '#BE6C77', // Border color as badge
                      color: '#FFFCFB'
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Account Button */}
              <button 
                className="h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
                style={{
                  background: '#3D6460', // 30% - Secondary
                  border: '1px solid #BE6C77' // Border
                }}
              >
                <User className="w-4 h-4" style={{ color: '#FFFCFB' }} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-1000 px-4 py-3 backdrop-blur-xl"
        style={{
          background: '#FFFCFB', // 60% - Dominant
          borderBottom: '1px solid #BE6C77', // Border
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
           
            >
              <img 
                src="/images/1.png" 
                alt="Mar United Logo" 
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'block';
                }}
              />
              <span 
                className="text-sm font-black hidden" 
                style={{ color: '#FFFCFB', display: 'none' }}
              >
                M
              </span>
            </div>
            <h1 className="text-base font-black" style={{ color: '#2C2C2C' }}>MAR UNITED</h1>
          </div>
          
          {/* Language & Currency Compact */}
          <div className="flex items-center gap-2 relative">
            <div className="relative">
              <button 
                className="px-2 py-1 rounded-md text-[10px] font-bold"
                style={{
                  background: '#3D6460', // 30% - Secondary
                  color: '#FFFCFB',
                  border: '1px solid #BE6C77' // Border
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setLangDropdownOpen(!langDropdownOpen);
                  setCurrencyDropdownOpen(false);
                }}
              >
                {language}
              </button>
              
              {langDropdownOpen && (
                <div 
                  className="absolute top-8 right-0 rounded-xl p-2 min-w-[120px] shadow-xl z-[60]"
                  style={{
                    background: '#FFFCFB', // 60% - Dominant
                    border: '1px solid #BE6C77', // Border
                    backdropFilter: 'blur(20px)'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-200"
                      style={{ color: '#2C2C2C' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(61, 100, 96, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <span className="text-xs font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                className="px-2 py-1 rounded-md text-[10px] font-bold"
                style={{
                  background: '#3D6460', // 30% - Secondary
                  color: '#FFFCFB',
                  border: '1px solid #BE6C77' // Border
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrencyDropdownOpen(!currencyDropdownOpen);
                  setLangDropdownOpen(false);
                }}
              >
                {currency}
              </button>
              
              {currencyDropdownOpen && (
                <div 
                  className="absolute top-8 right-0 rounded-xl p-2 min-w-[140px] shadow-xl z-[60]"
                  style={{
                    background: '#FFFCFB', // 60% - Dominant
                    border: '1px solid #BE6C77', // Border
                    backdropFilter: 'blur(20px)'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {currencies.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrency(curr.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 rounded-lg flex items-center justify-between gap-2 transition-all duration-200"
                      style={{ color: '#2C2C2C' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(61, 100, 96, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <span className="text-xs font-medium">{curr.name}</span>
                      <span className="text-[10px] font-bold" style={{ color: '#94545C' }}>{curr.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-1000 backdrop-blur-xl"
        style={{
          background: '#FFFCFB', // 60% - Dominant
          borderTop: '1px solid #BE6C77', // Border
          boxShadow: '0 -4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <div className="flex items-center justify-around py-2">
          {mobileNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'menu') {
                  setMoreMenuOpen(!moreMenuOpen);
                } else {
                  setActiveTab(item.id);
                  setMoreMenuOpen(false);
                }
              }}
              className="flex flex-col items-center justify-center py-1 px-3 relative group"
            >
              <div 
                className="relative transition-all duration-300"
                style={{
                  transform: activeTab === item.id ? 'scale(1.1)' : 'scale(1)',
                  color: activeTab === item.id ? '#94545C' : '#3D6460' // Accent vs Secondary
                }}
              >
                {item.icon}
                {item.badge && item.badge > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black animate-pulse"
                    style={{ 
                      background: '#94545C', // 10% - Accent
                      color: '#FFFCFB',
                      boxShadow: '0 2px 8px rgba(148,84,92,0.4)'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span 
                className="text-[10px] font-semibold mt-1 transition-all duration-300"
                style={{ 
                  color: activeTab === item.id ? '#94545C' : '#2C2C2C', // Accent vs Text
                  opacity: activeTab === item.id ? 1 : 0.7
                }}
              >
                {item.label}
              </span>
              
              {/* Active Indicator */}
              {activeTab === item.id && (
                <div 
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: '#94545C' }} // 10% - Accent
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(langDropdownOpen || currencyDropdownOpen) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setLangDropdownOpen(false);
            setCurrencyDropdownOpen(false);
          }}
        />
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default UpdatedNavbar;