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
      e.preventDefault();
      gotoSection(currentIndexRef.current + 1, 1);
    } else if (delta < 0 && currentIndexRef.current > 0) {
      e.preventDefault();
      gotoSection(currentIndexRef.current - 1, -1);
    }
  }, [sections.length, gotoSection, isMobile]);

  // Touch handlers for mobile swipe
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isMobile) return;
    
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && currentIndex < sections.length - 1) {
        // Swipe left - next slide
        goToSlide(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        // Swipe right - previous slide
        goToSlide(currentIndex - 1);
      }
    }
  }, [currentIndex, sections.length, goToSlide, isMobile]);

  // Setup desktop animations
  useEffect(() => {
    if (!containerRef.current || !imagesLoaded || isMobile) return;

    const outerWrappers = outerRefs.current;
    const innerWrappers = innerRefs.current;

    // Initialize positions for desktop
    gsap.set(outerWrappers, { xPercent: 100 });
    gsap.set(innerWrappers, { xPercent: -100 });
    gsap.set(sectionsRefs.current, { autoAlpha: 0 });

    // Add event listeners
    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel, { passive: false });

    // Initial animation - show first section
    gotoSection(0, 1);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [imagesLoaded, gotoSection, handleWheel, isMobile]);

  const navButtonStyle = useMemo(() => ({
    background: 'linear-gradient(135deg, #00c9bb, #ffe3e8)',
    color: '#94545c',
    boxShadow: '0 10px 30px rgba(0,201,187,0.4)'
  }), []);

  const disabledButtonStyle = useMemo(() => ({
    background: 'rgba(204,135,142,0.2)',
    color: 'rgba(148,84,92,0.5)',
    cursor: 'not-allowed'
  }), []);

  // Mobile Slider Render
  if (isMobile) {
    return (
      <div 
        className="relative w-full h-screen overflow-hidden"
        style={{ background: '#94545c' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Mobile Slides Container */}
        <div 
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {sections.map((section, i) => (
            <div key={i} className="w-full h-full flex-shrink-0 relative">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url("${section.img}")`,
                  filter: 'brightness(0.4) contrast(1.1)'
                }}
              />
              
              {/* Gradient Overlay */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, rgba(148,84,92,0.7) 0%, transparent 50%, rgba(148,84,92,0.9) 100%)'
                }}
              />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between px-4 py-20">
                {/* Top Content */}
                <div className="mt-8">
                  <div className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: '#00c9bb' }}>
                    {section.subtitle}
                  </div>
                  <h2 className="text-3xl font-black mb-3" style={{ color: '#ffe3e8' }}>
                    {section.text}
                  </h2>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#ffe3e8', opacity: 0.9 }}>
                    {section.description}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, idx) => (
                        <span key={idx} className="text-base" style={{ color: idx < Math.floor(section.rating) ? '#FFD700' : 'rgba(255,215,0,0.2)' }}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-medium" style={{ color: '#00c9bb' }}>
                      {section.rating} ({section.reviews.toLocaleString()})
                    </span>
                  </div>
                </div>

                {/* Product Image */}
                <div className="my-6">
                  <div 
                    className="w-full max-w-[250px] mx-auto aspect-square rounded-2xl overflow-hidden"
                    style={{
                      border: '1px solid rgba(0,201,187,0.3)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                    }}
                  >
                    <img 
                      src={section.img} 
                      alt={section.text}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Bottom Content - Price and Button */}
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-black" style={{ color: '#ffe3e8' }}>
                    {section.price}
                  </div>
                  <button 
                    className="px-6 py-2.5 rounded-full text-sm font-bold uppercase"
                    style={navButtonStyle}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Dots Indicator */}
        <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-2">
          {sections.map((_, i) => (
            <button
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: i === currentIndex ? '#00c9bb' : 'rgba(255,227,232,0.3)',
                transform: i === currentIndex ? 'scale(1.5)' : 'scale(1)'
              }}
              onClick={() => goToSlide(i)}
            />
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
        background: '#94545c',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      {/* Progress Indicator */}
      <div 
        className="absolute top-[100px] left-8 flex flex-col gap-3"
        style={{ zIndex: 100, pointerEvents: 'auto' }}
      >
        {sections.map((_, i) => (
          <button
            key={i}
            className="w-1 h-12 rounded-full transition-all duration-500 cursor-pointer focus:outline-none"
            style={{
              background: i === currentIndex ? 'linear-gradient(180deg, #00c9bb, #ffe3e8)' : 'rgba(255,227,232,0.2)',
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
                  border: currentIndex === i ? '3px solid #00c9bb' : '3px solid rgba(255,227,232,0.2)',
                  boxShadow: currentIndex === i ? '0 10px 30px rgba(0,201,187,0.6)' : 'none',
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

                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(135deg, rgba(148,84,92,0.8) 0%, rgba(204,135,142,0.3) 50%, transparent 100%)'
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
                          border: '1px solid rgba(0,201,187,0.3)',
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
                        <div className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#00c9bb' }}>
                          {section.subtitle}
                        </div>

                        <h2 className="text-6xl font-black leading-tight" style={{ 
                          background: 'linear-gradient(135deg, #ffe3e8 0%, #00c9bb 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}>
                          {section.text}
                        </h2>

                        <p className="text-base leading-relaxed" style={{ color: '#ffe3e8', opacity: 0.8 }}>
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
                          <span className="text-xs font-medium" style={{ color: '#00c9bb' }}>
                            {section.rating} ({section.reviews.toLocaleString()})
                          </span>
                        </div>

                        <div className="flex items-center gap-5 pt-2">
                          <div className="text-4xl font-black" style={{ 
                            background: 'linear-gradient(135deg, #ffe3e8, #00c9bb)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}>
                            {section.price}
                          </div>
                          <button className="px-8 py-3 rounded-full text-sm font-bold uppercase transition-all duration-300 hover:scale-105" style={navButtonStyle}>
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