'use client';
import { useEffect, useRef } from 'react';

const GentleWaveSection = () => {
  const canvasRef = useRef(null);

  const colors = {
    background: '#FFFCFB',     // 60% - Dominant
    secondary: '#3D6460',       // 30% - Secondary
    accent: '#94545C',          // 10% - Accent (Primary CTA)
    border: '#BE6C77',          // Border
    text: '#2C2C2C'             // Text
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 100;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Wave configuration with new color scheme
    const waves = [
      {
        amplitude: 15,
        frequency: 0.015,
        speed: 0.015,
        opacity: 0.03,
        color: colors.accent, // #94545C
        offset: 0
      },
      {
        amplitude: 20,
        frequency: 0.012,
        speed: 0.01,
        opacity: 0.05,
        color: colors.secondary, // #3D6460
        offset: 50
      },
      {
        amplitude: 12,
        frequency: 0.018,
        speed: 0.02,
        opacity: 0.025,
        color: colors.border, // #BE6C77
        offset: 100
      },
      {
        amplitude: 18,
        frequency: 0.01,
        speed: 0.012,
        opacity: 0.04,
        color: colors.secondary, // #3D6460
        offset: 150
      }
    ];

    const drawWave = (wave, time) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      for (let x = 0; x < canvas.width; x++) {
        const y = 
          canvas.height / 2 + 
          wave.amplitude * Math.sin(x * wave.frequency + time * wave.speed + wave.offset);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      ctx.fillStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      waves.forEach(wave => {
        drawWave(wave, time);
      });

      time += 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '100px', background: colors.background }}>
      {/* Gradient blend at top - blends with categories section */}
      <div 
        className="absolute inset-x-0 top-0 h-8 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, ${colors.background} 0%, transparent 100%)`,
          zIndex: 10
        }}
      />
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />
      
      {/* Gradient blend at bottom - continues the background */}
      <div 
        className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${colors.background} 100%)`,
          zIndex: 10
        }}
      />
      
      {/* Optional: Add subtle overlay text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 5 }}>
        <div className="text-center">
          <p 
            className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase"
            style={{ 
              color: colors.secondary,
              opacity: 0.3
            }}
          >
            Sourced from the Dead Sea
          </p>
        </div>
      </div>
    </div>
  );
};

export default GentleWaveSection;