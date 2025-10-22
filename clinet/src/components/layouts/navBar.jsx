'use client';

import { useState } from 'react';

const UniqueNavbar = () => {
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
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      label: 'Home'
    },
    { 
      id: 'search', 
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      label: 'Search'
    },
    { 
      id: 'collections', 
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      label: 'Shop'
    },
    { 
      id: 'cart', 
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      label: 'Cart',
      badge: cartCount
    },
    { 
      id: 'menu', 
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
      label: 'More'
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
              background: 'linear-gradient(135deg, rgba(148,84,92,0.95) 0%, rgba(94,84,92,0.9) 100%)',
              borderColor: 'rgba(0,201,187,0.5)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,227,232,0.1)'
            }}
          >
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #00c9bb, #ffe3e8)',
                  boxShadow: '0 4px 12px rgba(0,201,187,0.6)'
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
                  style={{ color: '#94545c', display: 'none' }}
                >
                  M
                </span>
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight leading-none cursor-pointer" style={{ 
                  color: '#ffe3e8',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                  MAR UNITED
                </h1>
                <p className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: '#00c9bb' }}>
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
                  className="relative text-sm font-bold tracking-wide group cursor-pointer transition-colors duration-300 hover:text-white"
                  style={{ 
                    color: '#ffe3e8',
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                  }}
                >
                  {item}
                  <span 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{ background: '#00c9bb' }}
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
                    background: 'rgba(0,201,187,0.2)',
                    border: '1px solid rgba(0,201,187,0.5)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <span className="text-lg">{languages.find(l => l.code === language)?.flag}</span>
                  <span className="text-xs font-bold" style={{ color: '#ffe3e8' }}>{language}</span>
                  <svg className="w-3 h-3" style={{ color: '#00c9bb' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {langDropdownOpen && (
                  <div 
                    className="absolute top-12 right-0 rounded-xl p-2 min-w-[140px] shadow-xl"
                    style={{
                      background: 'rgba(148,84,92,0.98)',
                      border: '1px solid rgba(0,201,187,0.5)',
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
                        className="w-full px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 hover:bg-black hover:bg-opacity-20"
                        style={{ color: '#ffe3e8' }}
                      >
                        <span>{lang.flag}</span>
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
                    background: 'rgba(0,201,187,0.2)',
                    border: '1px solid rgba(0,201,187,0.5)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <span className="text-xs font-bold" style={{ color: '#ffe3e8' }}>{currency}</span>
                  <svg className="w-3 h-3" style={{ color: '#00c9bb' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {currencyDropdownOpen && (
                  <div 
                    className="absolute top-12 right-0 rounded-xl p-2 min-w-[160px] shadow-xl"
                    style={{
                      background: 'rgba(148,84,92,0.98)',
                      border: '1px solid rgba(0,201,187,0.5)',
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
                        className="w-full px-3 py-2 rounded-lg flex items-center justify-between gap-2 transition-all duration-200 hover:bg-black hover:bg-opacity-20"
                        style={{ color: '#ffe3e8' }}
                      >
                        <span className="text-sm font-medium">{curr.code}</span>
                        <span className="text-xs opacity-70">{curr.symbol}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Icon */}
              <button 
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12"
                style={{
                  background: 'rgba(0,201,187,0.2)',
                  border: '1px solid rgba(0,201,187,0.5)',
                  backdropFilter: 'blur(10px)'
                }}
                aria-label="Search"
              >
                <svg className="w-5 h-5" style={{ color: '#00c9bb' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Cart Icon Button */}
              <button 
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 group relative"
                style={{ 
                  background: '#00c9bb',
                  boxShadow: '0 4px 12px rgba(0,201,187,0.5)'
                }}
              >
                <svg className="w-5 h-5" style={{ color: '#94545c' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black"
                    style={{ background: '#94545c', color: '#ffe3e8' }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar - Minimal */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 px-4 py-2 backdrop-blur-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(148,84,92,0.95) 0%, rgba(94,84,92,0.9) 100%)',
          borderBottom: '1px solid rgba(0,201,187,0.3)'
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #00c9bb, #ffe3e8)',
                boxShadow: '0 2px 8px rgba(0,201,187,0.4)'
              }}
            >
              <img 
                src="/images/1.png" 
                alt="Logo" 
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'block';
                }}
              />
              <span 
                className="text-sm font-black hidden" 
                style={{ color: '#94545c', display: 'none' }}
              >
                M
              </span>
            </div>
            <h1 className="text-base font-black" style={{ color: '#ffe3e8' }}>MAR UNITED</h1>
          </div>
          
          {/* Language & Currency Compact */}
          <div className="flex items-center gap-2">
            <button 
              className="px-2 py-1 rounded-md text-[10px] font-bold"
              style={{
                background: 'rgba(0,201,187,0.2)',
                color: '#ffe3e8',
                border: '1px solid rgba(0,201,187,0.3)'
              }}
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            >
              {language}
            </button>
            <button 
              className="px-2 py-1 rounded-md text-[10px] font-bold"
              style={{
                background: 'rgba(0,201,187,0.2)',
                color: '#ffe3e8',
                border: '1px solid rgba(0,201,187,0.3)'
              }}
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
            >
              {currency}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Like Phone Apps */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(148,84,92,0.98) 0%, rgba(94,84,92,0.95) 100%)',
          borderTop: '1px solid rgba(0,201,187,0.3)',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.3)'
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
                  color: activeTab === item.id ? '#00c9bb' : '#ffe3e8'
                }}
              >
                {item.icon}
                {item.badge && item.badge > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black animate-pulse"
                    style={{ 
                      background: '#00c9bb', 
                      color: '#94545c',
                      boxShadow: '0 2px 8px rgba(0,201,187,0.6)'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span 
                className="text-[10px] font-semibold mt-1 transition-all duration-300"
                style={{ 
                  color: activeTab === item.id ? '#00c9bb' : '#ffe3e8',
                  opacity: activeTab === item.id ? 1 : 0.7
                }}
              >
                {item.label}
              </span>
              
              {/* Active Indicator */}
              {activeTab === item.id && (
                <div 
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: '#00c9bb' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* More Menu Popup - Mobile */}
      {moreMenuOpen && (
        <div className="lg:hidden fixed bottom-20 left-4 right-4 z-50 animate-slideUp">
          <div 
            className="rounded-2xl p-4 backdrop-blur-xl border"
            style={{
              background: 'linear-gradient(135deg, rgba(148,84,92,0.98) 0%, rgba(94,84,92,0.95) 100%)',
              borderColor: 'rgba(0,201,187,0.5)',
              boxShadow: '0 -8px 32px rgba(0,0,0,0.4)'
            }}
          >
            <div className="grid grid-cols-2 gap-3">
              {['About', 'Benefits', 'Reviews', 'Contact', 'Settings', 'Help'].map((item) => (
                <button
                  key={item}
                  className="py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300"
                  style={{
                    background: 'rgba(0,201,187,0.15)',
                    color: '#ffe3e8',
                    border: '1px solid rgba(0,201,187,0.3)'
                  }}
                  onClick={() => setMoreMenuOpen(false)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Overlay for more menu */}
      {moreMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setMoreMenuOpen(false)}
        />
      )}

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

export default UniqueNavbar