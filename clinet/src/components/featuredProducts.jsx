'use client';
import { useState, useRef, useEffect } from 'react';
import { Star, ShoppingCart, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FeaturedProducts = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);

  const products = [
    {
      id: 1,
      name: "Dead Sea Mud Mask",
      subtitle: "Deep Cleansing",
      price: "39.99",
      originalPrice: "49.99",
      rating: 4.8,
      reviews: 2847,
      image: "https://m.media-amazon.com/images/I/61Zpk51IbXS._UF1000,1000_QL80_.jpg",
      badge: "Best Seller",
      benefits: ["100% Natural", "Anti-Aging", "Purifying"]
    },
    {
      id: 2,
      name: "Mineral Salt Scrub",
      subtitle: "Exfoliate & Renew",
      price: "34.99",
      originalPrice: "44.99",
      rating: 4.9,
      reviews: 3521,
      image: "https://laline.ca/cdn/shop/products/M71400052199_4.jpg?v=1668002220",
      badge: "Top Rated",
      benefits: ["Removes Dead Skin", "Energizing", "Softening"]
    },
    {
      id: 3,
      name: "Nourishing Body Cream",
      subtitle: "24h Moisture",
      price: "44.99",
      originalPrice: "54.99",
      rating: 4.7,
      reviews: 1893,
      image: "https://i.makeupstore.co.il/a/ag/agz7dua8qtja.jpg",
      badge: "New",
      benefits: ["Vitamin Rich", "Fast Absorbing", "Hydrating"]
    },
    {
      id: 4,
      name: "Therapeutic Bath Salts",
      subtitle: "Relax & Restore",
      price: "29.99",
      originalPrice: "39.99",
      rating: 4.9,
      reviews: 4102,
      image: "https://bathsalt.co.uk/wp-content/uploads/2021/04/DSLR05.jpg",
      badge: "Popular",
      benefits: ["Muscle Relief", "Stress Relief", "Pure Minerals"]
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    const image = card.querySelector('.product-image');
    const content = card.querySelector('.product-content');

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
    const image = card.querySelector('.product-image');
    const content = card.querySelector('.product-content');

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

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  return (
    <div 
      className="relative w-full py-12 md:py-16 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #ffe3e8 0%, #ffffff 50%, #ffe3e8 100%)'
      }}
    >
      {/* Floating decoration */}
      <Sparkles 
        className="absolute opacity-5"
        size={80}
        style={{
          top: '10%',
          right: '10%',
          color: '#cc878e',
          animation: 'float 10s ease-in-out infinite'
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <div 
            className="text-xs font-bold tracking-[0.25em] uppercase mb-2"
            style={{ color: '#cc878e' }}
          >
            Featured Products
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
            Our Best Sellers
          </h2>
          <p 
            className="text-sm md:text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: '#94545c', opacity: 0.7 }}
          >
            Handpicked products loved by thousands. Premium quality, authentic Dead Sea minerals.
          </p>
        </div>

        {/* Products Grid */}
        <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {products.map((product, idx) => {
            const isHovered = hoveredIndex === idx;
            const isFavorite = favorites.includes(product.id);
            
            return (
              <div
                key={product.id}
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
                      src={product.image}
                      alt={product.name}
                      className="product-image w-full h-full object-cover"
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
                      {product.badge}
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300"
                      style={{
                        background: isFavorite ? '#cc878e' : 'rgba(255,255,255,0.9)',
                        transform: isFavorite ? 'scale(1.1)' : 'scale(1)'
                      }}
                    >
                      <Heart 
                        size={14}
                        style={{ 
                          color: isFavorite ? '#ffffff' : '#cc878e',
                          fill: isFavorite ? '#ffffff' : 'none',
                          strokeWidth: 2.5
                        }}
                      />
                    </button>

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
                        Quick View
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="product-content p-4">
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            size={12}
                            style={{ 
                              color: i < Math.floor(product.rating) ? '#FFD700' : '#e5e5e5',
                              fill: i < Math.floor(product.rating) ? '#FFD700' : 'none'
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium" style={{ color: '#94545c', opacity: 0.6 }}>
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Title */}
                    <div className="mb-2">
                      <div 
                        className="text-xs font-bold tracking-wider uppercase mb-0.5"
                        style={{ color: '#cc878e' }}
                      >
                        {product.subtitle}
                      </div>
                      <h3 
                        className="text-base font-black leading-tight"
                        style={{ color: '#94545c' }}
                      >
                        {product.name}
                      </h3>
                    </div>

                    {/* Benefits Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {product.benefits.slice(0, 2).map((benefit, i) => (
                        <span 
                          key={i}
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            background: 'rgba(204,135,142,0.1)',
                            color: '#94545c',
                            opacity: 0.8
                          }}
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span 
                            className="text-xl font-black"
                            style={{ 
                              background: 'linear-gradient(135deg, #94545c, #cc878e)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text'
                            }}
                          >
                            {product.price} JD
                          </span>
                          <span 
                            className="text-xs line-through"
                            style={{ color: '#94545c', opacity: 0.4 }}
                          >
                            {product.originalPrice}
                          </span>
                        </div>
                      </div>

                      <button 
                        className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-400"
                        style={{
                          background: isHovered 
                            ? '#00c9bb'
                            : 'rgba(204,135,142,0.1)',
                          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                        }}
                      >
                        <ShoppingCart 
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
            View All Products
            <ArrowRight 
              size={18}
              className="transition-transform duration-500 group-hover:translate-x-2"
            />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          50% { 
            transform: translateY(-20px) rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturedProducts;