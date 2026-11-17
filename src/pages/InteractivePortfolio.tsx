import React, { useMemo } from 'react';
import { MatrixBackground } from '@/components/audio-reactive/MatrixBackground';
import { WindowManager } from '@/components/window-system/WindowManager';
import { TrackPlayer } from '@/components/player/TrackPlayer';
import { useAudioContext } from '@/hooks/useAudioContext';
import { useWindowManager } from '@/hooks/useWindowManager';
import { WindowState } from '@/types/index';

const BioContent: React.FC = () => (
  <div className="p-4 h-full text-[#00FF41] font-mono text-xs overflow-y-auto bg-[#1A1A1A]">
    <div className="mb-4">
      <div className="text-[#DFFF00] mb-2">[ BIOGRAFÍA ]</div>
      <p className="mb-3 leading-relaxed">
        Productor de trance experimental y técnico. Fusionando rituales sonoros prehispánicos
        con síntesis modular y deep techno.
      </p>
    </div>

    <div>
      <div className="text-[#DFFF00] mb-2">[ MANIFIESTO ]</div>
      <p className="leading-relaxed">
        &gt; Rechazo el mainstream comercial. &gt; Apoyo la experimentación sin límites. &gt;
        Creo en la música como ritual transformativo.
      </p>
    </div>
  </div>
);

const SetsContent: React.FC = () => (
  <div className="p-4 h-full text-[#00FF41] font-mono text-xs overflow-y-auto bg-[#1A1A1A]">
    <div className="text-[#DFFF00] mb-3">[ SETS EN VIVO ]</div>
    <div className="space-y-3">
      <div className="border border-[#00FF41] p-2">
        <div className="font-bold">Boiler Room - Berlin</div>
        <div className="text-[#DFFF00]">25 NOV 2026</div>
        <div className="text-xs opacity-70 mt-1">3h de trance experimental</div>
      </div>
      <div className="border border-[#00FF41] p-2">
        <div className="font-bold">Resident Advisor Stage</div>
        <div className="text-[#DFFF00]">15 DIC 2026</div>
        <div className="text-xs opacity-70 mt-1">Sesión techno modular en vivo</div>
      </div>
    </div>
  </div>
);

const ContactContent: React.FC = () => (
  <div className="p-4 h-full text-[#00FF41] font-mono text-xs overflow-y-auto bg-[#1A1A1A]">
    <div className="text-[#DFFF00] mb-3">[ CONTACTO ]</div>
    <div className="space-y-2">
      <div>
        <span className="text-[#DFFF00]">&gt;</span> Email: contact@yourname.music
      </div>
      <div>
        <span className="text-[#DFFF00]">&gt;</span> Instagram: @yourname.dj
      </div>
      <div>
        <span className="text-[#DFFF00]">&gt;</span> Soundcloud: /yourname
      </div>
      <div>
        <span className="text-[#DFFF00]">&gt;</span> Bandcamp: yourname.bandcamp.com
      </div>
    </div>
  </div>
);

const InteractivePortfolio: React.FC = () => {
  const audioContext = useAudioContext();
  const windowManager = useWindowManager();

  const bassFrequency = useMemo(() => {
    return audioContext.getBassFrequency();
  }, [audioContext]);

  const renderWindowContent = (window: WindowState): React.ReactNode => {
    switch (window.contentType) {
      case 'player':
        return (
          <TrackPlayer
            analyser={audioContext.analyser}
            audioContext={audioContext.audioContext}
          />
        );
      case 'bio':
        return <BioContent />;
      case 'sets':
        return <SetsContent />;
      case 'contact':
        return <ContactContent />;
      default:
        return null;
    }
  };

  return (
    <div
      className="w-screen h-screen overflow-hidden bg-[#1A1A1A]"
      style={{
        fontFamily: 'monospace',
      }}
    >
      {/* Background Matrix */}
      <MatrixBackground bassFrequency={bassFrequency} />

      {/* Window System */}
      <WindowManager
        windows={windowManager.windows}
        onDragStart={windowManager.startDrag}
        onDragMove={windowManager.updateDrag}
        onDragEnd={windowManager.endDrag}
        onClose={windowManager.closeWindow}
        onMinimize={windowManager.minimizeWindow}
        onFocus={windowManager.focusWindow}
        onCreateWindow={windowManager.createWindow}
        renderWindowContent={renderWindowContent}
      />
    </div>
  );
};

export default InteractivePortfolio;
