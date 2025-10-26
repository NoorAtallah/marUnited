'use client';

import { useEffect, useRef, useCallback, useState, memo } from 'react';
import { gsap } from 'gsap';

const defaultSections = [
  {
    text: "Dead Sea Mud Mask",
    subtitle: "Purify & Detoxify",
    description: "Rich in minerals that cleanse and rejuvenate your skin, revealing your natural glow",
    price: "39.99 JD",
    rating: 4.8,
    reviews: 2847,
    benefits: ["100% Natural", "Deep Cleansing", "Anti-Aging"],
    ingredients: "Maris Limus, Aloe Vera, Vitamin E",
    img: "https://m.media-amazon.com/images/I/61Zpk51IbXS._UF1000,1000_QL80_.jpg"
  },
  {
    text: "Mineral Salt Scrub",
    subtitle: "Exfoliate & Renew",
    description: "Gentle exfoliation with pure Dead Sea salts that reveal smoother, more radiant skin",
    price: "34.99 JD",
    rating: 4.9,
    reviews: 3521,
    benefits: ["Removes Dead Skin", "Improves Texture", "Energizing"],
    ingredients: "Dead Sea Salt, Jojoba Oil, Lavender",
    img: "https://laline.ca/cdn/shop/products/M71400052199_4.jpg?v=1668002220"
  },
  {
    text: "Nourishing Body Cream",
    subtitle: "Hydrate & Repair",
    description: "Deep hydration enriched with Dead Sea minerals for silky smooth skin all day",
    price: "44.99 JD",
    rating: 4.7,
    reviews: 1893,
    benefits: ["24h Moisture", "Vitamin Rich", "Fast Absorbing"],
    ingredients: "Shea Butter, Dead Sea Minerals, Argan Oil",
    img: "https://i.makeupstore.co.il/a/ag/agz7dua8qtja.jpg"
  },
  {
    text: "Therapeutic Bath Salts",
    subtitle: "Relax & Rejuvenate",
    description: "Transform your bath into a luxurious spa experience with authentic Dead Sea minerals",
    price: "29.99 JD",
    rating: 4.9,
    reviews: 4102,
    benefits: ["Muscle Relief", "Stress Relief", "Skin Softening"],
    ingredients: "Pure Dead Sea Salt, Essential Oils",
    img: "https://bathsalt.co.uk/wp-content/uploads/2021/04/DSLR05.jpg"
  }
];

const colors = {
  background: '#FFFCFB',
  secondary: '#3D6460',
  accent: '#94545C',
  border: '#BE6C77',
  text: '#2C2C2C'
};

const StarRating = memo(({ rating }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <svg 
        key={i}
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill={i < Math.floor(rating) ? colors.accent : `${colors.border}30`}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
));

