'use client';

import { useEffect, useRef, useState } from 'react';

const colors = {
  background: '#FFFCFB',
  secondary: '#3D6460',
  accent: '#94545C',
  border: '#BE6C77',
  text: '#2C2C2C'
};

const UniqueSeparator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="relative py-8 sm:py-12 md:py-16 overflow-hidden"
      style={{ background: colors.background }}
    >


      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Elegant Wavy Line Design */}
        <div className="relative">
          
          {/* Main SVG Wave */}
          <svg 
            className="w-full h-16 sm:h-20 md:h-24" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={colors.border} stopOpacity="0.2" />
                <stop offset="50%" stopColor={colors.accent} stopOpacity="0.8" />
                <stop offset="100%" stopColor={colors.border} stopOpacity="0.2" />
              </linearGradient>
            </defs>
            
            {/* Bottom wave - thicker */}
            <path
              d="M0,60 Q150,30 300,60 T600,60 T900,60 T1200,60"
              fill="none"
              stroke={colors.border}
              strokeWidth="1.5"
              opacity="0.3"
              strokeLinecap="round"
              style={{
                opacity: isVisible ? 0.3 : 0,
                transition: 'opacity 0.8s ease-out'
              }}
            />
            
            {/* Middle wave - medium */}
            <path
              d="M0,60 Q150,40 300,60 T600,60 T900,60 T1200,60"
              fill="none"
              stroke="url(#waveGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              className={isVisible ? 'animate-draw' : ''}
              style={{
                strokeDasharray: isVisible ? '3000' : '0',
                transition: 'stroke-dasharray 0.5s ease-out'
              }}
            />
            
            {/* Top wave - thin */}
            <path
              d="M0,60 Q150,50 300,60 T600,60 T900,60 T1200,60"
              fill="none"
              stroke={colors.accent}
              strokeWidth="1"
              opacity="0.4"
              strokeLinecap="round"
              style={{
                opacity: isVisible ? 0.4 : 0,
                transition: 'opacity 1s ease-out 0.3s'
              }}
            />
          </svg>

          {/* Floating Elements Along the Wave */}
          <div className="absolute inset-0 flex items-center justify-center">
            
            {/* Left accent */}
            <div 
              className="absolute left-1/4 top-1/2 -translate-y-1/2 transition-all duration-1000 hidden sm:block"
              style={{ 
                animation: isVisible ? 'float 4s ease-in-out infinite' : 'none',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translate(-50%, -50%)' : 'translate(calc(-50% - 30px), -50%)',
                transitionDelay: '0.2s'
              }}
            >
              <div 
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${colors.accent} 0%, ${colors.border} 100%)`,
                  boxShadow: `0 0 20px ${colors.accent}50`
                }}
              />
            </div>

            {/* Center piece - elegant container */}
            <div 
              className="relative z-10 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full backdrop-blur-sm transition-all duration-1000"
              style={{
                background: `${colors.background}90`,
                border: `1px solid ${colors.border}20`,
                boxShadow: `0 8px 32px ${colors.secondary}08`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.8)',
                transitionDelay: '0.4s'
              }}
            >
              <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                {/* Left decorative line */}
                <div 
                  className="h-px transition-all duration-1000"
                  style={{
                    width: isVisible ? '20px' : '0px',
                    background: `linear-gradient(90deg, transparent 0%, ${colors.accent} 100%)`,
                    transitionDelay: '0.6s'
                  }}
                />
                
                {/* Center symbol */}
                <div className="relative">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="sm:w-5 sm:h-5 md:w-6 md:h-6">
                    <circle 
                      cx="12" 
                      cy="12" 
                      r="8" 
                      stroke={colors.accent}
                      strokeWidth="1.5"
                      fill="none"
                      className={isVisible ? 'animate-scale-pulse' : ''}
                    />
                    <circle 
                      cx="12" 
                      cy="12" 
                      r="3" 
                      fill={colors.accent}
                    />
                  </svg>
                </div>
                
                {/* Right decorative line */}
                <div 
                  className="h-px transition-all duration-1000"
                  style={{
                    width: isVisible ? '20px' : '0px',
                    background: `linear-gradient(90deg, ${colors.accent} 0%, transparent 100%)`,
                    transitionDelay: '0.6s'
                  }}
                />
              </div>
            </div>

            {/* Right accent */}
            <div 
              className="absolute right-1/4 top-1/2 -translate-y-1/2 transition-all duration-1000 hidden sm:block"
              style={{ 
                animation: isVisible ? 'float 4s ease-in-out infinite 2s' : 'none',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translate(50%, -50%)' : 'translate(calc(50% + 30px), -50%)',
                transitionDelay: '0.2s'
              }}
            >
              <div 
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${colors.border} 0%, ${colors.accent} 100%)`,
                  boxShadow: `0 0 20px ${colors.border}50`
                }}
              />
            </div>
          </div>

          {/* Subtle particles scattered around - Hidden on mobile */}
          {[
            { left: '15%', top: '20%', delay: '0s', size: '2px' },
            { left: '85%', top: '30%', delay: '1s', size: '2px' },
            { left: '25%', bottom: '25%', delay: '2s', size: '2px' },
            { left: '75%', bottom: '20%', delay: '1.5s', size: '2px' },
            { left: '50%', top: '10%', delay: '0.5s', size: '2px' },
          ].map((particle, i) => (
            <div
              key={i}
              className="absolute rounded-full transition-all duration-1000 hidden md:block"
              style={{
                ...particle,
                width: particle.size,
                height: particle.size,
                background: colors.border,
                opacity: isVisible ? 0.3 : 0,
                animation: isVisible ? `twinkle 3s ease-in-out infinite ${particle.delay}` : 'none',
                transitionDelay: `${0.8 + i * 0.1}s`
              }}
            />
          ))}
        </div>

      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes wave-1 {
          0% { d: path("M0,160 C320,240 480,80 720,160 C960,240 1120,80 1440,160 L1440,320 L0,320 Z"); }
          50% { d: path("M0,160 C320,80 480,240 720,160 C960,80 1120,240 1440,160 L1440,320 L0,320 Z"); }
          100% { d: path("M0,160 C320,240 480,80 720,160 C960,240 1120,80 1440,160 L1440,320 L0,320 Z"); }
        }
        
        @keyframes wave-2 {
          0% { d: path("M0,192 C360,128 600,256 720,192 C840,128 1080,256 1440,192 L1440,320 L0,320 Z"); }
          50% { d: path("M0,192 C360,256 600,128 720,192 C840,256 1080,128 1440,192 L1440,320 L0,320 Z"); }
          100% { d: path("M0,192 C360,128 600,256 720,192 C840,128 1080,256 1440,192 L1440,320 L0,320 Z"); }
        }
        
        @keyframes wave-3 {
          0% { d: path("M0,128 C240,224 480,64 720,128 C960,192 1200,64 1440,128 L1440,320 L0,320 Z"); }
          50% { d: path("M0,128 C240,64 480,192 720,128 C960,64 1200,192 1440,128 L1440,320 L0,320 Z"); }
          100% { d: path("M0,128 C240,224 480,64 720,128 C960,192 1200,64 1440,128 L1440,320 L0,320 Z"); }
        }
        
        .animate-wave-1 {
          animation: wave-1 12s ease-in-out infinite;
        }
        
        .animate-wave-2 {
          animation: wave-2 10s ease-in-out infinite;
        }
        
        .animate-wave-3 {
          animation: wave-3 14s ease-in-out infinite;
        }
        
        @keyframes draw {
          0% { 
            stroke-dasharray: 0, 3000; 
            opacity: 0;
          }
          50% { 
            stroke-dasharray: 1500, 1500; 
            opacity: 1;
          }
          100% { 
            stroke-dasharray: 3000, 0; 
            opacity: 0;
          }
        }
        
        .animate-draw {
          stroke-dasharray: 3000;
          animation: draw 8s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(-50%) translateY(0); 
          }
          50% { 
            transform: translateY(-50%) translateY(-15px); 
          }
        }
        
        @keyframes scale-pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.6;
          }
          50% { 
            transform: scale(1.2);
            opacity: 1;
          }
        }
        
        .animate-scale-pulse {
          animation: scale-pulse 3s ease-in-out infinite;
          transform-origin: center;
        }
        
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% { 
            opacity: 0.6;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default UniqueSeparator;