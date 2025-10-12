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

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  // Autoplay removed

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className={`max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-20 ${className}`}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Images Stack */}
        <div>
          <div className="relative h-80 w-full">
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
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Content */}
        <div className="flex justify-between flex-col py-4">
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
              className="text-2xl font-bold mb-2"
              style={{ 
                background: 'linear-gradient(135deg, #1a1a2e 0%, #cbc2d7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {testimonials[active].name}
            </h3>
            <p 
              className="text-sm mb-8"
              style={{ color: '#cbc2d7' }}
            >
              {testimonials[active].designation}
            </p>
            <motion.p className="text-lg leading-relaxed" style={{ color: '#1a1a2e', opacity: 0.8 }}>
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
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-10 w-10 rounded-full flex items-center justify-center group transition-all duration-300 hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, #cbc2d7, #F6F4F7)',
                boxShadow: '0 4px 12px rgba(203,194,215,0.3)'
              }}
            >
              <ArrowLeft 
                size={20}
                className="transition-transform duration-300 group-hover:rotate-12"
                style={{ color: '#1a1a2e' }}
              />
            </button>
            <button
              onClick={handleNext}
              className="h-10 w-10 rounded-full flex items-center justify-center group transition-all duration-300 hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, #cbc2d7, #F6F4F7)',
                boxShadow: '0 4px 12px rgba(203,194,215,0.3)'
              }}
            >
              <ArrowRight 
                size={20}
                className="transition-transform duration-300 group-hover:-rotate-12"
                style={{ color: '#1a1a2e' }}
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
      className="relative w-full py-20 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #F6F4F7 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div 
            className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-4"
            style={{ color: '#cbc2d7' }}
          >
            Customer Reviews
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
            Loved By Thousands
          </h2>
          <p 
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#1a1a2e', opacity: 0.6 }}
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