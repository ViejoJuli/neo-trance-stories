import React, { useEffect, useRef } from 'react';
import { useMatrixBackground } from '@/hooks/useMatrixBackground';

interface MatrixBackgroundProps {
  bassFrequency: number;
  contained?: boolean;
}

export const MatrixBackground: React.FC<MatrixBackgroundProps> = ({ bassFrequency, contained = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useMatrixBackground(canvasRef, bassFrequency, contained);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={contained
        ? "absolute inset-0 h-full w-full pointer-events-none"
        : "fixed inset-0 w-screen h-screen pointer-events-none"}
      style={{
        display: 'block',
      }}
    />
  );
};
