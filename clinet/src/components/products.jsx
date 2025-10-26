'use client';

import { useState } from 'react';

const colors = {
  background: '#FFFCFB',
  secondary: '#3D6460',
  accent: '#94545C',
  border: '#BE6C77',
  text: '#2C2C2C'
};

const categories = [
  {
    id: 1,
    name: 'Body',
    description: 'Nourish and hydrate from head to toe',
    tagline: 'Silky Smooth',
    productCount: 18,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80'
  },
  {
    id: 2,
    name: 'Face',
    description: 'Revitalize your complexion with mineral-rich treatments',
    tagline: 'Radiant Glow',
    productCount: 24,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80'
  },
  {
    id: 3,
    name: 'Hair',
    description: 'Mineral-enriched treatments for healthy hair',
    tagline: 'Lustrous Locks',
    productCount: 16,
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&q=80'
  }
];

const CategoriesSection = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div 
      className="py-20 px-6"
      style={{ 
        background: `linear-gradient(180deg, ${colors.background} 0%, ${colors.secondary}08 100%)`,
        fontFamily: "'Inter', system-ui, sans-serif"
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-block px-6 py-2 rounded-full mb-4"
            style={{
              background: `${colors.accent}15`,
              border: `1px solid ${colors.accent}30`
            }}
          >
            <span 
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: colors.accent }}
            >
              Shop by Category
            </span>
          </div>
          
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-4"
            style={{ color: colors.text }}
          >
            Discover Your
            <span style={{ color: colors.accent }}> Perfect</span> Products
          </h2>
          
          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: colors.text, opacity: 0.6 }}
          >
            From ancient minerals to modern beauty, explore our curated collections
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative overflow-hidden transition-all duration-700 text-left h-[480px]"
              style={{
                background: colors.background,
                border: `2px solid ${hoveredId === category.id ? colors.accent : colors.border}15`,
                borderRadius: '40px',
                boxShadow: hoveredId === category.id 
                  ? `0 30px 70px ${colors.accent}30` 
                  : `0 10px 30px ${colors.secondary}12`,
                transform: hoveredId === category.id ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)'
              }}
            >
              {/* Diagonal Split Design */}
              <div className="relative w-full h-full">
                
                {/* Top Section - Image with Diagonal Cut */}
                <div 
                  className="absolute top-0 left-0 right-0 overflow-hidden"
                  style={{
                    height: '60%',
                    clipPath: index % 2 === 0 
                      ? 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'
                      : 'polygon(0 0, 100% 0, 100% 100%, 0 85%)'
                  }}
                >
                  <div 
                    className="w-full h-full transition-transform duration-1000"
                    style={{
                      transform: hoveredId === category.id ? 'scale(1.15)' : 'scale(1)'
                    }}
                  >
                    <img 
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${colors.secondary}40 0%, ${colors.accent}50 100%)`
                    }}
                  />

                  {/* Floating Number Badge */}
                  <div 
                    className="absolute top-6 right-6 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500"
                    style={{
                      background: `${colors.background}98`,
                      backdropFilter: 'blur(10px)',
                      boxShadow: `0 10px 30px ${colors.secondary}30`,
                      transform: hoveredId === category.id ? 'rotate(12deg) scale(1.1)' : 'rotate(0) scale(1)'
                    }}
                  >
                    <span 
                      className="text-3xl font-black"
                      style={{ 
                        background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.border} 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Tagline */}
                  <div 
                    className="absolute bottom-6 left-6 px-5 py-2 rounded-full"
                    style={{
                      background: colors.background,
                      boxShadow: `0 8px 24px ${colors.secondary}25`
                    }}
                  >
                    <span 
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: colors.accent }}
                    >
                      {category.tagline}
                    </span>
                  </div>
                </div>

                {/* Bottom Section - Content */}
                <div 
                  className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end"
                  style={{ height: '50%' }}
                >
                  {/* Category Name with Large Typography */}
                  <div className="mb-4">
                    <h3 
                      className="text-5xl font-black mb-2 transition-all duration-500"
                      style={{ 
                        color: colors.text,
                        transform: hoveredId === category.id ? 'translateX(8px)' : 'translateX(0)'
                      }}
                    >
                      {category.name}
                    </h3>
                    
                    {/* Accent Line */}
                    <div 
                      className="h-1 rounded-full transition-all duration-500"
                      style={{
                        width: hoveredId === category.id ? '100%' : '60px',
                        background: `linear-gradient(90deg, ${colors.accent} 0%, ${colors.border} 100%)`
                      }}
                    />
                  </div>

                  <p 
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: colors.text, opacity: 0.65 }}
                  >
                    {category.description}
                  </p>

                  {/* Bottom Row - Count and Arrow */}
                  <div className="flex items-center justify-between">
                    {/* Product Count */}
                    <div className="flex items-center gap-2">
                      <div 
                        className="flex items-center gap-1"
                        style={{ color: colors.secondary }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.3"/>
                          <rect x="14" y="3" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.6"/>
                          <rect x="3" y="14" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.6"/>
                          <rect x="14" y="14" width="7" height="7" rx="1.5" fill="currentColor"/>
                        </svg>
                        <span className="text-xs font-bold">
                          {category.productCount}
                        </span>
                      </div>
                    </div>

                    {/* Explore Arrow */}
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500"
                      style={{
                        background: hoveredId === category.id 
                          ? `linear-gradient(135deg, ${colors.accent} 0%, ${colors.border} 100%)`
                          : `${colors.secondary}12`,
                        color: hoveredId === category.id ? colors.background : colors.secondary,
                        transform: hoveredId === category.id ? 'scale(1.1) rotate(45deg)' : 'scale(1) rotate(0)'
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Decorative Circle Element */}
                <div 
                  className="absolute transition-all duration-700 rounded-full pointer-events-none"
                  style={{
                    width: '180px',
                    height: '180px',
                    background: `radial-gradient(circle, ${colors.accent}25 0%, transparent 70%)`,
                    filter: 'blur(40px)',
                    bottom: hoveredId === category.id ? '-40px' : '-80px',
                    right: hoveredId === category.id ? '-40px' : '-80px',
                    opacity: hoveredId === category.id ? 1 : 0
                  }}
                />
              </div>
            </button>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <button
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-base uppercase tracking-wide transition-all hover:scale-105 active:scale-95 group"
            style={{
              background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.border} 100%)`,
              color: colors.background,
              boxShadow: `0 15px 40px ${colors.accent}30`
            }}
          >
            Explore All Categories
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;