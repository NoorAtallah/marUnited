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
    const image = card.querySelector('.product-image');
    const content = card.querySelector('.product-content');

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
    const image = card.querySelector('.product-image');
    const content = card.querySelector('.product-content');

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

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  return (
    <div 
      className="relative w-full py-20 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F6F4F7 0%, #ffffff 50%, #F6F4F7 100%)'
      }}
    >
      {/* Floating decoration */}
      <Sparkles 
        className="absolute opacity-5"
        size={100}
        style={{
          top: '10%',
          right: '10%',
          color: '#cbc2d7',
          animation: 'float 10s ease-in-out infinite'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div 
            className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-4"
            style={{ color: '#cbc2d7' }}
          >
            Featured Products
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
            Our Best Sellers
          </h2>
          <p 
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#1a1a2e', opacity: 0.6 }}
          >
            Handpicked products loved by thousands. Premium quality, authentic Dead Sea minerals.
          </p>
        </div>

        {/* Products Grid */}
        <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                      className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm"
                      style={{
                        background: 'rgba(203,194,215,0.9)',
                        color: '#1a1a2e'
                      }}
                    >
                      {product.badge}
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300"
                      style={{
                        background: isFavorite ? '#cbc2d7' : 'rgba(255,255,255,0.9)',
                        transform: isFavorite ? 'scale(1.1)' : 'scale(1)'
                      }}
                    >
                      <Heart 
                        size={18}
                        style={{ 
                          color: isFavorite ? '#1a1a2e' : '#cbc2d7',
                          fill: isFavorite ? '#1a1a2e' : 'none',
                          strokeWidth: 2
                        }}
                      />
                    </button>

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
                        Quick View
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="product-content p-5">
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            size={14}
                            style={{ 
                              color: i < Math.floor(product.rating) ? '#FFD700' : '#e5e5e5',
                              fill: i < Math.floor(product.rating) ? '#FFD700' : 'none'
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium" style={{ color: '#1a1a2e', opacity: 0.6 }}>
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Title */}
                    <div className="mb-3">
                      <div 
                        className="text-xs font-bold tracking-wider uppercase mb-1"
                        style={{ color: '#cbc2d7' }}
                      >
                        {product.subtitle}
                      </div>
                      <h3 
                        className="text-lg font-black leading-tight"
                        style={{ color: '#1a1a2e' }}
                      >
                        {product.name}
                      </h3>
                    </div>

                    {/* Benefits Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.benefits.slice(0, 2).map((benefit, i) => (
                        <span 
                          key={i}
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            background: 'rgba(203,194,215,0.1)',
                            color: '#1a1a2e',
                            opacity: 0.7
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
                            className="text-2xl font-black"
                            style={{ 
                              background: 'linear-gradient(135deg, #1a1a2e, #cbc2d7)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text'
                            }}
                          >
                            {product.price} JD
                          </span>
                          <span 
                            className="text-sm line-through"
                            style={{ color: '#1a1a2e', opacity: 0.4 }}
                          >
                            {product.originalPrice}
                          </span>
                        </div>
                      </div>

                      <button 
                        className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-400"
                        style={{
                          background: isHovered 
                            ? 'linear-gradient(135deg, #cbc2d7, #F6F4F7)'
                            : 'rgba(203,194,215,0.1)',
                          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                        }}
                      >
                        <ShoppingCart 
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
              background: 'linear-gradient(135deg, #1a1a2e, #2d2d4a)',
              color: '#F6F4F7',
              boxShadow: '0 20px 40px rgba(26,26,46,0.3)'
            }}
          >
            View All Products
            <ArrowRight 
              size={20}
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