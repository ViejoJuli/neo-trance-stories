import { useCallback, useRef, useEffect } from 'react';

const CHARACTERS = '01ｦｧｨｩｪｫｬｭｮｯﾀﾁﾂﾃﾄﾅﾆﾇﾈﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ';
const NEON_GREEN = '#00FF41';
const NEON_YELLOW = '#DFFF00';
const DARK_BG = '#1A1A1A';

interface MatrixChar {
  x: number;
  y: number;
  char: string;
  opacity: number;
  speed: number;
}

export const useMatrixBackground = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  bassFrequency: number
) => {
  const charsRef = useRef<MatrixChar[]>([]);
  const animationIdRef = useRef<number | null>(null);

  const initializeMatrix = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cols = Math.floor(canvas.width / 15);
    charsRef.current = [];

    for (let i = 0; i < cols * 3; i++) {
      charsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        char: CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
        opacity: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 1 + 0.5,
      });
    }
  }, [canvasRef]);

  const drawMatrix = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fondo oscuro
    ctx.fillStyle = DARK_BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Efecto de desvanecimiento (sombra de movimiento)
    ctx.fillStyle = 'rgba(26, 26, 26, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Renderizar caracteres
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';

    const speedMultiplier = 1 + (bassFrequency / 255) * 2;

    charsRef.current.forEach((char) => {
      char.y += char.speed * speedMultiplier;

      // Reiniciar en la parte superior si se sale de la pantalla
      if (char.y > canvas.height) {
        char.y = -20;
        char.char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
      }

      // Alternar entre verde y amarillo basado en la frecuencia
      const color = bassFrequency > 128 ? NEON_YELLOW : NEON_GREEN;
      ctx.fillStyle = color;
      ctx.globalAlpha = char.opacity * (bassFrequency / 255);

      ctx.fillText(char.char, char.x, char.y);
      ctx.globalAlpha = 1;
    });

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
