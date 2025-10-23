'use client';

import { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

const AnimatedSections = ({
  sections = defaultSections,
  className = "",
}) => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const currentIndexRef = useRef(-1);
  const animatingRef = useRef(false);
  const sectionsRefs = useRef([]);
  const imagesRefs = useRef([]);
  const outerRefs = useRef([]);
  const innerRefs = useRef([]);
  const contentRefs = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Color scheme
  const colors = {
    background: '#FFFCFB',     // 60% - Dominant
    secondary: '#3D6460',       // 30% - Secondary
    accent: '#94545C',          // 10% - Accent (Primary CTA)
    border: '#BE6C77',          // Border
    text: '#2C2C2C'             // Text
  };

  // Button styles using new color scheme
  const navButtonStyle = {
    background: colors.accent,  // Solid accent color, no gradient
    color: colors.background,
    border: `2px solid ${colors.border}`,
    boxShadow: `0 8px 24px rgba(148, 84, 92, 0.3)`,
    cursor: 'pointer'
  };

  const disabledButtonStyle = {
    background: 'rgba(61, 100, 96, 0.3)',
    color: 'rgba(255, 252, 251, 0.5)',
    border: `2px solid rgba(190, 108, 119, 0.3)`,
    cursor: 'not-allowed'
  };

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      try {
        await Promise.all(
          sections.map(section => 
            new Promise((resolve) => {
              const img = new Image();
              img.src = section.img;
              img.onload = resolve;
              img.onerror = resolve;
            })
          )
        );
        setImagesLoaded(true);
      } catch (error) {
        setImagesLoaded(true);
      }
    };
    
    preloadImages();
  }, [sections]);

  // Desktop animation function
  const gotoSection = useCallback((index, direction) => {
    if (!containerRef.current || animatingRef.current || isMobile) return;

    const sectionsElements = sectionsRefs.current;
    const images = imagesRefs.current;
    const outerWrappers = outerRefs.current;
    const innerWrappers = innerRefs.current;
    const contents = contentRefs.current;

    if (index < 0 || index >= sectionsElements.length) return;

    animatingRef.current = true;

    const fromTop = direction === -1;
    const dFactor = fromTop ? -1 : 1;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline({
      defaults: { duration: 1.0, ease: 'power2.inOut' },
      onComplete: () => {
        animatingRef.current = false;
      }
    });

    timelineRef.current = tl;

    // Set z-index for proper stacking
    gsap.set(sectionsElements, { zIndex: 1 });
    gsap.set(sectionsElements[index], { zIndex: 10 });
    if (currentIndexRef.current >= 0) {
      gsap.set(sectionsElements[currentIndexRef.current], { zIndex: 5 });
    }

    // Set up new section
    gsap.set(sectionsElements[index], { autoAlpha: 1 });
    gsap.set(outerWrappers[index], { xPercent: 100 * dFactor });
    gsap.set(innerWrappers[index], { xPercent: -100 * dFactor });

    // Animate out current section if exists
    if (currentIndexRef.current >= 0) {
      const currentIdx = currentIndexRef.current;
      tl.to(images[currentIdx], { 
        xPercent: -10 * dFactor, 
        scale: 1.1,
        ease: 'power2.inOut',
        duration: 1.0
      }, 0)
        .to(contents[currentIdx], { 
          opacity: 0, 
          x: -50 * dFactor,
          duration: 0.6,
          ease: 'power2.in'
        }, 0);
    }

    // Animate in new section
    tl.to(
      outerWrappers[index],
      { xPercent: 0, ease: 'power2.inOut', duration: 1.0 },
      0
    )
      .to(
        innerWrappers[index],
        { xPercent: 0, ease: 'power2.inOut', duration: 1.0 },
        0
      )
      .fromTo(
        images[index],
        { xPercent: 10 * dFactor, scale: 1.1 },
        { xPercent: 0, scale: 1, duration: 1.2, ease: 'power2.out' },
        0
      )
      .fromTo(
        contents[index],
        { opacity: 0, x: 80 * dFactor },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out' },
        0.3
      );

    // Clean up previous section
    if (currentIndexRef.current >= 0 && currentIndexRef.current !== index) {
      tl.set(sectionsElements[currentIndexRef.current], { autoAlpha: 0 }, 1.0);
    }

    currentIndexRef.current = index;
    setCurrentIndex(index);
  }, [isMobile]);

  // Simple mobile slide function
  const goToSlide = useCallback((index) => {
    if (index < 0 || index >= sections.length) return;
    setCurrentIndex(index);
    currentIndexRef.current = index;
  }, [sections.length]);

  // Handle wheel events (desktop only)
  const handleWheel = useCallback((e) => {
    if (animatingRef.current || isMobile) return;

    const delta = Math.sign(e.deltaY);
    
    if (delta > 0 && currentIndexRef.current < sections.length - 1) {
      gotoSection(currentIndexRef.current + 1, 1);
    } else if (delta < 0 && currentIndexRef.current > 0) {
      gotoSection(currentIndexRef.current - 1, -1);
    }
  }, [gotoSection, sections.length, isMobile]);

  // Handle keyboard navigation (desktop only)
  const handleKeyDown = useCallback((e) => {
    if (animatingRef.current || isMobile) return;

    if (e.key === 'ArrowDown' && currentIndexRef.current < sections.length - 1) {
      e.preventDefault();
      gotoSection(currentIndexRef.current + 1, 1);
    } else if (e.key === 'ArrowUp' && currentIndexRef.current > 0) {
      e.preventDefault();
      gotoSection(currentIndexRef.current - 1, -1);
    }
  }, [gotoSection, sections.length, isMobile]);

  // Mobile touch handlers
  const handleTouchStart = useCallback((e) => {
    if (!isMobile) return;
    touchStartX.current = e.touches[0].clientX;
  }, [isMobile]);

  const handleTouchMove = useCallback((e) => {
    if (!isMobile) return;
    touchEndX.current = e.touches[0].clientX;
  }, [isMobile]);

  const handleTouchEnd = useCallback(() => {
    if (!isMobile) return;
    
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && currentIndex < sections.length - 1) {
        goToSlide(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        goToSlide(currentIndex - 1);
      }
    }
  }, [currentIndex, goToSlide, sections.length, isMobile]);

  // Set up event listeners
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const container = containerRef.current;
    if (!container) return;

    if (!isMobile) {
      // Desktop: wheel and keyboard
      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('keydown', handleKeyDown);
    } else {
      // Mobile: touch events
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: true });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [handleWheel, handleKeyDown, handleTouchStart, handleTouchMove, handleTouchEnd, isMobile]);

  // Initialize first section
  useEffect(() => {
    if (!imagesLoaded || !containerRef.current) return;
    
    const initializeFirstSection = () => {
      if (!isMobile && currentIndexRef.current === -1) {
        gotoSection(0, 1);
      } else if (isMobile && currentIndexRef.current === -1) {
        setCurrentIndex(0);
        currentIndexRef.current = 0;
      }
    };

    const timer = setTimeout(initializeFirstSection, 100);
    return () => clearTimeout(timer);
  }, [imagesLoaded, gotoSection, isMobile]);

  // Mobile Render (Simplified Slider)
  if (isMobile) {
    return (
      <div 
        ref={containerRef}
        className={`font-sans relative ${className}`}
        style={{ 
          background: colors.background,
          minHeight: '100vh',
          overflow: 'hidden'
        }}
      >
        {/* Mobile Progress Dots */}
        <div className="absolute top-4 left-0 right-0 flex justify-center gap-2 z-50">
          {sections.map((_, i) => (
            <button
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: i === currentIndex ? colors.accent : `rgba(61, 100, 96, 0.3)`,
                transform: i === currentIndex ? 'scale(1.5)' : 'scale(1)',
              }}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Mobile Slides Container */}
        <div 
          className="relative transition-transform duration-500 ease-out"
          style={{
            display: 'flex',
            transform: `translateX(-${currentIndex * 100}%)`,
            minHeight: '100vh'
          }}
        >
          {sections.map((section, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-full min-h-screen relative"
              style={{ width: '100vw' }}
            >
              {/* Background */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url("${section.img}")`,
                  filter: 'brightness(0.4) contrast(1.1)',
                }}
              />

              {/* Overlay - Updated colors */}
              <div className="absolute inset-0" style={{
                background: `linear-gradient(135deg, rgba(61, 100, 96, 0.8) 0%, rgba(148, 84, 92, 0.6) 100%)`
              }} />

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end h-full p-6 pb-24">
                <div className="space-y-4">
                  <div className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: colors.background }}>
                    {section.subtitle}
                  </div>

                  <h2 className="text-4xl font-black leading-tight" style={{ 
                    color: colors.background
                  }}>
                    {section.text}
                  </h2>

                  <p className="text-sm leading-relaxed" style={{ color: colors.background, opacity: 0.9 }}>
                    {section.description}
                  </p>

                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, idx) => (
                        <span key={idx} className="text-base" style={{ color: idx < Math.floor(section.rating) ? '#FFD700' : 'rgba(255,215,0,0.2)' }}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-medium" style={{ color: colors.background }}>
                      {section.rating} ({section.reviews.toLocaleString()})
                    </span>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <div className="text-3xl font-black" style={{ 
                      color: colors.background
                    }}>
                      {section.price}
                    </div>
                    <button 
                      className="px-6 py-3 rounded-full text-sm font-bold uppercase transition-all duration-300 active:scale-95" 
                      style={{
                        background: colors.accent,
                        color: colors.background,
                        border: `2px solid ${colors.border}`,
                        boxShadow: `0 8px 24px rgba(148, 84, 92, 0.4)`
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Navigation Arrows */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
          style={currentIndex === 0 ? disabledButtonStyle : { ...navButtonStyle, opacity: 0.8 }}
          onClick={() => currentIndex > 0 && goToSlide(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          ‹
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
          style={currentIndex === sections.length - 1 ? disabledButtonStyle : { ...navButtonStyle, opacity: 0.8 }}
          onClick={() => currentIndex < sections.length - 1 && goToSlide(currentIndex + 1)}
          disabled={currentIndex === sections.length - 1}
        >
          ›
        </button>
      </div>
    );
  }

  // Desktop Render (Original)
  return (
    <div 
      ref={containerRef}
      className={`font-sans relative ${className}`}
      style={{ 
        background: colors.background,
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      {/* Progress Indicator - Updated colors */}
      <div 
        className="absolute top-[100px] left-8 flex flex-col gap-3"
        style={{ zIndex: 100, pointerEvents: 'auto' }}
      >
        {sections.map((_, i) => (
          <button
            key={i}
            className="w-1 h-12 rounded-full transition-all duration-500 cursor-pointer focus:outline-none"
            style={{
              background: i === currentIndex ? colors.accent : `rgba(61, 100, 96, 0.3)`,
              transform: i === currentIndex ? 'scaleY(1.3)' : 'scaleY(1)',
            }}
            onClick={() => {
              if (i !== currentIndex && !animatingRef.current) {
                const direction = i > currentIndex ? 1 : -1;
                gotoSection(i, direction);
              }
            }}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav 
        className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-8 px-4"
        style={{ zIndex: 100, pointerEvents: 'auto' }}
        aria-label="Product navigation"
      >
        <button
          onClick={() => {
            if (!animatingRef.current && currentIndexRef.current > 0) {
              gotoSection(currentIndexRef.current - 1, -1);
            }
          }}
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110"
          style={currentIndex === 0 ? disabledButtonStyle : navButtonStyle}
          disabled={currentIndex === 0}
        >
          ←
        </button>

        <div className="flex gap-4">
          {sections.map((section, i) => (
            <button
              key={i}
              className="relative group flex-shrink-0"
              onClick={() => {
                if (currentIndex !== i && !animatingRef.current) {
                  const direction = i > currentIndex ? 1 : -1;
                  gotoSection(i, direction);
                }
              }}
            >
              <div 
                className="w-20 h-20 rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-110"
                style={{
                  border: currentIndex === i ? `3px solid ${colors.accent}` : `3px solid ${colors.border}`,
                  boxShadow: currentIndex === i ? `0 10px 30px rgba(148, 84, 92, 0.6)` : 'none',
                  transform: currentIndex === i ? 'translateY(-8px)' : 'translateY(0)',
                }}
              >
                <img
                  src={section.img}
                  alt={section.text}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            if (!animatingRef.current && currentIndexRef.current < sections.length - 1) {
              gotoSection(currentIndexRef.current + 1, 1);
            }
          }}
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110"
          style={currentIndex === sections.length - 1 ? disabledButtonStyle : navButtonStyle}
          disabled={currentIndex === sections.length - 1}
        >
          →
        </button>
      </nav>

      {/* Desktop Sections Container */}
      <div className="relative w-full h-full" style={{ zIndex: 1 }}>
        {sections.map((section, i) => (
          <section 
            key={i} 
            className="absolute top-0 left-0 w-full h-full"
            ref={(el) => { if (el) sectionsRefs.current[i] = el; }}
            style={{ visibility: 'visible', zIndex: i === currentIndex ? 10 : 1 }}
          >
            <div className="outer w-full h-full overflow-hidden" ref={(el) => { if (el) outerRefs.current[i] = el; }}>
              <div className="inner w-full h-full overflow-hidden" ref={(el) => { if (el) innerRefs.current[i] = el; }}>
                {/* Background Image */}
                <div
                  className="bg absolute top-0 left-0 w-full h-full bg-cover bg-center"
                  ref={(el) => { if (el) imagesRefs.current[i] = el; }}
                  style={{
                    backgroundImage: `url("${section.img}")`,
                    filter: 'brightness(0.4) contrast(1.1)',
                  }}
                />

                {/* Overlay - Updated to use new colors */}
                <div className="absolute inset-0" style={{
                  background: `linear-gradient(135deg, rgba(61, 100, 96, 0.85) 0%, rgba(148, 84, 92, 0.6) 50%, transparent 100%)`
                }} />

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center px-16">
                  <div 
                    className="max-w-6xl w-full"
                    ref={(el) => { if (el) contentRefs.current[i] = el; }}
                  >
                    <div className="grid grid-cols-2 gap-12 items-center">
                      {/* Left: Product Image */}
                      <div className="relative">
                        <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden" style={{
                          border: `1px solid ${colors.border}`,
                          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                        }}>
                          <img 
                            src={section.img} 
                            alt={section.text}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Right: Product Info */}
                      <div className="space-y-6">
                        <div className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: colors.background }}>
                          {section.subtitle}
                        </div>

                        <h2 className="text-6xl font-black leading-tight" style={{ 
                          color: colors.background
                        }}>
                          {section.text}
                        </h2>

                        <p className="text-base leading-relaxed" style={{ color: colors.background, opacity: 0.9 }}>
                          {section.description}
                        </p>

                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, idx) => (
                              <span key={idx} className="text-lg" style={{ color: idx < Math.floor(section.rating) ? '#FFD700' : 'rgba(255,215,0,0.2)' }}>
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-xs font-medium" style={{ color: colors.background }}>
                            {section.rating} ({section.reviews.toLocaleString()})
                          </span>
                        </div>

                        <div className="flex items-center gap-5 pt-2">
                          <div className="text-4xl font-black" style={{ 
                            color: colors.background
                          }}>
                            {section.price}
                          </div>
                          <button 
                            className="px-8 py-3 rounded-full text-sm font-bold uppercase transition-all duration-300 hover:scale-105" 
                            style={navButtonStyle}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default AnimatedSections;