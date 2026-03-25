import React, { useEffect, useRef } from 'react';

export const Starfield = ({ active }) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles.current = [];
      const count = Math.floor((canvas.width * canvas.height) / 4000);
      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.current.push({
          x,
          y,
          originalX: x,
          originalY: y,
          size: Math.random() * 1.5 + 0.5,
          vx: 0,
          vy: 0,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';

      particles.current.forEach((p) => {
        // Drift up
        p.originalY -= 0.2;
        if (p.originalY < 0) {
          p.originalY = canvas.height;
          p.y += canvas.height;
        }

        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          p.vx -= (dx / dist) * force * 0.15;
          p.vy -= (dy / dist) * force * 0.15;
        }

        // Return to original position (smoothly)
        p.vx += (p.originalX - p.x) * 0.005;
        p.vy += (p.originalY - p.y) * 0.005;

        // Friction (higher friction = smoother, less bouncy)
        p.vx *= 0.96;
        p.vy *= 0.96;

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-transparent"
    />
  );
};
