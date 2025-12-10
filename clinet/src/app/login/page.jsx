'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff, ChevronLeft, ChevronRight, Sparkles, ArrowRight, Star } from 'lucide-react';

const EnhancedLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const colors = {
    background: '#FFFCFB',
    secondary: '#3D6460',
    accent: '#94545C',
    border: '#BE6C77',
    text: '#2C2C2C',
    glow: '#FF6B8A'
  };

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80',
      icon: '✦',
      subtitle: 'Mar United',
      title: 'Dead Sea\nMinerals',
      description: 'Transform your skin with the power of nature\'s most precious minerals',
      features: [
        { icon: '💎', text: '15K+ Happy Customers' },
        { icon: '🌿', text: '100% Natural Products' },
        { icon: '✨', text: 'Premium Quality' }
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80',
      icon: '◆',
      subtitle: 'Radiant Glow',
      title: 'Natural\nBeauty',
      description: 'Discover the secret to radiant, healthy skin',
      features: [
        { icon: '🔬', text: 'Clinically Tested' },
        { icon: '👩‍⚕️', text: 'Dermatologist Approved' },
        { icon: '🐰', text: 'Cruelty Free' }
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
      icon: '✧',
      subtitle: 'Pure Essence',
      title: 'Skin\nRevival',
      description: 'Rejuvenate and restore your natural glow',
      features: [
        { icon: '🌱', text: 'Organic Ingredients' },
        { icon: '♻️', text: 'Sustainable Sourcing' },
        { icon: '🏆', text: 'Award Winning' }
      ]
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered]);

  // Smooth mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 30,
          y: (e.clientY / window.innerHeight - 0.5) * 30
        });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div 
      className="min-h-screen p-4 flex items-center justify-center relative overflow-hidden mt-16"
      style={{ background: colors.background }}
    >
      {/* Enhanced animated gradient background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, ${colors.accent}15 0%, transparent 40%)`,
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${50 - mousePosition.x}% ${50 - mousePosition.y}%, ${colors.secondary}10 0%, transparent 40%)`,
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-3xl animate-float"
            style={{
              left: `${30 + i * 25}%`,
              top: `${20 + i * 30}%`,
              width: `${300 - i * 50}px`,
              height: `${300 - i * 50}px`,
              background: i === 0 ? colors.accent : i === 1 ? colors.secondary : colors.border,
              opacity: 0.05,
              animationDelay: `${i * 2}s`,
              animationDuration: `${15 + i * 5}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
        .shimmer-text {
          background: linear-gradient(
            120deg,
            ${colors.accent} 30%,
            ${colors.glow} 50%,
            ${colors.accent} 70%
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(148, 84, 92, 0.2);
        }
      `}</style>

      <div className="relative z-10 w-full max-w-5xl">
        {/* Decorative header */}
        <div className="text-center mb-8 animate-slide-up">
       
          <h1 className="text-5xl md:text-6xl font-black mb-2 shimmer-text">
            Welcome to Luxury
          </h1>
          <p className="text-lg opacity-60" style={{ color: colors.text }}>
            Experience the magic of Dead Sea minerals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Enhanced Left Card - Carousel */}
          <div 
            className="relative rounded-3xl overflow-hidden group hover-lift"
            style={{
              background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%)`,
              boxShadow: '0 30px 60px rgba(148, 84, 92, 0.25)',
              height: '550px'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-black/10 z-30">
              <div 
                className="h-full bg-white/70 transition-all duration-300"
                style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              />
            </div>

            {/* Carousel Slides */}
            <div className="relative w-full h-full">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="absolute inset-0 transition-all duration-1000"
                  style={{
                    opacity: currentSlide === index ? 1 : 0,
                    transform: currentSlide === index ? 'scale(1) translateX(0)' : 'scale(1.1) translateX(100px)'
                  }}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Enhanced gradient overlay */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, 
                        rgba(0,0,0,0) 0%, 
                        rgba(0,0,0,0.1) 30%, 
                        rgba(61,100,96,0.8) 70%, 
                        rgba(61,100,96,0.95) 100%)`
                    }}
                  />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                    <div 
                      className="transform transition-all duration-700"
                      style={{
                        transform: currentSlide === index ? 'translateY(0)' : 'translateY(40px)',
                        opacity: currentSlide === index ? 1 : 0
                      }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-4xl animate-pulse-slow">{slide.icon}</div>
                        <div className="text-sm font-bold uppercase tracking-[0.3em] opacity-80">
                          {slide.subtitle}
                        </div>
                      </div>
                      
                      <h2 className="text-4xl font-black leading-tight whitespace-pre-line mb-3">
                        {slide.title}
                      </h2>
                      
                      <p className="text-sm opacity-90 mb-6 max-w-sm">
                        {slide.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-3">
                        {slide.features.map((feature, i) => (
                          <div 
                            key={i}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card"
                            style={{
                              background: 'rgba(255,255,255,0.15)',
                              backdropFilter: 'blur(10px)',
                              animationDelay: `${i * 100}ms`
                            }}
                          >
                            <span className="text-lg">{feature.icon}</span>
                            <span className="text-xs font-semibold">{feature.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Navigation */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-all"
                style={{ background: 'rgba(255,255,255,0.2)' }}
              >
                <ChevronLeft size={20} className="text-white" />
              </button>
              
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-all"
                style={{ background: 'rgba(255,255,255,0.2)' }}
              >
                <ChevronRight size={20} className="text-white" />
              </button>
            </div>

            {/* Slide indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className="transition-all"
                  style={{
                    width: currentSlide === index ? '32px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: currentSlide === index ? 'white' : 'rgba(255,255,255,0.4)',
                    boxShadow: currentSlide === index ? '0 0 10px rgba(255,255,255,0.6)' : 'none'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Right Card - Form */}
          <div 
            className="rounded-3xl p-10 relative glass-card hover-lift"
            style={{
              boxShadow: '0 30px 60px rgba(0,0,0,0.08)',
              border: `1px solid ${colors.border}15`,
              height: '550px'
            }}
          >
            {/* Animated background decoration */}
            <div 
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl animate-pulse-slow"
              style={{ 
                background: colors.accent,
                opacity: 0.1
              }}
            />

            {/* Form header with icon */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${colors.accent}, ${colors.glow})`,
                      boxShadow: `0 8px 20px ${colors.accent}30`
                    }}
                  >
                    <Sparkles size={20} className="text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: colors.accent }}>
                    Member Portal
                  </span>
                </div>
                
                <h3 className="text-3xl font-black mb-2" style={{ color: colors.text }}>
                  Sign In
                </h3>
                <p className="text-sm opacity-60" style={{ color: colors.text }}>
                  Continue your skincare journey
                </p>
              </div>
            </div>

            <form className="space-y-6">
              {/* Email input */}
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Email address"
                  className="w-full px-4 py-4 rounded-2xl bg-white/50 backdrop-blur border-2 transition-all outline-none"
                  style={{
                    borderColor: focusedInput === 'email' ? colors.accent : `${colors.border}20`,
                    boxShadow: focusedInput === 'email' ? `0 0 0 4px ${colors.accent}10` : 'none',
                    color: colors.text
                  }}
                />
                {email && (
                  <div className="absolute right-4 top-4">
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Password input */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Password"
                  className="w-full px-4 py-4 pr-12 rounded-2xl bg-white/50 backdrop-blur border-2 transition-all outline-none"
                  style={{
                    borderColor: focusedInput === 'password' ? colors.accent : `${colors.border}20`,
                    boxShadow: focusedInput === 'password' ? `0 0 0 4px ${colors.accent}10` : 'none',
                    color: colors.text
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 transition-all hover:scale-110"
                  style={{ color: colors.accent }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded-md cursor-pointer"
                    style={{ accentColor: colors.accent }}
                  />
                  <span className="text-sm group-hover:opacity-100 transition-opacity" style={{ color: colors.text, opacity: 0.7 }}>
                    Remember me
                  </span>
                </label>
                <a 
                  href="#" 
                  className="text-sm font-semibold hover:opacity-80 transition-opacity flex items-center gap-1"
                  style={{ color: colors.accent }}
                >
                  Forgot password?
                </a>
              </div>

              {/* Enhanced Sign In Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-bold uppercase tracking-wider transition-all hover:scale-[1.02] relative overflow-hidden group"
                style={{
                  background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.secondary} 100%)`,
                  color: colors.background,
                  boxShadow: `0 15px 35px ${colors.accent}30`
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Sign In 
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%)`
                  }}
                />
              </button>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" style={{ borderColor: `${colors.border}20` }} />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-4 bg-white/80 backdrop-blur" style={{ color: colors.text, opacity: 0.5 }}>
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social buttons */}
            

              {/* Sign up link */}
              <div className="text-center pt-4">
                <p className="text-sm" style={{ color: colors.text, opacity: 0.6 }}>
                  Don't have an account?{' '}
                  <a 
                    href="#" 
                    className="font-bold hover:opacity-80 transition-opacity"
                    style={{ color: colors.accent }}
                  >
                    Sign up for free
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedLoginPage;