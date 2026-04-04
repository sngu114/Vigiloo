"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export default function HackerBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark" || resolvedTheme === "dark";

  useEffect(() => {
    if (!mounted || !isDark) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const drops = new Array(columns).fill(0).map(() => Math.random() * -100);
    const chars = "VIGILOO01SECURITY7384";
    
    let animationFrameId: number;
    let lastTime = 0;
    const fps = 8; 

    const render = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(render);

      const delta = timestamp - lastTime;
      if (delta < 1000 / fps) return;
      lastTime = timestamp;

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; 
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#00FF00"; 
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        ctx.fillText(text, x, y * fontSize);

        if (y * fontSize > height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      });
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    animationFrameId = requestAnimationFrame(render);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted, isDark]);

  if (!mounted || !isDark) return null;

  return (
    <canvas
      ref={canvasRef}
      id="hacker-canvas"
      className="opacity-30"
      aria-hidden="true"
    />
  );
}