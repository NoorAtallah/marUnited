'use client';
import { useState, useRef, useEffect } from 'react';
import { Droplets, Sparkles, Bath, ArrowRight, Package } from 'lucide-react';
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

  const colors = {
    background: '#FFFCFB',     // 60% - Dominant
    secondary: '#3D6460',       // 30% - Secondary
    accent: '#94545C',          // 10% - Accent (Primary CTA)
    border: '#BE6C77',          // Border
    text: '#2C2C2C'             // Text
  };

  const categories = [
    {
      icon: Droplets,
      title: "Face Care",
      subtitle: "Purify & Detoxify",
      description: "Masks, cleansers, and serums enriched with Dead Sea minerals",
      count: "12",
      image: "https://m.media-amazon.com/images/I/61Zpk51IbXS._UF1000,1000_QL80_.jpg",
      badge: "Best Seller"
    },
    {
      icon: Sparkles,
      title: "Body Care",
      subtitle: "Exfoliate & Renew",
      description: "Luxurious scrubs and nourishing body creams",
      count: "18",
      image: "https://laline.ca/cdn/shop/products/M71400052199_4.jpg?v=1668002220",
      badge: "Popular"
    },
    {
      icon: Bath,
      title: "Bath & Spa",
      subtitle: "Relax & Rejuvenate",
      description: "Therapeutic salts and aromatic essential oils",
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
      y: -10,
      duration: 0.4,
      ease: 'power2.out'
    });

    gsap.to(image, {
      scale: 1.1,
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
      className="relative w-full py-20 md:py-28 overflow-hidden"
      style={{
        background: colors.background
      }}
    >
      <div className="relative max-w-6xl mx-auto px-4 md:px-6">
        {/* Minimal Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div 
            className="text-xs font-bold tracking-[0.3em] uppercase mb-3"
            style={{ color: colors.accent }}
          >
            Collections
          </div>
          
          <h2 
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ 
              color: colors.text
            }}
          >
            Shop By Category
          </h2>
          
          <p 
            className="text-base max-w-xl mx-auto"
            style={{ color: colors.text, opacity: 0.6 }}
          >
            Curated Dead Sea mineral collections for every need
          </p>
        </div>

        {/* Clean 3-Column Grid */}
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, idx) => {
            const Icon = category.icon;
            const isHovered = hoveredIndex === idx;
            
            return (
              <div
                key={idx}
                ref={el => cardsRef.current[idx] = el}
                className="relative group cursor-pointer"
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
              >
                {/* Minimal Card */}
                <div 
                  className="relative overflow-hidden transition-all duration-400"
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid',
                    borderColor: isHovered ? colors.border : 'rgba(190, 108, 119, 0.15)',
                    boxShadow: isHovered 
                      ? '0 12px 40px rgba(148, 84, 92, 0.15)'
                      : '0 4px 20px rgba(0,0,0,0.04)'
                  }}
                >
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={category.image}
                      alt={category.title}
                      className="category-image w-full h-full object-cover"
                    />
                    
                    {/* Simple Overlay on Hover */}
                    <div 
                      className="absolute inset-0 transition-opacity duration-400"
                      style={{
                        background: `rgba(61, 100, 96, 0.3)`,
                        opacity: isHovered ? 1 : 0
                      }}
                    />

                    {/* Minimal Badge */}
                    <div 
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: colors.accent,
                        color: colors.background
                      }}
                    >
                      {category.count}
                    </div>
                  </div>

                  {/* Content - Very Clean */}
                  <div className="category-content p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 
                          className="text-xl font-black mb-1"
                          style={{ color: colors.text }}
                        >
                          {category.title}
                        </h3>
                        <p 
                          className="text-sm"
                          style={{ color: colors.text, opacity: 0.6 }}
                        >
                          {category.description}
                        </p>
                      </div>
                      
                      <Icon 
                        size={24}
                        style={{ 
                          color: colors.secondary,
                          strokeWidth: 2
                        }}
                      />
                    </div>

                    {/* Simple Link */}
                    <div 
                      className="flex items-center gap-2 text-sm font-bold transition-all duration-300"
                      style={{ 
                        color: isHovered ? colors.accent : colors.secondary
                      }}
                    >
                      <span>Shop Now</span>
                      <ArrowRight 
                        size={16}
                        className="transition-transform duration-300"
                        style={{ 
                          strokeWidth: 2.5,
                          transform: isHovered ? 'translateX(4px)' : 'translateX(0)'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Simple Bottom CTA */}
        <div className="text-center mt-12">
          <button 
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: colors.accent,
              color: colors.background,
              border: `2px solid ${colors.border}`,
              boxShadow: '0 8px 24px rgba(148, 84, 92, 0.25)'
            }}
          >
            View All Products
            <ArrowRight 
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
              style={{ strokeWidth: 2.5 }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;