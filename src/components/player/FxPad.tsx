import React, { useState } from 'react';
import { Zap } from 'lucide-react';

interface FxPadProps {
  audioContext: AudioContext | null;
  isPlaying: boolean;
  source: MediaElementAudioSourceNode | null;
}

const FX_BUTTONS = [
  { id: 'bass', label: 'BASS+', color: '#FF0080' },
  { id: 'filter', label: 'FILTER', color: '#00FFFF' },
  { id: 'reverb', label: 'REVERB', color: '#FFFF00' },
  { id: 'glitch', label: 'GLITCH', color: '#FF6600' },
];

export const FxPad: React.FC<FxPadProps> = ({ audioContext, isPlaying, source }) => {
  const [activeFx, setActiveFx] = useState<string | null>(null);
  const nodesRef = React.useRef<Map<string, BiquadFilterNode>>(new Map());

  const triggerFx = (fxId: string) => {
    if (!audioContext || !source) return;

    setActiveFx(fxId);
    setTimeout(() => setActiveFx(null), 150);

    switch (fxId) {
      case 'bass': {
        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowshelf';
        filter.frequency.value = 100;
        filter.gain.value = 15;
        source.connect(filter);
        filter.connect(audioContext.destination);
        setTimeout(() => {
          filter.gain.setTargetAtTime(0, audioContext.currentTime, 0.3);
        }, 300);
        break;
      }

      case 'filter': {
        const filter = audioContext.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(5000, audioContext.currentTime);
        filter.frequency.exponentialRampToValueAtTime(
          200,
          audioContext.currentTime + 1
        );
        source.connect(filter);
        filter.connect(audioContext.destination);
        break;
      }

      case 'reverb': {
        // Simulación simple de reverb con delay
        const dryGain = audioContext.createGain();
        const wetGain = audioContext.createGain();
        const delay = audioContext.createDelay();

        delay.delayTime.value = 0.3;
        wetGain.gain.value = 0.5;
        dryGain.gain.value = 1;

        source.connect(dryGain);
        source.connect(delay);
        delay.connect(wetGain);

        dryGain.connect(audioContext.destination);
        wetGain.connect(audioContext.destination);
        break;
      }

      case 'glitch': {
        const gain = audioContext.createGain();
        gain.gain.value = 1;

        source.connect(gain);
        gain.connect(audioContext.destination);

        // Efecto glitch de ducking
        for (let i = 0; i < 8; i++) {
          setTimeout(() => {
            gain.gain.setValueAtTime(Math.random() * 0.5, audioContext.currentTime);
            gain.gain.setValueAtTime(1, audioContext.currentTime + 0.05);
          }, i * 50);
        }
        break;
      }
    }
  };

  return (
    <div className="border border-[#00FF41] p-3 bg-[#0D0D0D]">
      <div className="text-xs tracking-widest uppercase mb-3">» FX Sampler</div>
      <div className="grid grid-cols-4 gap-2">
        {FX_BUTTONS.map((fx) => (
          <button
            key={fx.id}
            onClick={() => triggerFx(fx.id)}
            disabled={!isPlaying}
            className={`p-3 border-2 font-mono text-xs tracking-widest transition-all transform ${
              activeFx === fx.id ? 'scale-95' : ''
            } ${
              isPlaying
                ? 'hover:scale-105 cursor-pointer'
                : 'opacity-50 cursor-not-allowed'
            }`}
            style={{
              borderColor: fx.color,
              color: fx.color,
              backgroundColor: activeFx === fx.id ? fx.color : '#1A1A1A',
              boxShadow: activeFx === fx.id ? `0 0 15px ${fx.color}` : 'none',
            }}
          >
            <Zap size={12} className="inline mr-1" />
            {fx.label}
          </button>
        ))}
      </div>
    </div>
  );
};
