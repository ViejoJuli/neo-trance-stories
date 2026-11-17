import React, { useEffect, useRef } from 'react';
import { useMatrixBackground } from '@/hooks/useMatrixBackground';

interface MatrixBackgroundProps {
  bassFrequency: number;
}

export const MatrixBackground: React.FC<MatrixBackgroundProps> = ({ bassFrequency }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useMatrixBackground(canvasRef, bassFrequency);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none"
      style={{
        display: 'block',
      }}
    />
  );
};
