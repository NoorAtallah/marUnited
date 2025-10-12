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

  const gotoSection = useCallback((index, direction) => {
    if (!containerRef.current || animatingRef.current) return;

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

    // Set z-index for proper stacking - new section on top
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

    // Animate in new section - synchronized to prevent gaps
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
  }, []);

  // Handle wheel events
  const handleWheel = useCallback((e) => {
    if (animatingRef.current) {
      e.preventDefault();
      return;
    }

    const delta = Math.sign(e.deltaY);
    
    if (delta > 0 && currentIndexRef.current < sections.length - 1) {
      // Scrolling down - go to next section
      e.preventDefault();
      gotoSection(currentIndexRef.current + 1, 1);
    } else if (delta < 0 && currentIndexRef.current > 0) {
      // Scrolling up - go to previous section
      e.preventDefault();
      gotoSection(currentIndexRef.current - 1, -1);
    }
  }, [sections.length, gotoSection]);

  // Handle touch events for mobile
  const touchStartY = useRef(0);
  
  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (animatingRef.current) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    const swipeThreshold = 50;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && currentIndexRef.current < sections.length - 1) {
        // Swipe down - go to next section
        gotoSection(currentIndexRef.current + 1, 1);
      } else if (diff < 0 && currentIndexRef.current > 0) {
        // Swipe up - go to previous section
        gotoSection(currentIndexRef.current - 1, -1);
      }
    }
  }, [sections.length, gotoSection]);

  // Setup effects
  useEffect(() => {
    if (!containerRef.current || !imagesLoaded) return;

    const outerWrappers = outerRefs.current;
    const innerWrappers = innerRefs.current;

    // Initialize positions - hide all sections initially
    gsap.set(outerWrappers, { xPercent: 100 });
    gsap.set(innerWrappers, { xPercent: -100 });
    gsap.set(sectionsRefs.current, { autoAlpha: 0 });

    // Add event listeners
    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Initial animation - show first section
    gotoSection(0, 1);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [imagesLoaded, gotoSection, handleWheel, handleTouchStart, handleTouchEnd]);

  const gradientOverlay = useMemo(() => ({
    background: 'linear-gradient(135deg, rgba(26,26,46,0.8) 0%, rgba(203,194,215,0.3) 50%, transparent 100%)'
  }), []);

  const navButtonStyle = useMemo(() => ({
    background: 'linear-gradient(135deg, #cbc2d7, #F6F4F7)',
    color: '#1a1a2e',
    boxShadow: '0 10px 30px rgba(203,194,215,0.4)'
  }), []);

  const disabledButtonStyle = useMemo(() => ({
    background: 'rgba(203,194,215,0.2)',
    color: 'rgba(26,26,46,0.5)',
    cursor: 'not-allowed'
  }), []);

  return (
    <div 
      ref={containerRef}
      className={`font-sans relative ${className}`}
      style={{ 
        background: '#1a1a2e',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      {/* Progress Indicator - HIGHEST z-index */}
      <div 
        className="absolute top-[100px] left-4 md:left-8 flex flex-col gap-2 md:gap-3"
        style={{ zIndex: 100, pointerEvents: 'auto' }}
      >
        {sections.map((_, i) => (
          <button
            key={i}
            className="w-0.5 md:w-1 h-8 md:h-12 rounded-full transition-all duration-500 cursor-pointer focus:outline-none"
            style={{
              background: i === currentIndex ? 'linear-gradient(180deg, #cbc2d7, #F6F4F7)' : 'rgba(203,194,215,0.2)',
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

      {/* Navigation - HIGHEST z-index */}
      <nav 
        className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center items-center gap-3 md:gap-8 px-4"
        style={{ zIndex: 100, pointerEvents: 'auto' }}
        aria-label="Product navigation"
      >
        <button
          onClick={() => {
            if (!animatingRef.current && currentIndexRef.current > 0) {
              gotoSection(currentIndexRef.current - 1, -1);
            }
          }}
          className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-lg md:text-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a1a2e] disabled:hover:scale-100"
          style={currentIndex === 0 ? disabledButtonStyle : navButtonStyle}
          aria-label="Previous product"
          disabled={currentIndex === 0}
        >
          ←
        </button>

        <div className="flex gap-2 md:gap-4 overflow-x-auto max-w-[60vw] md:max-w-none scrollbar-hide">
          {sections.map((section, i) => (
            <button
              key={i}
              className="relative group flex-shrink-0 focus:outline-none"
              onClick={() => {
                if (currentIndex !== i && !animatingRef.current) {
                  const direction = i > currentIndex ? 1 : -1;
                  gotoSection(i, direction);
                }
              }}
              aria-label={`Go to ${section.text}`}
            >
              <div 
                className="w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-110 relative"
                style={{
                  border: currentIndex === i ? '3px solid #cbc2d7' : '3px solid rgba(203,194,215,0.2)',
                  boxShadow: currentIndex === i ? '0 10px 30px rgba(203,194,215,0.6), 0 0 0 4px rgba(203,194,215,0.1)' : 'none',
                  transform: currentIndex === i ? 'translateY(-4px) md:translateY(-8px)' : 'translateY(0)',
                }}
              >
                <img
                  src={section.img}
                  alt={section.text}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {currentIndex === i && (
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(45deg, rgba(203,194,215,0.3), transparent)' }} />
                )}
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
          className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-lg md:text-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a1a2e] disabled:hover:scale-100"
          style={currentIndex === sections.length - 1 ? disabledButtonStyle : navButtonStyle}
          aria-label="Next product"
          disabled={currentIndex === sections.length - 1}
        >
          →
        </button>
      </nav>

      {/* Sections Container - LOWER z-index */}
      <div className="relative w-full h-full" style={{ zIndex: 1, background: '#1a1a2e' }}>
        {sections.map((section, i) => (
          <section 
            key={i} 
            className="absolute top-0 left-0 w-full h-full"
            ref={(el) => { 
              if (el) {
                sectionsRefs.current[i] = el;
              }
            }}
            style={{ 
              visibility: 'visible',
              zIndex: i === currentIndex ? 10 : 1
            }}
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
                    backgroundPosition: 'center',
                  }}
                />

                <div className="absolute inset-0" style={gradientOverlay} />

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8 lg:px-16 py-20 md:py-0">
                  <div 
                    className="max-w-6xl w-full"
                    ref={(el) => { if (el) contentRefs.current[i] = el; }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
                      {/* Left: Product Image - Now with the actual image */}
                      <div className="relative order-2 md:order-1">
                        <div className="relative w-full max-w-[280px] md:max-w-md mx-auto aspect-square rounded-xl md:rounded-2xl overflow-hidden" style={{
                          border: '1px solid rgba(255,255,255,0.15)',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                          background: 'transparent'
                        }}>
                          <img 
                            src={section.img} 
                            alt={section.text}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      {/* Right: Product Info */}
                      <div className="space-y-3 md:space-y-6 order-1 md:order-2 text-center md:text-left">
                        <div className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#cbc2d7', opacity: 0.8 }}>
                          {section.subtitle}
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight" style={{ 
                          background: 'linear-gradient(135deg, #F6F4F7 0%, #cbc2d7 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}>
                          {section.text}
                        </h2>

                        <p className="text-sm md:text-base leading-relaxed max-w-md mx-auto md:mx-0" style={{ color: '#F6F4F7', opacity: 0.7 }}>
                          {section.description}
                        </p>

                        <div className="flex items-center gap-2 md:gap-3 justify-center md:justify-start">
                          <div className="flex gap-0.5 md:gap-1" aria-label={`${section.rating} out of 5 stars`}>
                            {[...Array(5)].map((_, idx) => (
                              <span key={idx} className="text-base md:text-lg" style={{ color: idx < Math.floor(section.rating) ? '#FFD700' : 'rgba(255,215,0,0.2)' }} aria-hidden="true">
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-[10px] md:text-xs font-medium" style={{ color: '#cbc2d7', opacity: 0.7 }}>
                            {section.rating} ({section.reviews.toLocaleString()})
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-5 pt-2 justify-center md:justify-start">
                          <div className="text-3xl md:text-4xl font-black" style={{ 
                            background: 'linear-gradient(135deg, #F6F4F7, #cbc2d7)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}>
                            {section.price}
                          </div>
                          <button className="px-6 md:px-8 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-bold uppercase transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a1a2e]" style={{ 
                            ...navButtonStyle,
                          }}>
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

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default AnimatedSections;