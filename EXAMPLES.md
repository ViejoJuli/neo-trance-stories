/**
 * EJEMPLOS DE EXTENSIÓN - Neo Trance Stories
 *
 * Este archivo contiene ejemplos de cómo agregar nuevas funcionalidades
 * al portafolio interactivo.
 */

/**
 * EJEMPLO 1: Agregar Nueva Ventana de Contenido
 * ============================================
 */

// 1a. Actualizar tipo en src/types/index.ts
export interface WindowState {
  // ... campos existentes ...
  contentType: 'player' | 'bio' | 'sets' | 'contact' | 'gallery'; // ← NUEVO
}

// 1b. Crear componente en src/pages/InteractivePortfolio.tsx
const GalleryContent: React.FC = () => (
  <div className="p-4 h-full text-[#00FF41] font-mono text-xs overflow-y-auto bg-[#1A1A1A]">
    <div className="text-[#DFFF00] mb-3">[ GALERÍA DE ARTWORK ]</div>
    <div className="grid grid-cols-2 gap-2">
      {/* Galería de imágenes aquí */}
      <div className="border border-[#00FF41] aspect-square bg-[#0D0D0D] flex items-center justify-center">
        <span className="text-xs opacity-50">[ARTWORK_1]</span>
      </div>
    </div>
  </div>
);

// 1c. Agregar caso en renderWindowContent()
const renderWindowContent = (window: WindowState): React.ReactNode => {
  switch (window.contentType) {
    case 'gallery':
      return <GalleryContent />;
    // ... resto de casos ...
  }
};

/**
 * EJEMPLO 2: Crear Efecto de Audio Personalizado
 * ============================================
 */

// En src/components/player/FxPad.tsx, agregar a la función triggerFx():
case 'flanger': {
  const dryGain = audioContext.createGain();
  const wetGain = audioContext.createGain();
  const lfo = audioContext.createOscillator();
  const lfoGain = audioContext.createGain();
  const delay = audioContext.createDelay();

  lfo.frequency.value = 1; // Oscilación de 1Hz
  lfoGain.gain.value = 0.001; // Profundidad del efecto
  delay.delayTime.value = 0.01; // Delay inicial

  lfo.connect(lfoGain);
  lfoGain.connect(delay.delayTime);

  source.connect(dryGain);
  source.connect(delay);
  delay.connect(wetGain);

  dryGain.connect(audioContext.destination);
  wetGain.connect(audioContext.destination);

  lfo.start();
  setTimeout(() => lfo.stop(), 2000);
  break;
}

/**
 * EJEMPLO 3: Visualizador Espectral Avanzado
 * ==========================================
 */

// Crear src/components/audio-reactive/SpectrumVisualizer.tsx
import React, { useEffect, useRef } from 'react';

interface SpectrumVisualizerProps {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
}

export const SpectrumVisualizer: React.FC<SpectrumVisualizerProps> = ({
  analyser,
  isPlaying,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    if (!analyser) return;

    analyser.fftSize = 512;
    const bufferLength = analyser.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(bufferLength);

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx || !dataArrayRef.current) return;

      analyser.getByteFrequencyData(dataArrayRef.current);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      ctx.fillStyle = '#1A1A1A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      dataArrayRef.current.forEach((value) => {
        const barHeight = (value / 255) * canvas.height;

        // Gradiente de colores por altura
        const hue = (barHeight / canvas.height) * 120;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      });

      if (isPlaying) {
        animationIdRef.current = requestAnimationFrame(draw);
      }
    };

    if (isPlaying) {
      animationIdRef.current = requestAnimationFrame(draw);
    }

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [analyser, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={120}
      className="bg-[#0D0D0D] border border-[#00FF41]"
      style={{
        boxShadow: '0 0 10px rgba(0, 255, 65, 0.2)',
      }}
    />
  );
};

/**
 * EJEMPLO 4: Integración con API de Tracks
 * ========================================
 */

