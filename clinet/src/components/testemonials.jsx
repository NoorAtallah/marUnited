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
    <div className={`max-w-sm md:max-w-3xl lg:max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 ${className}`}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
        {/* Images Stack */}
        <div>
          <div className="relative h-64 md:h-80 lg:h-96 w-full">
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
                    className="h-full w-full rounded-2xl object-cover object-center"
                    style={{
                      boxShadow: `0 15px 35px rgba(148, 84, 92, 0.3)`,
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
              className="text-xl md:text-2xl lg:text-3xl font-black mb-1 md:mb-2"
              style={{ 
                color: colors.text
              }}
            >
              {testimonials[active].name}
            </h3>
            <p 
              className="text-xs md:text-sm mb-4 md:mb-6 lg:mb-8 font-medium"
              style={{ color: colors.accent }}
            >
              {testimonials[active].designation}
            </p>
            <motion.p 
              className="text-sm md:text-base lg:text-lg leading-relaxed" 
              style={{ color: colors.text, opacity: 0.85 }}
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

          {/* Navigation - NO gradients */}
          <div className="flex gap-3 pt-8 md:pt-10 lg:pt-0">
            <button
              onClick={handlePrev}
              className="h-9 w-9 md:h-10 md:w-10 rounded-full flex items-center justify-center group transition-all duration-300 hover:scale-110"
              style={{
                background: colors.secondary,
                border: `2px solid ${colors.border}`,
                boxShadow: `0 4px 12px rgba(61, 100, 96, 0.3)`
              }}
            >
              <ArrowLeft 
                size={18}
                className="transition-transform duration-300 group-hover:-translate-x-1"
                style={{ color: colors.background, strokeWidth: 2.5 }}
              />
            </button>
            <button
              onClick={handleNext}
              className="h-9 w-9 md:h-10 md:w-10 rounded-full flex items-center justify-center group transition-all duration-300 hover:scale-110"
              style={{
                background: colors.accent,
                border: `2px solid ${colors.border}`,
                boxShadow: `0 4px 12px rgba(148, 84, 92, 0.3)`
              }}
            >
              <ArrowRight 
                size={18}
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
      className="relative w-full py-12 md:py-16 lg:py-20 overflow-hidden"
      style={{
        background: colors.background
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <div 
            className="text-xs font-bold tracking-[0.25em] uppercase mb-2"
            style={{ color: colors.accent }}
          >
            Customer Reviews
          </div>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 leading-tight"
            style={{ 
              color: colors.text
            }}
          >
            Loved By Thousands
          </h2>
          <p 
            className="text-sm md:text-base max-w-xl mx-auto leading-relaxed px-4"
            style={{ color: colors.text, opacity: 0.7 }}
          >
            Real stories from real customers who transformed their skincare routine with our Dead Sea products
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