const AnimatedSections = ({
  sections = defaultSections,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);

  const goToSlide = useCallback((newIndex) => {
    if (newIndex < 0 || newIndex >= sections.length || isAnimating) return;
    
    setIsAnimating(true);
    const direction = newIndex > currentIndex ? 1 : -1;
    
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(newIndex);
        setIsAnimating(false);
      }
    });

    // Fade out current
    if (sectionRefs.current[currentIndex]) {
      tl.to(sectionRefs.current[currentIndex], {
        opacity: 0,
        x: -30 * direction,
        duration: 0.4,
        ease: 'power2.in'
      }, 0);
    }

    // Fade in new
    if (sectionRefs.current[newIndex]) {
      tl.fromTo(sectionRefs.current[newIndex], 
        { opacity: 0, x: 30 * direction },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
        0.3
      );
    }
  }, [currentIndex, isAnimating, sections.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
      if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, goToSlide]);

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ 
        background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.secondary}05 100%)`,
        minHeight: '100vh',
        fontFamily: "'Inter', system-ui, sans-serif"
      }}
    >
      {/* Main Container with Flex Layout */}
      <div className="flex min-h-screen">
        
        {/* Left Side - Thumbnails (OUTSIDE the scrolling content) */}
        <div 
          className="hidden lg:flex flex-col justify-center items-center gap-4 pl-6 pr-4"
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            alignSelf: 'flex-start'
          }}
        >
          {sections.map((s, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className="block transition-all duration-300"
            >
              <div 
                className="w-16 h-16 rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  border: i === currentIndex ? `3px solid ${colors.accent}` : `2px solid ${colors.border}20`,
                  opacity: i === currentIndex ? 1 : 0.4,
                  transform: i === currentIndex ? 'scale(1.15)' : 'scale(1)',
                  boxShadow: i === currentIndex ? `0 8px 20px ${colors.accent}40` : 'none'
                }}
              >
                <img 
                  src={s.img}
                  alt={s.text}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          
          {/* Top Counter */}
          <div className="flex justify-end p-6">
            <div 
              className="px-5 py-3 rounded-full"
              style={{
                background: `${colors.background}95`,
                backdropFilter: 'blur(20px)',
                boxShadow: `0 8px 24px ${colors.secondary}15`,
                border: `1px solid ${colors.border}15`
              }}
            >
              <div className="flex items-center gap-2">
                <span 
                  className="text-2xl font-black"
                  style={{ color: colors.accent }}
                >
                  {String(currentIndex + 1).padStart(2, '0')}
                </span>
                <span 
                  className="text-sm"
                  style={{ color: colors.text, opacity: 0.4 }}
                >
                  / {String(sections.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="flex-1 flex items-center justify-center px-6 md:px-12 py-8">
            <div className="max-w-6xl w-full mx-auto">
              
              {/* Sections */}
              <div className="relative">
                {sections.map((s, idx) => (
                  <div
                    key={idx}
                    ref={(el) => sectionRefs.current[idx] = el}
                    style={{
                      display: idx === currentIndex ? 'block' : 'none'
                    }}
                  >
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                      
                      {/* Left - Text Content */}
                      <div className="space-y-6">
                        {/* Category Badge */}
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-12 h-[2px]"
                            style={{ 
                              background: `linear-gradient(90deg, ${colors.accent} 0%, transparent 100%)`
                            }}
                          />
                          <span 
                            className="text-xs font-bold uppercase tracking-[0.2em]"
                            style={{ color: colors.secondary }}
                          >
                            {s.subtitle}
                          </span>
                        </div>

                        {/* Title */}
                        <h1 
                          className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1]"
                          style={{
                            color: colors.text,
                            letterSpacing: '-0.02em'
                          }}
                        >
                          {s.text}
                        </h1>

                        {/* Description */}
                        <p 
                          className="text-lg leading-relaxed"
                          style={{ 
                            color: colors.text,
                            opacity: 0.7,
                            maxWidth: '500px'
                          }}
                        >
                          {s.description}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-4 pt-2">
                          <StarRating rating={s.rating} />
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold" style={{ color: colors.accent }}>
                              {s.rating}
                            </span>
                            <span className="text-sm" style={{ color: colors.text, opacity: 0.5 }}>
                              ({s.reviews.toLocaleString()})
                            </span>
                          </div>
                        </div>

                        {/* Benefits */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {s.benefits.map((benefit, i) => (
                            <div 
                              key={i}
                              className="px-4 py-2 rounded-full text-sm font-semibold"
                              style={{
                                background: `${colors.secondary}10`,
                                color: colors.secondary,
                                border: `1px solid ${colors.border}30`
                              }}
                            >
                              {benefit}
                            </div>
                          ))}
                        </div>

                        {/* Price & CTA */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
                          <div>
                            <div 
                              className="text-xs uppercase tracking-wider font-semibold mb-1"
                              style={{ color: colors.text, opacity: 0.5 }}
                            >
                              Price
                            </div>
                            <div 
                              className="text-4xl md:text-5xl font-black"
                              style={{ color: colors.accent }}
                            >
                              {s.price}
                            </div>
                          </div>
                          
                          <button
                            className="px-8 py-4 rounded-full font-bold text-base uppercase tracking-wide transition-all hover:scale-105 active:scale-95"
                            style={{
                              background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.border} 100%)`,
                              color: colors.background,
                              boxShadow: `0 10px 30px ${colors.accent}40`
                            }}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>

                      {/* Right - Product Image */}
                      <div className="relative mx-auto" style={{ maxWidth: '450px' }}>
                        <div className="relative aspect-square">
                          {/* Glow */}
                          <div 
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: `radial-gradient(circle, ${colors.accent}30 0%, transparent 70%)`,
                              filter: 'blur(60px)',
                              opacity: 0.6
                            }}
                          />
                          
                          {/* Product Image */}
                          <div 
                            className="relative rounded-full overflow-hidden"
                            style={{
                              boxShadow: `0 40px 80px ${colors.secondary}30`,
                              border: `4px solid ${colors.background}`
                            }}
                          >
                            <img 
                              src={s.img}
                              alt={s.text}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Discount Badge */}
                          <div 
                            className="absolute -top-4 -right-4 w-24 h-24 rounded-full flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.border} 100%)`,
                              boxShadow: `0 15px 40px ${colors.accent}50`
                            }}
                          >
                            <div className="text-center" style={{ color: colors.background }}>
                              <div className="text-xs font-bold uppercase">Save</div>
                              <div className="text-2xl font-black">15%</div>
                            </div>
                          </div>

                          {/* Info Badge */}
                          <div 
                            className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full whitespace-nowrap"
                            style={{
                              background: colors.background,
                              boxShadow: `0 10px 30px ${colors.secondary}25`,
                              border: `2px solid ${colors.border}20`
                            }}
                          >
                            <div className="text-xs font-bold text-center" style={{ color: colors.secondary }}>
                              100% Natural
                            </div>
                          </div>
                        </div>

                        {/* Ingredients Card */}
                        <div 
                          className="mt-8 p-5 rounded-2xl"
                          style={{
                            background: `${colors.secondary}08`,
                            border: `1px solid ${colors.border}20`
                          }}
                        >
                          <div 
                            className="text-xs font-bold uppercase tracking-wider mb-2"
                            style={{ color: colors.secondary, opacity: 0.7 }}
                          >
                            Key Ingredients
                          </div>
                          <div 
                            className="text-sm font-medium"
                            style={{ color: colors.text, opacity: 0.8 }}
                          >
                            {s.ingredients}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="flex justify-center pb-8">
            <div 
              className="flex items-center gap-6 px-8 py-4 rounded-full"
              style={{
                background: `${colors.background}98`,
                backdropFilter: 'blur(20px)',
                boxShadow: `0 10px 40px ${colors.secondary}20`,
                border: `1px solid ${colors.border}15`
              }}
            >
              <button
                onClick={() => goToSlide(currentIndex - 1)}
                disabled={currentIndex === 0}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: currentIndex > 0 ? colors.secondary : 'transparent',
                  color: currentIndex > 0 ? colors.background : colors.secondary
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </button>

              <div className="flex items-center gap-2">
                {sections.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className="transition-all duration-500 rounded-full"
                    style={{
                      width: i === currentIndex ? '32px' : '8px',
                      height: '8px',
                      background: i === currentIndex 
                        ? `linear-gradient(90deg, ${colors.accent} 0%, ${colors.border} 100%)`
                        : `${colors.secondary}25`
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => goToSlide(currentIndex + 1)}
                disabled={currentIndex === sections.length - 1}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: currentIndex < sections.length - 1 ? colors.secondary : 'transparent',
                  color: currentIndex < sections.length - 1 ? colors.background : colors.secondary
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedSections;