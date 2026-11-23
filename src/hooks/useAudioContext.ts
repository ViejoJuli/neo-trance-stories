import { useEffect, useRef, useState } from 'react';

export const useAudioContext = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    const initAudioContext = () => {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyserNode = audioCtx.createAnalyser();
      analyserNode.fftSize = 256;
      analyserNode.connect(audioCtx.destination);

      setAudioContext(audioCtx);
      setAnalyser(analyserNode);
      dataArrayRef.current = new Uint8Array(analyserNode.frequencyBinCount);
    };

    if (!audioContext) {
      initAudioContext();
    }
  }, [audioContext]);

  const getFrequencyData = (): number[] => {
    if (!analyser || !dataArrayRef.current) return [];
    analyser.getByteFrequencyData(dataArrayRef.current as Uint8Array<ArrayBuffer>);
    return Array.from(dataArrayRef.current);
  };

  const getBassFrequency = (): number => {
    const data = getFrequencyData();
    if (data.length === 0) return 0;
    return data.slice(0, 5).reduce((a, b) => a + b, 0) / 5;
  };

  return {
    audioContext,
    analyser,
    isPlaying,
    setIsPlaying,
    getFrequencyData,
    getBassFrequency,
  };
};
