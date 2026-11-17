import { useCallback, useRef, useEffect } from 'react';

const CHARACTERS = '01ｦｧｨｩｪｫｬｭｮｯﾀﾁﾂﾃﾄﾅﾆﾇﾈﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ';
const NUMBERS = '0123456789';
const NEON_GREEN = '#00FF41';
const NEON_YELLOW = '#DFFF00';
const NEON_CYAN = '#00FFFF';
const NEON_MAGENTA = '#FF00FF';
const DARK_BG = '#1A1A1A';

interface MatrixChar {
  x: number;
  y: number;
  char: string;
  opacity: number;
  speed: number;
  color: string;
  size: number;
  trail: Array<{ y: number; opacity: number }>;
}

interface NumberCascade {
  x: number;
  y: number;
  numbers: string;
  opacity: number;
  speed: number;
}

export const useMatrixBackground = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  bassFrequency: number
) => {
  const charsRef = useRef<MatrixChar[]>([]);
  const cascadesRef = useRef<NumberCascade[]>([]);
  const animationIdRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  const initializeMatrix = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cols = Math.floor(canvas.width / 15);
    charsRef.current = [];
    cascadesRef.current = [];

    // Caracteres katakana
    for (let i = 0; i < cols * 3; i++) {
      charsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        char: CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
        opacity: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 1 + 0.5,
        color: Math.random() > 0.5 ? NEON_GREEN : NEON_YELLOW,
        size: Math.random() > 0.8 ? 20 : 14,
        trail: [],
      });
    }

    // Cascadas de números (efecto Matrix clásico)
    for (let i = 0; i < 5; i++) {
      cascadesRef.current.push({
        x: Math.random() * canvas.width,
        y: 0,
        numbers: Array.from({ length: 15 }, () => NUMBERS[Math.floor(Math.random() * NUMBERS.length)]).join(''),
        opacity: 1,
        speed: Math.random() * 2 + 1,
      });
    }
  }, [canvasRef]);

  const drawMatrix = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    timeRef.current += 1;

    // Fondo oscuro con efecto de barrido (scanlines)
    ctx.fillStyle = DARK_BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Efecto de desvanecimiento (trailing)
    ctx.fillStyle = 'rgba(26, 26, 26, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Scanlines oscuras (efecto CRT)
    ctx.strokeStyle = 'rgba(0, 255, 65, 0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.height; i += 2) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    const speedMultiplier = 1 + (bassFrequency / 255) * 2;

    // Renderizar caracteres principales
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';

    charsRef.current.forEach((char) => {
      char.y += char.speed * speedMultiplier;

      if (char.y > canvas.height) {
        char.y = -20;
        char.char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        char.color = Math.random() > 0.5 ? NEON_GREEN : NEON_YELLOW;
      }

      ctx.fillStyle = char.color;
      ctx.globalAlpha = char.opacity * (bassFrequency / 255) * 0.8;
      ctx.font = `bold ${char.size}px monospace`;

      ctx.fillText(char.char, char.x, char.y);
    });

    // Renderizar cascadas de números (efecto Matrix clásico)
    ctx.font = 'bold 12px monospace';
    cascadesRef.current.forEach((cascade) => {
      cascade.y += cascade.speed * speedMultiplier * 0.5;

      if (cascade.y > canvas.height) {
        cascade.y = -200;
        cascade.x = Math.random() * canvas.width;
        cascade.numbers = Array.from({ length: 15 }, () => NUMBERS[Math.floor(Math.random() * NUMBERS.length)]).join('');
      }

      // Efecto de cascada con degradado de opacidad
      const chars = cascade.numbers.split('');
      chars.forEach((char, idx) => {
        const charY = cascade.y + idx * 20;
        if (charY > 0 && charY < canvas.height) {
          const fadeOpacity = 1 - idx / chars.length;
          
          // Efecto de glitch aleatorio
          if (Math.random() > 0.95) {
            ctx.fillStyle = NEON_MAGENTA;
          } else if (Math.random() > 0.9) {
            ctx.fillStyle = NEON_CYAN;
          } else {
            ctx.fillStyle = NEON_GREEN;
          }

          ctx.globalAlpha = fadeOpacity * (bassFrequency / 255) * 0.9;
          ctx.fillText(char, cascade.x, charY);
        }
      });
    });

    // Efecto de brillo pulsante en bajos
    if (bassFrequency > 150) {
      ctx.fillStyle = `rgba(0, 255, 65, ${(bassFrequency - 150) / 105 * 0.1})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.globalAlpha = 1;
    animationIdRef.current = requestAnimationFrame(drawMatrix);
  }, [bassFrequency]);

  useEffect(() => {
    initializeMatrix();
  }, [initializeMatrix, canvasRef]);

  useEffect(() => {
    animationIdRef.current = requestAnimationFrame(drawMatrix);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [drawMatrix]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeMatrix();
  }, [initializeMatrix]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);
};
