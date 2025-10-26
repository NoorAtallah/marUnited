'use client';

import { useState } from 'react';

const colors = {
  background: '#FFFCFB',
  secondary: '#3D6460',
  accent: '#94545C',
  border: '#BE6C77',
  text: '#2C2C2C'
};

const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80",
    title: "Mineral Therapy",
    subtitle: "Body Care",
    size: "large"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&q=80",
    title: "Pure Radiance",
    subtitle: "Face Care",
    size: "medium"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
    title: "Natural Essence",
    subtitle: "Ingredients",
    size: "medium"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200&q=80",
    title: "Spa Rituals",
    subtitle: "Bath Experience",
    size: "tall"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=1200&q=80",
    title: "Hair Revival",
    subtitle: "Hair Care",
    size: "medium"
  }
];

const GallerySection = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div 
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
      style={{ 
        background: `linear-gradient(180deg, ${colors.background} 0%, ${colors.secondary}08 100%)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div 
            className="inline-block px-4 sm:px-6 py-2 rounded-full mb-4"
            style={{
              background: `${colors.accent}10`,
              border: `1px solid ${colors.accent}30`
            }}
          >
            <span 
              className="text-xs sm:text-sm font-bold uppercase tracking-wider"
              style={{ color: colors.accent }}
            >
              Our Collection
            </span>
          </div>
          
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4"
            style={{ color: colors.text }}
          >
            Experience
            <span style={{ color: colors.accent }}> Natural Beauty</span>
          </h2>
          <p 
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: colors.text, opacity: 0.6 }}
          >
            Discover the transformative power of Dead Sea minerals
          </p>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Large Featured Item - Spans 2 columns and 2 rows on large screens */}
          <div
            onMouseEnter={() => setHoveredId(galleryImages[0].id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative overflow-hidden cursor-pointer group sm:col-span-2 lg:row-span-2"
            style={{
              borderRadius: '32px',
              height: '400px',
              background: colors.secondary,
              border: `2px solid ${hoveredId === galleryImages[0].id ? colors.accent : colors.border}20`,
              boxShadow: hoveredId === galleryImages[0].id 
                ? `0 20px 60px ${colors.accent}30` 
                : `0 8px 24px ${colors.secondary}15`,
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <img 
              src={galleryImages[0].url}
              alt={galleryImages[0].title}
              className="w-full h-full object-cover transition-transform duration-700"
              style={{
                transform: hoveredId === galleryImages[0].id ? 'scale(1.05)' : 'scale(1)'
              }}
            />
            
            {/* Gradient Overlay */}
            <div 
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: `linear-gradient(180deg, transparent 0%, ${colors.secondary}95 100%)`,
                opacity: hoveredId === galleryImages[0].id ? 1 : 0.7
              }}
            />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div 
                className="inline-block px-4 py-1.5 rounded-full mb-3"
                style={{
                  background: `${colors.background}20`,
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${colors.background}30`
                }}
              >
                <span 
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: colors.background }}
                >
                  {galleryImages[0].subtitle}
                </span>
              </div>
              <h3 
                className="text-3xl sm:text-4xl md:text-5xl font-black transition-all duration-500"
                style={{ 
                  color: colors.background,
                  transform: hoveredId === galleryImages[0].id ? 'translateX(8px)' : 'translateX(0)'
                }}
              >
                {galleryImages[0].title}
              </h3>
            </div>

            {/* Decorative Circle */}
            <div 
              className="absolute top-6 right-6 w-16 h-16 rounded-full transition-all duration-500"
              style={{
                background: `${colors.accent}20`,
                backdropFilter: 'blur(10px)',
                border: `2px solid ${colors.background}30`,
                opacity: hoveredId === galleryImages[0].id ? 1 : 0,
                transform: hoveredId === galleryImages[0].id ? 'scale(1)' : 'scale(0.8)'
              }}
            />
          </div>

          {/* Medium Items */}
          {galleryImages.slice(1, 3).map((image) => (
            <div
              key={image.id}
              onMouseEnter={() => setHoveredId(image.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative overflow-hidden cursor-pointer group"
              style={{
                borderRadius: '24px',
                height: '250px',
                background: colors.secondary,
                border: `2px solid ${hoveredId === image.id ? colors.accent : colors.border}20`,
                boxShadow: hoveredId === image.id 
                  ? `0 20px 60px ${colors.accent}30` 
                  : `0 8px 24px ${colors.secondary}15`,
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <img 
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-700"
                style={{
                  transform: hoveredId === image.id ? 'scale(1.1)' : 'scale(1)'
                }}
              />
              
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, transparent 30%, ${colors.secondary}90 100%)`
                }}
              />

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div 
                  className="inline-block px-3 py-1 rounded-full mb-2"
                  style={{
                    background: `${colors.background}20`,
                    backdropFilter: 'blur(8px)',
                    border: `1px solid ${colors.background}20`
                  }}
                >
                  <span 
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: colors.background }}
                  >
                    {image.subtitle}
                  </span>
                </div>
                <h3 
                  className="text-xl sm:text-2xl font-black"
                  style={{ color: colors.background }}
                >
                  {image.title}
                </h3>
              </div>

              {/* Hover Icon */}
              <div 
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500"
                style={{
                  background: `${colors.background}90`,
                  border: `1px solid ${colors.accent}30`,
                  opacity: hoveredId === image.id ? 1 : 0,
                  transform: hoveredId === image.id ? 'rotate(0deg)' : 'rotate(-90deg)'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          ))}

          {/* Tall Item - Spans 2 rows */}
          <div
            onMouseEnter={() => setHoveredId(galleryImages[3].id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative overflow-hidden cursor-pointer group sm:col-span-2 lg:col-span-1 lg:row-span-2"
            style={{
              borderRadius: '32px',
              height: '400px',
              background: colors.secondary,
              border: `2px solid ${hoveredId === galleryImages[3].id ? colors.accent : colors.border}20`,
              boxShadow: hoveredId === galleryImages[3].id 
                ? `0 20px 60px ${colors.accent}30` 
                : `0 8px 24px ${colors.secondary}15`,
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <img 
              src={galleryImages[3].url}
              alt={galleryImages[3].title}
              className="w-full h-full object-cover transition-transform duration-700"
              style={{
                transform: hoveredId === galleryImages[3].id ? 'scale(1.05)' : 'scale(1)'
              }}
            />
            
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, transparent 40%, ${colors.secondary}95 100%)`
              }}
            />

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div 
                className="inline-block px-4 py-1.5 rounded-full mb-3"
                style={{
                  background: `${colors.background}20`,
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${colors.background}30`
                }}
              >
                <span 
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: colors.background }}
                >
                  {galleryImages[3].subtitle}
                </span>
              </div>
              <h3 
                className="text-3xl sm:text-4xl font-black"
                style={{ color: colors.background }}
              >
                {galleryImages[3].title}
              </h3>
            </div>
          </div>

          {/* Last Medium Item */}
          <div
            onMouseEnter={() => setHoveredId(galleryImages[4].id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative overflow-hidden cursor-pointer group sm:col-span-2 lg:col-span-1"
            style={{
              borderRadius: '24px',
              height: '250px',
              background: colors.secondary,
              border: `2px solid ${hoveredId === galleryImages[4].id ? colors.accent : colors.border}20`,
              boxShadow: hoveredId === galleryImages[4].id 
                ? `0 20px 60px ${colors.accent}30` 
                : `0 8px 24px ${colors.secondary}15`,
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <img 
              src={galleryImages[4].url}
              alt={galleryImages[4].title}
              className="w-full h-full object-cover transition-transform duration-700"
              style={{
                transform: hoveredId === galleryImages[4].id ? 'scale(1.1)' : 'scale(1)'
              }}
            />
            
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, transparent 30%, ${colors.secondary}90 100%)`
              }}
            />

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div 
                className="inline-block px-3 py-1 rounded-full mb-2"
                style={{
                  background: `${colors.background}20`,
                  backdropFilter: 'blur(8px)',
                  border: `1px solid ${colors.background}20`
                }}
              >
                <span 
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: colors.background }}
                >
                  {galleryImages[4].subtitle}
                </span>
              </div>
              <h3 
                className="text-xl sm:text-2xl font-black"
                style={{ color: colors.background }}
              >
                {galleryImages[4].title}
              </h3>
            </div>

            <div 
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500"
              style={{
                background: `${colors.background}90`,
                border: `1px solid ${colors.accent}30`,
                opacity: hoveredId === galleryImages[4].id ? 1 : 0,
                transform: hoveredId === galleryImages[4].id ? 'rotate(0deg)' : 'rotate(-90deg)'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        {/* <div className="text-center mt-12 sm:mt-16">
          <button
            className="inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-sm sm:text-base uppercase tracking-wide transition-all hover:scale-105 active:scale-95 group"
            style={{
              background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.border} 100%)`,
              color: colors.background,
              boxShadow: `0 15px 40px ${colors.accent}30`
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Explore All Products
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
        </div> */}
      </div>
    </div>
  );
};

export default GallerySection;