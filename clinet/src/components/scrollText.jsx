'use client';
import { useEffect, useRef } from 'react';

const GentleWaveSection = () => {
  const canvasRef = useRef(null);

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

    // Wave configuration
    const waves = [
      {
        amplitude: 15,
        frequency: 0.015,
        speed: 0.015,
        opacity: 0.03,
        color: '#cc878e',
        offset: 0
      },
      {
        amplitude: 20,
        frequency: 0.012,
        speed: 0.01,
        opacity: 0.04,
        color: '#ffe3e8',
        offset: 50
      },
      {
        amplitude: 12,
        frequency: 0.018,
        speed: 0.02,
        opacity: 0.025,
        color: '#00c9bb',
        offset: 100
      },
      {
        amplitude: 18,
        frequency: 0.01,
        speed: 0.012,
        opacity: 0.035,
        color: '#94545c',
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
    <div className="relative w-full overflow-hidden" style={{ height: '100px' }}>
      {/* Gradient blend at top */}
      <div 
        className="absolute inset-x-0 top-0 h-8 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, transparent 100%)',
          zIndex: 10
        }}
      />
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />
      
      {/* Gradient blend at bottom */}
      <div 
        className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, #ffe3e8 100%)',
          zIndex: 10
        }}
      />
      
      {/* Optional: Add subtle overlay text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 5 }}>
        <div className="text-center">
          <p 
            className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase"
            style={{ 
              color: '#cc878e',
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