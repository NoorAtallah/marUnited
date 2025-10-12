'use client';

import { useState } from 'react';

const UniqueNavbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div 
            className="rounded-2xl px-4 md:px-6 py-3 md:py-4 flex items-center justify-between backdrop-blur-xl border transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(26,26,46,0.7) 0%, rgba(203,194,215,0.2) 100%)',
              borderColor: 'rgba(203,194,215,0.3)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #cbc2d7, #F6F4F7)',
                  boxShadow: '0 4px 12px rgba(203,194,215,0.4)'
                }}
              >
                <span className="text-xl md:text-2xl font-black" style={{ color: '#1a1a2e' }}>✦</span>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(45deg, rgba(255,255,255,0.3), transparent)' }}
                />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-black tracking-tight leading-none cursor-pointer" style={{ 
                  background: 'linear-gradient(135deg, #F6F4F7 0%, #cbc2d7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  DEAD SEA
                </h1>
                <p className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: '#cbc2d7', opacity: 0.7 }}>
                  Pure Minerals
                </p>
              </div>
            </div>

            {/* Center Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center gap-8">
              {['Collections', 'Benefits', 'Reviews', 'About'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-sm font-bold tracking-wide group cursor-pointer"
                  style={{ color: '#F6F4F7' }}
                >
                  {item}
                  <span 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{ background: 'linear-gradient(90deg, #cbc2d7, #F6F4F7)' }}
                  />
                </a>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Search Icon */}
              <button 
                className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12"
                style={{
                  background: 'rgba(203,194,215,0.15)',
                  border: '1px solid rgba(203,194,215,0.3)'
                }}
                aria-label="Search"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" style={{ color: '#F6F4F7' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Cart Button */}
              <button 
                className="px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all duration-300 hover:scale-105 group relative overflow-hidden"
                style={{ 
                  background: 'linear-gradient(135deg, #cbc2d7, #F6F4F7)',
                  color: '#1a1a2e',
                  boxShadow: '0 4px 12px rgba(203,194,215,0.4)'
                }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.3), transparent)' }}
                />
                <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="relative z-10 hidden sm:inline">Cart</span>
                <span 
                  className="relative z-10 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black"
                  style={{ background: '#1a1a2e', color: '#F6F4F7' }}
                >
                  {cartCount}
                </span>
              </button>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-9 h-9 md:w-10 md:h-10 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 hover:scale-110"
                style={{
                  background: 'rgba(203,194,215,0.15)',
                  border: '1px solid rgba(203,194,215,0.3)'
                }}
                aria-label="Menu"
              >
                <span 
                  className="w-4 h-0.5 rounded-full transition-all duration-300" 
                  style={{ 
                    background: '#F6F4F7',
                    transform: mobileMenuOpen ? 'rotate(45deg) translateY(4px)' : 'rotate(0)'
                  }} 
                />
                <span 
                  className="w-4 h-0.5 rounded-full transition-all duration-300" 
                  style={{ 
                    background: '#F6F4F7',
                    opacity: mobileMenuOpen ? 0 : 1
                  }} 
                />
                <span 
                  className="w-4 h-0.5 rounded-full transition-all duration-300" 
                  style={{ 
                    background: '#F6F4F7',
                    transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-4px)' : 'rotate(0)'
                  }} 
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`lg:hidden fixed top-24 left-4 right-4 z-40 transition-all duration-500 ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div 
          className="rounded-2xl p-6 backdrop-blur-xl border"
          style={{
            background: 'linear-gradient(135deg, rgba(26,26,46,0.95) 0%, rgba(203,194,215,0.3) 100%)',
            borderColor: 'rgba(203,194,215,0.3)',
            boxShadow: '0 12px 48px rgba(0,0,0,0.4)'
          }}
        >
          <div className="flex flex-col gap-4">
            {['Collections', 'Benefits', 'Reviews', 'About'].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-base font-bold tracking-wide py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105"
                style={{ 
                  color: '#F6F4F7',
                  background: 'rgba(203,194,215,0.1)',
                  border: '1px solid rgba(203,194,215,0.2)',
                  animationDelay: `${index * 50}ms`
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay when mobile menu is open */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default UniqueNavbar