// En src/components/player/TrackPlayer.tsx
interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover?: string; // Nueva propiedad
  duration: number;
  bpm?: number;
}

// Hook para cargar tracks de API
const useTracks = () => {
  const [tracks, setTracks] = React.useState<Track[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTracks = async () => {
      try {
        // Ejemplo: Cargar desde API
        const response = await fetch('/api/tracks');
        const data = await response.json();
        setTracks(data);
      } catch (error) {
        console.error('Error loading tracks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  return { tracks, loading };
};

/**
 * EJEMPLO 5: Hook Custom para Detectar Géneros Musicales
 * ======================================================
 */

// Crear src/hooks/useMusicAnalysis.ts
export const useMusicAnalysis = (analyser: AnalyserNode | null) => {
  const getGenreIndicators = React.useCallback(() => {
    if (!analyser) return null;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    const bass = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
    const mids = dataArray.slice(10, 50).reduce((a, b) => a + b, 0) / 40;
    const treble = dataArray.slice(50, 100).reduce((a, b) => a + b, 0) / 50;

    return {
      bass,
      mids,
      treble,
      isBassHeavy: bass > 150,
      isTechno: bass > 120 && mids > 100,
      isTrance: treble > 100 && mids > 80,
    };
  }, [analyser]);

  return { getGenreIndicators };
};

/**
 * EJEMPLO 6: Animaciones Personalizadas CSS
 * ==========================================
 */

// Agregar a src/styles/cyberpunk.css
export const CSS_ANIMATIONS = `
  @keyframes pulse-neon {
    0% {
      box-shadow: 0 0 10px #00FF41, 0 0 20px #00FF41;
    }
    50% {
      box-shadow: 0 0 20px #00FF41, 0 0 40px #00FF41;
    }
    100% {
      box-shadow: 0 0 10px #00FF41, 0 0 20px #00FF41;
    }
  }

  @keyframes scan-lines {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(10px);
    }
  }

  .pulse-neon {
    animation: pulse-neon 1.5s infinite;
  }

  .scan-lines {
    animation: scan-lines 0.15s linear infinite;
  }
`;

/**
 * EJEMPLO 7: Almacenamiento de Estado en localStorage
 * ==================================================
 */

// Hook para persistencia
export const usePersistedState = <T,>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [state, setState] = React.useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });

  const setValue = React.useCallback(
    (value: T) => {
      try {
        setState(value);
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Error writing to localStorage:', error);
      }
    },
    []
  );

  return [state, setValue];
};

// Uso en InteractivePortfolio:
// const [windowPositions, setWindowPositions] = usePersistedState('windowPos', {});

/**
 * EJEMPLO 8: Integración con Supabase para Tracks
 * ==============================================
 */

import { supabase } from '@/integrations/supabase/client';

export const useSupabaseTracks = () => {
  const [tracks, setTracks] = React.useState<Track[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTracks = async () => {
      try {
        const { data, error } = await supabase
          .from('tracks')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTracks(data as Track[]);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  return { tracks, loading };
};

/**
 * EJEMPLO 9: Responsive Breakpoints (Futuro Mobile)
 * ================================================
 */

// Hook para detectar viewport
export const useViewport = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile };
};

/**
 * EJEMPLO 10: Keyboard Shortcuts
 * ==============================
 */

export const useKeyboardShortcuts = (shortcuts: Record<string, () => void>) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = `${e.ctrlKey ? 'ctrl+' : ''}${e.key.toLowerCase()}`;
      if (shortcuts[key]) {
        e.preventDefault();
        shortcuts[key]();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};

// Uso:
// useKeyboardShortcuts({
//   'ctrl+p': () => createWindow('player'),
//   'ctrl+b': () => createWindow('bio'),
// });

/**
 * FIN DE EJEMPLOS
 *
 * Para más ejemplos, visita:
 * - README.md
 * - DEVELOPMENT.md
 * - QUICKSTART.md
 */
