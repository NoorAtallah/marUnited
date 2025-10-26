'use client';

import { useState } from 'react';

const colors = {
  background: '#FFFCFB',
  secondary: '#3D6460',
  accent: '#94545C',
  border: '#BE6C77',
  text: '#2C2C2C'
};

const featuredProducts = [
  {
    id: 1,
    name: "Dead Sea Mud Mask",
    category: "Face",
    description: "Purify and detoxify with mineral-rich mud that reveals your natural glow",
    price: "39.99 JD",
    originalPrice: "47.99 JD",
    rating: 4.8,
    reviews: 2847,
    badge: "Bestseller",
    image: "https://m.media-amazon.com/images/I/61Zpk51IbXS._UF1000,1000_QL80_.jpg",
    benefits: ["Deep Cleansing", "Pore Refining", "Natural Glow"]
  },
  {
    id: 2,
    name: "Mineral Salt Scrub",
    category: "Body",
    description: "Gentle exfoliation with pure Dead Sea salts for smoother, radiant skin",
    price: "34.99 JD",
    originalPrice: "41.99 JD",
    rating: 4.9,
    reviews: 3521,
    badge: "New Arrival",
    image: "https://laline.ca/cdn/shop/products/M71400052199_4.jpg?v=1668002220",
    benefits: ["Exfoliates", "Energizing", "Smooth Skin"]
  },
  {
    id: 3,
    name: "Nourishing Body Cream",
    category: "Body",
    description: "Deep hydration enriched with Dead Sea minerals for silky smooth skin",
    price: "44.99 JD",
    originalPrice: "52.99 JD",
    rating: 4.7,
    reviews: 1893,
    badge: "Staff Pick",
    image: "https://i.makeupstore.co.il/a/ag/agz7dua8qtja.jpg",
    benefits: ["24h Moisture", "Fast Absorbing", "Vitamin Rich"]
  },
  {
    id: 4,
    name: "Therapeutic Bath Salts",
    category: "Body",
    description: "Transform your bath into a luxurious spa with authentic minerals",
    price: "29.99 JD",
    originalPrice: "35.99 JD",
    rating: 4.9,
    reviews: 4102,
    badge: "Top Rated",
    image: "https://bathsalt.co.uk/wp-content/uploads/2021/04/DSLR05.jpg",
    benefits: ["Muscle Relief", "Stress Relief", "Skin Softening"]
  }
];

const FeaturedProducts = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div 
      className="py-24 px-6"
      style={{ 
        background: `linear-gradient(180deg, ${colors.background} 0%, ${colors.secondary}05 100%)`
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-4"
            style={{
              background: `${colors.accent}10`,
              border: `1px solid ${colors.accent}30`
            }}
          >
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: colors.accent }}
            />
            <span 
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: colors.accent }}
            >
              Featured Collection
            </span>
          </div>
          
          <h2 
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6"
            style={{ color: colors.text }}
          >
            Best Sellers
          </h2>
          
          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: colors.text, opacity: 0.6 }}
          >
            Discover our most loved products, handpicked for their transformative results
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative overflow-hidden transition-all duration-500"
              style={{
                background: colors.background,
                borderRadius: '32px',
                border: `2px solid ${hoveredId === product.id ? colors.accent : colors.border}15`,
                boxShadow: hoveredId === product.id 
                  ? `0 25px 60px ${colors.accent}20` 
                  : `0 8px 24px ${colors.secondary}08`,
                transform: hoveredId === product.id ? 'translateY(-8px)' : 'translateY(0)'
              }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden" style={{ borderRadius: '32px 32px 0 0' }}>
                <div 
                  className="aspect-square overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${colors.secondary}08 0%, ${colors.accent}08 100%)`
                  }}
                >
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700"
                    style={{
                      transform: hoveredId === product.id ? 'scale(1.1)' : 'scale(1)'
                    }}
                  />
                </div>

                {/* Badge */}
                <div 
                  className="absolute top-4 right-4 px-4 py-2 rounded-full backdrop-blur-md"
                  style={{
                    background: `${colors.background}95`,
                    border: `1px solid ${colors.accent}30`,
                    boxShadow: `0 4px 12px ${colors.secondary}20`
                  }}
                >
                  <span 
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: colors.accent }}
                  >
                    {product.badge}
                  </span>
                </div>

                {/* Quick Add Button - Shows on Hover */}
                <div 
                  className="absolute bottom-4 left-4 right-4 transition-all duration-500"
                  style={{
                    opacity: hoveredId === product.id ? 1 : 0,
                    transform: hoveredId === product.id ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  <button
                    className="w-full py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.border} 100%)`,
                      color: colors.background,
                      boxShadow: `0 8px 24px ${colors.accent}40`
                    }}
                  >
                    Quick Add
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <div 
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: colors.secondary, opacity: 0.6 }}
                >
                  {product.category}
                </div>

                {/* Product Name */}
                <h3 
                  className="text-xl font-black mb-2 leading-tight"
                  style={{ color: colors.text }}
                >
                  {product.name}
                </h3>

                {/* Description */}
                <p 
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: colors.text, opacity: 0.65 }}
                >
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill={i < Math.floor(product.rating) ? colors.accent : `${colors.border}20`}
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <span 
                    className="text-xs font-semibold"
                    style={{ color: colors.text, opacity: 0.5 }}
                  >
                    {product.rating} ({product.reviews.toLocaleString()})
                  </span>
                </div>

                {/* Benefits */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.benefits.slice(0, 2).map((benefit, i) => (
                    <div 
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: `${colors.secondary}08`,
                        color: colors.secondary,
                        border: `1px solid ${colors.border}20`
                      }}
                    >
                      {benefit}
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span 
                    className="text-2xl font-black"
                    style={{ color: colors.accent }}
                  >
                    {product.price}
                  </span>
                  <span 
                    className="text-sm line-through"
                    style={{ color: colors.text, opacity: 0.4 }}
                  >
                    {product.originalPrice}
                  </span>
                </div>
              </div>

              {/* Decorative Corner */}
              <div 
                className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at bottom right, ${colors.accent}08 0%, transparent 70%)`,
                  opacity: hoveredId === product.id ? 1 : 0
                }}
              />
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <button
            className="inline-flex items-center gap-3 px-12 py-5 rounded-full font-bold text-base uppercase tracking-wide transition-all hover:scale-105 active:scale-95 group"
            style={{
              background: colors.background,
              color: colors.accent,
              border: `2px solid ${colors.accent}`,
              boxShadow: `0 8px 24px ${colors.accent}15`
            }}
          >
            View All Products
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
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;