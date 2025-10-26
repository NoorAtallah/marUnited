'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const AnimatedTestimonials = ({ 
  testimonials, 
  autoplay = false,
  className = ""
}) => {
  const [active, setActive] = useState(0);

  const colors = {
    background: '#FFFCFB',     // 60% - Dominant
    secondary: '#3D6460',       // 30% - Secondary
    accent: '#94545C',          // 10% - Accent (Primary CTA)
    border: '#BE6C77',          // Border
    text: '#2C2C2C'             // Text
  };

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className={`max-w-sm md:max-w-4xl lg:max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 ${className}`}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
        {/* Images Stack */}
        <div>
          <div className="relative h-80 md:h-96 lg:h-[480px] w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    draggable={false}
                    className="h-full w-full object-cover object-center"
                    style={{
                      borderRadius: '32px',
                      boxShadow: `0 20px 60px ${colors.accent}30`,
                      border: `2px solid ${colors.border}`
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Content */}
        <div className="flex justify-between flex-col py-2 md:py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 
              className="text-2xl md:text-3xl lg:text-4xl font-black mb-2 md:mb-3"
              style={{ 
                color: colors.text,
                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              {testimonials[active].name}
            </h3>
            <p 
              className="text-sm md:text-base mb-6 md:mb-8 lg:mb-10 font-bold uppercase tracking-wider"
              style={{ color: colors.accent }}
            >
              {testimonials[active].designation}
            </p>
            <motion.p 
              className="text-base md:text-lg lg:text-xl leading-relaxed font-medium" 
              style={{ color: colors.text, opacity: 0.7 }}
            >
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* Navigation */}
          <div className="flex gap-4 pt-8 md:pt-10 lg:pt-0">
            <button
              onClick={handlePrev}
              className="h-12 w-12 md:h-14 md:w-14 rounded-xl flex items-center justify-center group transition-all duration-300 hover:scale-110"
              style={{
                background: colors.secondary,
                border: `2px solid ${colors.border}`,
                boxShadow: `0 8px 24px ${colors.secondary}30`
              }}
            >
              <ArrowLeft 
                size={20}
                className="transition-transform duration-300 group-hover:-translate-x-1"
                style={{ color: colors.background, strokeWidth: 2.5 }}
              />
            </button>
            <button
              onClick={handleNext}
              className="h-12 w-12 md:h-14 md:w-14 rounded-xl flex items-center justify-center group transition-all duration-300 hover:scale-110"
              style={{
                background: colors.accent,
                border: `2px solid ${colors.border}`,
                boxShadow: `0 8px 24px ${colors.accent}30`
              }}
            >
              <ArrowRight 
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: colors.background, strokeWidth: 2.5 }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Testimonials Section Component
const TestimonialsSection = () => {
  const colors = {
    background: '#FFFCFB',     // 60% - Dominant
    secondary: '#3D6460',       // 30% - Secondary
    accent: '#94545C',          // 10% - Accent (Primary CTA)
    border: '#BE6C77',          // Border
    text: '#2C2C2C'             // Text
  };

  const testimonials = [
    {
      quote: "This Dead Sea mud mask completely transformed my skin! After just two weeks, my complexion is clearer and more radiant than ever. I can't believe the difference it's made.",
      name: "Sarah Ahmed",
      designation: "Verified Customer",
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80"
    },
    {
      quote: "I've tried countless body scrubs, but nothing compares to this mineral salt scrub. My skin feels incredibly soft and smooth. It's become an essential part of my weekly routine.",
      name: "Layla Hassan",
      designation: "Beauty Enthusiast",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&q=80"
    },
    {
      quote: "The therapeutic bath salts are pure luxury. After a long day, soaking in these minerals is like having a spa experience at home. My stress melts away every time.",
      name: "Noor Al-Masri",
      designation: "Wellness Blogger",
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80"
    },
    {
      quote: "As someone with sensitive skin, I'm always cautious about new products. These Dead Sea products are gentle yet incredibly effective. My skin has never looked better!",
      name: "Rania Khalil",
      designation: "Skincare Specialist",
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80"
    }
  ];

  return (
    <div 
      className="relative w-full py-12 md:py-16 lg:py-24 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${colors.background} 0%, ${colors.secondary}05 100%)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12 lg:mb-16">
          <div 
            className="inline-block px-4 sm:px-6 py-2 rounded-full mb-4"
            style={{
              background: `${colors.accent}10`,
              border: `1px solid ${colors.accent}30`
            }}
          >
            <span 
              className="text-xs sm:text-sm font-bold uppercase tracking-wider"
              style={{ color: colors.accent }}
            >
              Customer Reviews
            </span>
          </div>
          
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4"
            style={{ 
              color: colors.text,
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            Loved By
            <span style={{ color: colors.accent }}> Thousands</span>
          </h2>
          <p 
            className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto"
            style={{ color: colors.text, opacity: 0.6 }}
          >
            Real stories from real customers who transformed their skincare routine
          </p>
        </div>

        {/* Testimonials */}
        <AnimatedTestimonials 
          testimonials={testimonials}
          autoplay={false}
        />
      </div>
    </div>
  );
};

export default TestimonialsSection;