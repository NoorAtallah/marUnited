'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const colors = {
  background: '#FFFCFB',
  secondary: '#3D6460',
  accent: '#94545C',
  border: '#BE6C77',
  text: '#2C2C2C'
};

const faqData = [
  {
    id: 1,
    question: "What makes Dead Sea minerals special for skincare?",
    answer: "Dead Sea minerals are unique due to their high concentration of magnesium, calcium, potassium, and other essential minerals. These natural elements have been proven to nourish the skin, improve hydration, reduce inflammation, and promote cellular regeneration. Our products harness these ancient healing properties to deliver exceptional skincare results."
  },
  {
    id: 2,
    question: "Are your products suitable for sensitive skin?",
    answer: "Yes! All our products are dermatologically tested and formulated to be gentle on sensitive skin. We use natural Dead Sea minerals and avoid harsh chemicals, parabens, and artificial fragrances. However, we always recommend doing a patch test before using any new skincare product, especially if you have very sensitive skin or known allergies."
  },
  {
    id: 3,
    question: "How long does shipping take?",
    answer: "We offer fast and reliable shipping worldwide. Orders within Jordan typically arrive within 2-3 business days. International shipping usually takes 7-14 business days depending on your location. All orders are tracked, and you'll receive a tracking number via email once your order ships."
  },
  {
    id: 4,
    question: "What is your return and refund policy?",
    answer: "We want you to be completely satisfied with your purchase. If you're not happy with your order, you can return unopened products within 30 days of delivery for a full refund. For opened products, we offer exchanges within 14 days if you're not satisfied with the results. Please contact our customer service team to initiate a return."
  },
  {
    id: 5,
    question: "How should I store my Dead Sea skincare products?",
    answer: "To maintain the quality and effectiveness of your products, store them in a cool, dry place away from direct sunlight. Keep containers tightly closed when not in use. Most of our products have a shelf life of 12-24 months unopened, and 6-12 months after opening. Check individual product packaging for specific storage instructions."
  },
  {
    id: 6,
    question: "Can I use multiple products from your range together?",
    answer: "Absolutely! Our product lines are designed to work synergistically together. We recommend starting with a cleanser, followed by a toner or serum, and finishing with a moisturizer. For best results, you can layer multiple products from our collection. If you need help creating a personalized skincare routine, our team is happy to assist you."
  },
  {
    id: 7,
    question: "Are your products cruelty-free and vegan?",
    answer: "Yes, we are proud to be 100% cruelty-free. We never test on animals and work only with suppliers who share our ethical values. Most of our products are vegan, though some formulations contain naturally-derived ingredients like honey or beeswax. Each product page clearly indicates whether it's vegan-friendly."
  },
  {
    id: 8,
    question: "How often should I use Dead Sea mineral products?",
    answer: "This depends on the specific product and your skin type. Generally, cleansers and moisturizers can be used daily (morning and evening), while masks and scrubs are recommended 2-3 times per week. For intensive treatments, follow the instructions on the product packaging. Start slowly if you're new to Dead Sea products and gradually increase frequency as your skin adjusts."
  }
];

const FAQSection = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div 
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
      style={{ 
        background: colors.background
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
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
              Help Center
            </span>
          </div>
          
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4"
            style={{ color: colors.text }}
          >
            Frequently Asked
            <span style={{ color: colors.accent }}> Questions</span>
          </h2>
          <p 
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: colors.text, opacity: 0.6 }}
          >
            Got questions? We've got answers. Find everything you need to know about our products.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((faq) => (
            <div
              key={faq.id}
              className="overflow-hidden transition-all duration-300"
              style={{
                borderRadius: '20px',
                border: `2px solid ${openId === faq.id ? colors.accent : colors.border}20`,
                background: openId === faq.id 
                  ? `linear-gradient(135deg, ${colors.accent}05 0%, ${colors.secondary}05 100%)` 
                  : colors.background,
                boxShadow: openId === faq.id 
                  ? `0 8px 32px ${colors.accent}15` 
                  : '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between gap-4 text-left transition-all duration-300"
              >
                <span 
                  className="text-base sm:text-lg md:text-xl font-bold pr-4"
                  style={{ 
                    color: openId === faq.id ? colors.accent : colors.text,
                    transition: 'color 0.3s ease'
                  }}
                >
                  {faq.question}
                </span>
                
                {/* Icon */}
                <div 
                  className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: openId === faq.id 
                      ? `linear-gradient(135deg, ${colors.accent} 0%, ${colors.border} 100%)` 
                      : `${colors.secondary}10`,
                    transform: openId === faq.id ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                >
                  {openId === faq.id ? (
                    <Minus size={20} style={{ color: colors.background }} />
                  ) : (
                    <Plus size={20} style={{ color: colors.accent }} />
                  )}
                </div>
              </button>

              {/* Answer */}
              <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                  maxHeight: openId === faq.id ? '500px' : '0',
                  opacity: openId === faq.id ? 1 : 0
                }}
              >
                <div 
                  className="px-6 sm:px-8 pb-5 sm:pb-6 pt-2"
                  style={{
                    borderTop: `1px solid ${colors.border}10`
                  }}
                >
                  <p 
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ 
                      color: colors.text, 
                      opacity: 0.7 
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div 
          className="mt-12 sm:mt-16 rounded-2xl p-6 sm:p-8 md:p-10 text-center"
          style={{
            background: `linear-gradient(135deg, ${colors.secondary}08 0%, ${colors.accent}08 100%)`,
            border: `2px solid ${colors.border}20`
          }}
        >
          <h3 
            className="text-xl sm:text-2xl md:text-3xl font-black mb-3"
            style={{ color: colors.text }}
          >
            Still have questions?
          </h3>
          <p 
            className="text-sm sm:text-base mb-6"
            style={{ color: colors.text, opacity: 0.7 }}
          >
            Can't find the answer you're looking for? Our friendly customer support team is here to help.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.border} 100%)`,
                color: colors.background,
                boxShadow: `0 8px 24px ${colors.accent}30`
              }}
            >
              Contact Support
            </button>
            
            <button
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: colors.background,
                color: colors.accent,
                border: `2px solid ${colors.accent}`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}
            >
              Email Us
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div 
        className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-[0.03] pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)`
        }}
      />
      <div 
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-[0.03] pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colors.secondary} 0%, transparent 70%)`
        }}
      />
    </div>
  );
};

export default FAQSection;