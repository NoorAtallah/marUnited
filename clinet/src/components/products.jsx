'use client';
import { useState, useRef, useEffect } from 'react';
import { Droplets, Sparkles, Bath, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CategoriesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  const categories = [
    {
      icon: Droplets,
      title: "Face Care",
      subtitle: "Purify & Detoxify",
      description: "Masks, cleansers, and serums",
      count: "12",
      image: "https://m.media-amazon.com/images/I/61Zpk51IbXS._UF1000,1000_QL80_.jpg",
      badge: "Best Seller"
    },
    {
      icon: Sparkles,
      title: "Body Care",
      subtitle: "Exfoliate & Renew",
      description: "Scrubs and body creams",
      count: "18",
      image: "https://laline.ca/cdn/shop/products/M71400052199_4.jpg?v=1668002220",
      badge: "Popular"
    },
    {
      icon: Bath,
      title: "Bath & Spa",
      subtitle: "Relax & Rejuvenate",
      description: "Salts and aromatic oils",
      count: "8",
      image: "https://bathsalt.co.uk/wp-content/uploads/2021/04/DSLR05.jpg",
      badge: "Top Rated"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current.children,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          }
        }
      );

      // Cards animation
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    
    const card = cardsRef.current[index];
    const image = card.querySelector('.category-image');
    const content = card.querySelector('.category-content');

    gsap.to(card, {
      y: -8,
      duration: 0.4,
      ease: 'power2.out'
    });

    gsap.to(image, {
      scale: 1.08,
      duration: 0.5,
      ease: 'power2.out'
    });

    gsap.to(content, {
      y: -4,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (index) => {
    setHoveredIndex(null);
    
    const card = cardsRef.current[index];
    const image = card.querySelector('.category-image');
    const content = card.querySelector('.category-content');

    gsap.to(card, {
      y: 0,
      duration: 0.4,
      ease: 'power2.out'
    });

    gsap.to(image, {
      scale: 1,
      duration: 0.5,
      ease: 'power2.out'
    });

    gsap.to(content, {
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
    <div 
      className="relative w-full py-12 md:py-16 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #ffe3e8 50%, #ffffff 100%)'
      }}
    >
      <div className="relative max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-8 md:mb-10">
          <div 
            className="text-xs font-bold tracking-[0.25em] uppercase mb-2"
            style={{ color: '#cc878e' }}
          >
            Shop By Category
          </div>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 leading-tight"
            style={{ 
              background: 'linear-gradient(135deg, #94545c 0%, #cc878e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Explore Our Collections
          </h2>
          <p 
            className="text-sm md:text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: '#94545c', opacity: 0.7 }}
          >
            Discover your perfect skincare routine with our curated Dead Sea mineral collections
          </p>
        </div>

        {/* Categories Grid */}
        <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {categories.map((category, idx) => {
            const Icon = category.icon;
            const isHovered = hoveredIndex === idx;
            
            return (
              <div
                key={idx}
                ref={el => cardsRef.current[idx] = el}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
              >
                {/* Card */}
                <div 
                  className="relative bg-white rounded-xl overflow-hidden transition-all duration-500"
                  style={{
                    boxShadow: isHovered 
                      ? '0 15px 35px rgba(204,135,142,0.3)'
                      : '0 8px 20px rgba(0,0,0,0.06)',
                    border: '1px solid',
                    borderColor: isHovered ? '#cc878e' : 'rgba(204,135,142,0.15)'
                  }}
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden bg-gray-50">
                    <img 
                      src={category.image}
                      alt={category.title}
                      className="category-image w-full h-full object-cover"
                    />
                    
                    {/* Overlay Gradient */}
                    <div 
                      className="absolute inset-0 transition-opacity duration-400"
                      style={{
                        background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 100%)',
                        opacity: isHovered ? 1 : 0
                      }}
                    />

                    {/* Badge */}
                    <div 
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-sm"
                      style={{
                        background: 'rgba(204,135,142,0.9)',
                        color: '#ffffff'
                      }}
                    >
                      {category.badge}
                    </div>

                    {/* Icon */}
                    <div 
                      className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.9)'
                      }}
                    >
                      <Icon 
                        size={16}
                        style={{ 
                          color: '#cc878e',
                          strokeWidth: 2.5
                        }}
                      />
                    </div>

                    {/* Quick View on Hover */}
                    <div 
                      className="absolute inset-x-3 bottom-3 transition-all duration-400"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'translateY(0)' : 'translateY(10px)'
                      }}
                    >
                      <button 
                        className="w-full py-2 rounded-lg text-xs font-bold backdrop-blur-md transition-all duration-300"
                        style={{
                          background: 'rgba(0,201,187,0.95)',
                          color: '#ffffff',
                          border: '1px solid rgba(255,255,255,0.3)'
                        }}
                      >
                        Explore Collection
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="category-content p-4">
                    {/* Count */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium" style={{ color: '#cc878e' }}>
                        {category.count} Products
                      </span>
                    </div>

                    {/* Title */}
                    <div className="mb-2">
                      <div 
                        className="text-xs font-bold tracking-wider uppercase mb-0.5"
                        style={{ color: '#cc878e' }}
                      >
                        {category.subtitle}
                      </div>
                      <h3 
                        className="text-base font-black leading-tight"
                        style={{ color: '#94545c' }}
                      >
                        {category.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p 
                      className="text-xs mb-3"
                      style={{
                        color: '#94545c',
                        opacity: 0.7
                      }}
                    >
                      {category.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span 
                        className="text-sm font-bold"
                        style={{ 
                          background: 'linear-gradient(135deg, #94545c, #cc878e)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                      >
                        Shop Now
                      </span>

                      <button 
                        className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-400"
                        style={{
                          background: isHovered 
                            ? '#00c9bb'
                            : 'rgba(204,135,142,0.1)',
                          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                        }}
                      >
                        <ArrowRight 
                          size={16}
                          style={{ 
                            color: isHovered ? '#ffffff' : '#cc878e',
                            strokeWidth: 2.5
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 md:mt-10">
          <button 
            className="group inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all duration-500 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #00c9bb, #00d4c7)',
              color: '#ffffff',
              boxShadow: '0 15px 30px rgba(0,201,187,0.3)'
            }}
          >
            View All Collections
            <ArrowRight 
              size={18}
              className="transition-transform duration-500 group-hover:translate-x-2"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;