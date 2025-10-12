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
          y: 40
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
          y: 80,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
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
      y: -12,
      duration: 0.5,
      ease: 'power2.out'
    });

    gsap.to(image, {
      scale: 1.1,
      duration: 0.6,
      ease: 'power2.out'
    });

    gsap.to(content, {
      y: -6,
      duration: 0.4,
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
      duration: 0.5,
      ease: 'power2.out'
    });

    gsap.to(image, {
      scale: 1,
      duration: 0.6,
      ease: 'power2.out'
    });

    gsap.to(content, {
      y: 0,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  return (
    <div 
      className="relative w-full py-20 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #F6F4F7 50%, #ffffff 100%)'
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-12 md:mb-16">
          <div 
            className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-4"
            style={{ color: '#cbc2d7' }}
          >
            Shop By Category
          </div>
          <h2 
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
            style={{ 
              background: 'linear-gradient(135deg, #1a1a2e 0%, #cbc2d7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Explore Our Collections
          </h2>
          <p 
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#1a1a2e', opacity: 0.6 }}
          >
            Discover your perfect skincare routine with our curated Dead Sea mineral collections
          </p>
        </div>

        {/* Categories Grid - MATCHING PRODUCTS LAYOUT */}
        <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className="relative bg-white rounded-2xl overflow-hidden transition-all duration-500"
                  style={{
                    boxShadow: isHovered 
                      ? '0 25px 50px rgba(203,194,215,0.4)'
                      : '0 10px 30px rgba(0,0,0,0.08)',
                    border: '1px solid',
                    borderColor: isHovered ? '#cbc2d7' : 'rgba(203,194,215,0.15)'
                  }}
                >
                  {/* Image Container */}
                  <div className="relative h-72 overflow-hidden bg-gray-50">
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
                      className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm"
                      style={{
                        background: 'rgba(203,194,215,0.9)',
                        color: '#1a1a2e'
                      }}
                    >
                      {category.badge}
                    </div>

                    {/* Icon */}
                    <div 
                      className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.9)'
                      }}
                    >
                      <Icon 
                        size={20}
                        style={{ 
                          color: '#cbc2d7',
                          strokeWidth: 2
                        }}
                      />
                    </div>

                    {/* Quick View on Hover */}
                    <div 
                      className="absolute inset-x-4 bottom-4 transition-all duration-400"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'translateY(0)' : 'translateY(10px)'
                      }}
                    >
                      <button 
                        className="w-full py-2.5 rounded-xl text-sm font-bold backdrop-blur-md transition-all duration-300"
                        style={{
                          background: 'rgba(203,194,215,0.95)',
                          color: '#1a1a2e',
                          border: '1px solid rgba(255,255,255,0.3)'
                        }}
                      >
                        Explore Collection
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="category-content p-5">
                    {/* Count */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium" style={{ color: '#cbc2d7' }}>
                        {category.count} Products
                      </span>
                    </div>

                    {/* Title */}
                    <div className="mb-3">
                      <div 
                        className="text-xs font-bold tracking-wider uppercase mb-1"
                        style={{ color: '#cbc2d7' }}
                      >
                        {category.subtitle}
                      </div>
                      <h3 
                        className="text-lg font-black leading-tight"
                        style={{ color: '#1a1a2e' }}
                      >
                        {category.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p 
                      className="text-xs mb-4"
                      style={{
                        color: '#1a1a2e',
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
                          background: 'linear-gradient(135deg, #1a1a2e, #cbc2d7)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                      >
                        Shop Now
                      </span>

                      <button 
                        className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-400"
                        style={{
                          background: isHovered 
                            ? 'linear-gradient(135deg, #cbc2d7, #F6F4F7)'
                            : 'rgba(203,194,215,0.1)',
                          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                        }}
                      >
                        <ArrowRight 
                          size={20}
                          style={{ 
                            color: isHovered ? '#1a1a2e' : '#cbc2d7',
                            strokeWidth: 2
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
        <div className="text-center mt-12 md:mt-16">
          <button 
            className="group inline-flex items-center gap-3 px-10 md:px-12 py-4 md:py-5 rounded-full font-bold text-sm md:text-base transition-all duration-500 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #cbc2d7, #F6F4F7)',
              color: '#1a1a2e',
              boxShadow: '0 20px 40px rgba(203,194,215,0.4)'
            }}
          >
            View All Collections
            <ArrowRight 
              size={20}
              className="transition-transform duration-500 group-hover:translate-x-2"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;