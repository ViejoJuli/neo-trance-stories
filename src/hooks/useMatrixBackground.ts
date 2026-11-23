import { useEffect, useRef } from "react";

const NUMBERS = "0123456789";
const FONT_SIZE = 16;
const COLUMN_WIDTH = 28;
const TRAIL_LENGTH = 12;

interface Cascade {
  x: number;
  y: number;
  speed: number;
  digits: string[];
}

export const useMatrixBackground = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  bassFrequency: number,
  transparent = false
) => {
  const bassRef = useRef(bassFrequency);
  bassRef.current = bassFrequency;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cascades: Cascade[] = [];
    let width = 0;
    let height = 0;
    let animationId = 0;
    let previousTime = 0;

    const randomDigit = () => NUMBERS[Math.floor(Math.random() * NUMBERS.length)];

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      cascades = Array.from({ length: Math.ceil(width / COLUMN_WIDTH) }, (_, index) => ({
        x: index * COLUMN_WIDTH + COLUMN_WIDTH / 2,
        y: Math.random() * (height + TRAIL_LENGTH * FONT_SIZE),
        speed: 35 + Math.random() * 45,
        digits: Array.from({ length: TRAIL_LENGTH }, randomDigit),
      }));
      draw(0);
    };

    const draw = (elapsed: number) => {
      context.clearRect(0, 0, width, height);
      if (!transparent) {
        context.fillStyle = "#1A1A1A";
        context.fillRect(0, 0, width, height);
      }

      context.font = `bold ${FONT_SIZE}px monospace`;
      context.textAlign = "center";
      const intensity = Math.min(Math.max(bassRef.current / 255, 0), 1);

      cascades.forEach((cascade) => {
        cascade.y += cascade.speed * elapsed * (1 + intensity);
        if (cascade.y - TRAIL_LENGTH * FONT_SIZE > height) {
          cascade.y = 0;
          cascade.digits = cascade.digits.map(randomDigit);
        }

        cascade.digits.forEach((digit, index) => {
          const y = cascade.y - index * FONT_SIZE;
          if (y < 0 || y > height) return;
          context.fillStyle = index === 0 ? "#DFFF9A" : "#00FF41";
          context.globalAlpha = (1 - index / TRAIL_LENGTH) * (0.55 + intensity * 0.3);
          context.fillText(digit, cascade.x, y);
        });
      });
      context.globalAlpha = 1;
    };

    const animate = (time: number) => {
      const elapsed = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      draw(elapsed);
      animationId = window.requestAnimationFrame(animate);
    };

    const updateMotion = () => {
      window.cancelAnimationFrame(animationId);
      previousTime = 0;
      if (!motionPreference.matches) {
        animationId = window.requestAnimationFrame(animate);
      } else {
        draw(0);
      }
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    motionPreference.addEventListener("change", updateMotion);
    updateMotion();

    return () => {
      window.cancelAnimationFrame(animationId);
      observer.disconnect();
      motionPreference.removeEventListener("change", updateMotion);
    };
  }, [canvasRef, transparent]);
};
