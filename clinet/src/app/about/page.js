'use client';

import { useState, useEffect } from 'react';
import { Waves, Droplet, Sparkles, Shield, Leaf, Award, ChevronDown, CircleDot } from 'lucide-react';

const AboutUsPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#FFFCFB' }}>
      
      {/* Hero Section with Animated Waves */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Wave Background */}
        {/* <div className="absolute inset-0" style={{ opacity: 0.1 }}>
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" style={{ animation: 'wave 8s ease-in-out infinite' }}>
            <path fill="#3D6460" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" style={{ animation: 'wave 10s ease-in-out infinite reverse', animationDelay: '-2s' }}>
            <path fill="#94545C" fillOpacity="0.5" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,154.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div> */}

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 8 + 4 + 'px',
                height: Math.random() * 8 + 4 + 'px',
                background: i % 2 === 0 ? '#3D6460' : '#94545C',
                opacity: Math.random() * 0.3 + 0.1,
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite`,
                animationDelay: `-${Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <div 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-8"
            style={{ 
              background: '#FFFCFB',
              border: '2px solid #BE6C7750',
              boxShadow: '0 10px 40px rgba(148, 84, 92, 0.15)'
            }}
          >
            <CircleDot size={16} style={{ color: '#94545C' }} />
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#3D6460' }}>
              Ancient Minerals, Modern Science
            </span>
          </div>

          <h1 
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6"
            style={{ color: '#2C2C2C', letterSpacing: '-0.02em' }}
          >
            Unlock the Power of
            <br />
            the <span style={{ color: '#94545C' }}>Dead Sea</span>
          </h1>

          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed" style={{ color: '#3D6460' }}>
            Where 21 essential minerals meet innovative skincare to reveal your skin&apos;s natural radiance
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              className="px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #94545C 0%, #BE6C77 100%)',
                color: '#FFFCFB',
                boxShadow: '0 15px 35px rgba(148, 84, 92, 0.3)'
              }}
            >
              Discover Our Story
            </button>
            <button
              className="px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105 active:scale-95"
              style={{
                background: '#FFFCFB',
                color: '#3D6460',
                border: '2px solid #BE6C7750'
              }}
            >
              Shop Now
            </button>
          </div>

          <div className="animate-bounce">
            <ChevronDown size={32} style={{ color: '#3D6460', opacity: 0.5 }} className="mx-auto" />
          </div>
        </div>

        <style jsx>{`
          @keyframes wave {
            0%, 100% { transform: translateX(0) translateY(0); }
            50% { transform: translateX(-25px) translateY(-10px); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-30px) translateX(15px); }
          }
        `}</style>
      </div>

      {/* Liquid Divider */}
      {/* <div className="relative h-24" style={{ background: 'linear-gradient(180deg, #FFFCFB 0%, #3D646008 100%)' }}>
        <svg className="absolute top-0 w-full" viewBox="0 0 1440 100" style={{ transform: 'rotate(180deg)' }}>
          <path fill="#FFFCFB" d="M0,50L80,45C160,40,320,30,480,35C640,40,800,60,960,65C1120,70,1280,60,1360,55L1440,50L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
        </svg>
      </div> */}

      {/* Story Section with Ripple Effect */}
      <div className="px-6 py-24" style={{ background: 'linear-gradient(180deg, #3D646008 0%, #FFFCFB 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              {/* Ripple Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border-2"
                    style={{
                      width: '300px',
                      height: '300px',
                      borderColor: '#94545C',
                      opacity: 0,
                      animation: `ripple 3s ease-out infinite`,
                      animationDelay: `${i * 1}s`
                    }}
                  />
                ))}
              </div>

              <div 
                className="relative rounded-3xl overflow-hidden"
                style={{ 
                  aspectRatio: '1/1',
                  boxShadow: '0 30px 60px rgba(61, 100, 96, 0.2)',
                  border: '3px solid #BE6C7730'
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80"
                  alt="Dead Sea"
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, rgba(61, 100, 96, 0.2) 0%, rgba(148, 84, 92, 0.2) 100%)' }}
                />
              </div>

              <div 
                className="absolute -bottom-6 -right-6 px-8 py-6 rounded-2xl backdrop-blur-sm"
                style={{ 
                  background: 'rgba(255, 252, 251, 0.95)',
                  border: '2px solid #94545C',
                  boxShadow: '0 20px 40px rgba(148, 84, 92, 0.25)'
                }}
              >
                <Waves size={32} style={{ color: '#94545C', marginBottom: '8px' }} />
                <div className="text-4xl font-black" style={{ color: '#94545C' }}>430m</div>
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: '#3D6460' }}>
                  Below Sea Level
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <Sparkles size={20} style={{ color: '#94545C' }} />
                <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#3D6460' }}>
                  Our Origin
                </span>
              </div>

          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6" style={{ color: '#2C2C2C' }}>
                Born from Earth&apos;s
                <br />
                <span style={{ color: '#94545C' }}>Most Mineral-Rich</span>
                <br />
                Waters
              </h2>

              <div className="space-y-4 text-base leading-relaxed mb-8" style={{ color: '#2C2C2C', opacity: 0.7 }}>
                <p>
                At 430 meters below sea level, the Dead Sea holds the planet&apos;s highest concentration of therapeutic minerals. For millennia, these waters have been revered for their transformative healing properties.
                </p>
                <p>
                  We harness this ancient power through sustainable extraction and cutting-edge formulation, creating skincare that bridges timeless natural wisdom with modern science.
                </p>
                <p>
                 Every product is a testament to purity—free from harsh chemicals, rich in minerals, and designed to work harmoniously with your skin&apos;s natural processes.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Shield, label: 'Clinically Tested' },
                  { icon: Leaf, label: '100% Natural' },
                  { icon: Award, label: 'Dermatologist Approved' }
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{ background: '#3D646010', border: '1px solid #BE6C7730' }}
                  >
                    <item.icon size={16} style={{ color: '#94545C' }} />
                    <span className="text-sm font-bold" style={{ color: '#3D6460' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes ripple {
            0% { transform: scale(0.5); opacity: 0; }
            50% { opacity: 0.3; }
            100% { transform: scale(1.5); opacity: 0; }
          }
        `}</style>
      </div>

      {/* Mineral Grid with Hover Animations */}
      <div className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Droplet size={20} style={{ color: '#94545C' }} />
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#3D6460' }}>
                Pure Ingredients
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#2C2C2C' }}>
              21 Essential <span style={{ color: '#94545C' }}>Minerals</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#3D6460', opacity: 0.7 }}>
              Each drop contains nature&apos;s most powerful skin-transforming elements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                name: 'Magnesium',
                percent: '35%',
                benefit: 'Cellular regeneration & anti-aging protection',
                color: '#3D6460'
              },
              { 
                name: 'Calcium',
                percent: '14%',
                benefit: 'Deep hydration & accelerated healing',
                color: '#94545C'
              },
              { 
                name: 'Potassium',
                percent: '28%',
                benefit: 'Moisture balance & pH regulation',
                color: '#BE6C77'
              }
            ].map((mineral, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative p-8 rounded-3xl transition-all duration-500 cursor-pointer overflow-hidden"
                style={{
                  background: hoveredIndex === index ? '#FFFCFB' : '#3D646005',
                  border: `3px solid ${hoveredIndex === index ? mineral.color : '#BE6C7720'}`,
                  transform: hoveredIndex === index ? 'translateY(-12px) rotate(-1deg)' : 'translateY(0)',
                  boxShadow: hoveredIndex === index ? `0 30px 60px ${mineral.color}40` : '0 10px 20px rgba(61, 100, 96, 0.08)'
                }}
              >
                {/* Animated Background Gradient */}
                <div 
                  className="absolute inset-0 opacity-0 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${mineral.color}10 0%, transparent 100%)`,
                    opacity: hoveredIndex === index ? 1 : 0
                  }}
                />

                <div className="relative z-10">
                  <div 
                    className="text-6xl font-black mb-4 transition-all duration-500"
                    style={{ 
                      color: mineral.color,
                      transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)'
                    }}
                  >
                    {mineral.percent}
                  </div>
                  <h3 className="text-2xl font-black mb-3" style={{ color: '#2C2C2C' }}>
                    {mineral.name}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#2C2C2C', opacity: 0.7 }}>
                    {mineral.benefit}
                  </p>

                  {/* Animated Indicator */}
                  <div 
                    className="mt-6 h-2 rounded-full transition-all duration-500"
                    style={{
                      background: mineral.color,
                      width: hoveredIndex === index ? '100%' : '60%'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Flow with Animated Lines */}
      <div className="px-6 py-24" style={{ background: 'linear-gradient(180deg, #FFFCFB 0%, #3D646008 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#2C2C2C' }}>
              From Sea to <span style={{ color: '#94545C' }}>Skin</span>
            </h2>
            <p className="text-lg" style={{ color: '#3D6460', opacity: 0.7 }}>
              Our meticulous four-step process ensures maximum potency
            </p>
          </div>

          <div className="relative">
            {/* Animated Connection Line */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 overflow-hidden">
              <div 
                className="h-full"
                style={{
                  background: `linear-gradient(90deg, #3D6460 0%, #94545C 50%, #BE6C77 100%)`,
                  animation: 'slideRight 3s ease-in-out infinite'
                }}
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Waves, title: 'Harvest', desc: 'Ethically extracted from pristine waters' },
                { icon: Droplet, title: 'Purify', desc: 'Advanced filtration preserves potency' },
                { icon: Sparkles, title: 'Formulate', desc: 'Blended with organic botanicals' },
                { icon: Award, title: 'Deliver', desc: 'Fresh products to your doorstep' }
              ].map((step, i) => (
                <div key={i} className="relative text-center">
                  <div 
                    className="relative inline-flex items-center justify-center w-32 h-32 rounded-full mb-6 transition-all duration-300 hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, #3D6460 0%, #94545C 100%)`,
                      boxShadow: '0 15px 40px rgba(148, 84, 92, 0.3)'
                    }}
                  >
                    <step.icon size={40} style={{ color: '#FFFCFB' }} />
                    
                    {/* Pulse Effect */}
                    <div 
                      className="absolute inset-0 rounded-full"
                      style={{
                        border: '3px solid #94545C',
                        animation: 'pulse 2s ease-out infinite',
                        animationDelay: `${i * 0.5}s`
                      }}
                    />
                  </div>

                  <h3 className="text-xl font-black mb-2" style={{ color: '#2C2C2C' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm" style={{ color: '#3D6460', opacity: 0.7 }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes slideRight {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.3); opacity: 0; }
            100% { transform: scale(1.3); opacity: 0; }
          }
        `}</style>
      </div>

      {/* CTA with Gradient Animation */}


    </div>
  );
};

export default AboutUsPage;