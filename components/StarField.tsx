"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
  timer: number;
  nextFire: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    }

    function initStars() {
      if (!canvas) return;
      const count = Math.floor((canvas.width * canvas.height) / 6000);
      starsRef.current = Array.from({ length: Math.min(count, 200) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2 + 0.2,
        opacity: Math.random() * 0.3 + 0.05,
        speed: Math.random() * 0.01 + 0.003,
        twinkleSpeed: Math.random() * 0.008 + 0.003,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));

      shootingStarsRef.current = Array.from({ length: 3 }, (_, i) => ({
        x: 0,
        y: 0,
        length: 120 + Math.random() * 80,
        speed: 8 + Math.random() * 4,
        angle: 0.6 + Math.random() * 0.4,
        opacity: 0,
        active: false,
        timer: 0,
        nextFire: 8000 + i * 5000 + Math.random() * 10000,
      }));
    }

    function draw(timestamp: number) {
      if (!canvas || !ctx) return;
      const dt = timestamp - timeRef.current;
      timeRef.current = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      starsRef.current.forEach((star) => {
        const twinkle =
          Math.sin(timestamp * star.twinkleSpeed + star.twinkleOffset) * 0.5 + 0.5;
        const opacity = star.opacity * (0.4 + twinkle * 0.6);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();

        // Very slow drift
        star.y -= star.speed;
        if (star.y < -2) {
          star.y = canvas.height + 2;
          star.x = Math.random() * canvas.width;
        }
      });

      // Draw shooting stars
      shootingStarsRef.current.forEach((ss) => {
        ss.timer += dt;

        if (!ss.active) {
          if (ss.timer >= ss.nextFire) {
            ss.active = true;
            ss.timer = 0;
            ss.x = Math.random() * canvas.width * 0.6 + canvas.width * 0.1;
            ss.y = Math.random() * canvas.height * 0.3;
            ss.opacity = 0;
          }
          return;
        }

        const progress = ss.timer / 1200;
        if (progress > 1) {
          ss.active = false;
          ss.timer = 0;
          ss.nextFire = 12000 + Math.random() * 18000;
          return;
        }

        const eased =
          progress < 0.1
            ? progress / 0.1
            : progress > 0.7
            ? 1 - (progress - 0.7) / 0.3
            : 1;

        ss.opacity = eased * 0.7;
        const x = ss.x + Math.cos(ss.angle) * ss.speed * ss.timer * 0.05;
        const y = ss.y + Math.sin(ss.angle) * ss.speed * ss.timer * 0.05;

        const tailX = x - Math.cos(ss.angle) * ss.length * eased;
        const tailY = y - Math.sin(ss.angle) * ss.length * eased;

        const gradient = ctx.createLinearGradient(tailX, tailY, x, y);
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
        gradient.addColorStop(0.7, `rgba(180, 200, 255, ${ss.opacity * 0.4})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${ss.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.stroke();

        // Glow at head
        const grd = ctx.createRadialGradient(x, y, 0, x, y, 6);
        grd.addColorStop(0, `rgba(200, 220, 255, ${ss.opacity * 0.6})`);
        grd.addColorStop(1, `rgba(200, 220, 255, 0)`);
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    animRef.current = requestAnimationFrame((ts) => {
      timeRef.current = ts;
      animRef.current = requestAnimationFrame(draw);
    });

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
