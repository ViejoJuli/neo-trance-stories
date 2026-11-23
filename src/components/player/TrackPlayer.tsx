import React, { useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { WaveformVisualizer } from '@/components/audio-reactive/WaveformVisualizer';
import { FxPad } from './FxPad';
import { SoundCloudWidget } from './SoundCloudPlayer';

interface TrackPlayerProps {
  analyser: AnalyserNode | null;
  audioContext: AudioContext | null;
}

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
}

const DEMO_TRACKS: Track[] = [
  {
    id: '1',
    title: 'El 3ero - Neo Trance Cafetero',
    artist: 'elminusuan',
    url: 'https://soundcloud.com/elminusuan/el-3ero-neo-trance-cafetero',
  },
  {
    id: '2',
    title: 'Neo Trance Dimension',
    artist: 'Your Name',
    url: '', // Agregar URL de track
  },
  {
    id: '3',
    title: 'Cyberpunk Sunrise',
    artist: 'Your Name',
    url: '',
  },
];

export const TrackPlayer: React.FC<TrackPlayerProps> = ({ analyser, audioContext }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [viewMode, setViewMode] = useState<'player' | 'soundcloud'>('soundcloud');
  const audioRef = useRef<HTMLAudioElement>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const currentTrack = DEMO_TRACKS[currentTrackIndex];

  const initializeAudio = () => {
    if (!audioContext || !audioRef.current) return;

    if (!sourceRef.current) {
      sourceRef.current = audioContext.createMediaElementSource(audioRef.current);
      sourceRef.current.connect(analyser!);
      analyser!.connect(audioContext.destination);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    initializeAudio();

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DEMO_TRACKS.length);
    setIsPlaying(false);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DEMO_TRACKS.length) % DEMO_TRACKS.length);
    setIsPlaying(false);
  };

  // Modo SoundCloud
  if (viewMode === 'soundcloud') {
    return (
      <div className="p-4 h-full flex flex-col gap-4 bg-[#1A1A1A] text-[#00FF41] font-mono">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('player')}
            className="px-3 py-1 border border-[#00FF41] text-xs hover:bg-[#00FF41] hover:text-[#1A1A1A] transition-all"
          >
            Player
          </button>
          <button
            onClick={() => setViewMode('soundcloud')}
            className="px-3 py-1 border border-[#DFFF00] bg-[#DFFF00] text-[#1A1A1A] text-xs"
          >
            SoundCloud
          </button>
        </div>

        <SoundCloudWidget username="elminusuan" />
      </div>
    );
  }

  // Modo reproductor local
  return (
    <div className="p-4 h-full flex flex-col gap-4 bg-[#1A1A1A] text-[#00FF41] font-mono">
      <div className="flex gap-2">
        <button
          onClick={() => setViewMode('player')}
          className="px-3 py-1 border border-[#DFFF00] bg-[#DFFF00] text-[#1A1A1A] text-xs"
        >
          Player
        </button>
        <button
          onClick={() => setViewMode('soundcloud')}
          className="px-3 py-1 border border-[#00FF41] text-xs hover:bg-[#00FF41] hover:text-[#1A1A1A] transition-all"
        >
          SoundCloud
        </button>
      </div>

      {/* Track Info */}
      <div className="border border-[#00FF41] p-3 bg-[#0D0D0D]">
        <div className="text-xs tracking-widest uppercase mb-1">» Playing Now</div>
        <div className="text-sm font-bold">{currentTrack.title}</div>
        <div className="text-xs opacity-70">{currentTrack.artist}</div>
      </div>

      {/* Waveform */}
      <WaveformVisualizer analyser={analyser} isPlaying={isPlaying} />

      {/* Controls */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={prevTrack}
          className="p-2 border border-[#00FF41] hover:bg-[#00FF41] hover:text-[#1A1A1A] transition-all"
          title="Previous track"
        >
          <SkipBack size={16} />
        </button>

        <button
          onClick={togglePlay}
          className="p-2 border border-[#00FF41] hover:bg-[#00FF41] hover:text-[#1A1A1A] transition-all"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <button
          onClick={nextTrack}
          className="p-2 border border-[#00FF41] hover:bg-[#00FF41] hover:text-[#1A1A1A] transition-all"
          title="Next track"
        >
          <SkipForward size={16} />
        </button>

        {/* Volume */}
        <div className="flex items-center gap-2 ml-4 border border-[#00FF41] px-2 py-1">
          <Volume2 size={14} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => {
              const newVolume = parseFloat(e.target.value);
              setVolume(newVolume);
              if (audioRef.current) {
                audioRef.current.volume = newVolume;
              }
            }}
            className="w-20"
            style={{
              accentColor: '#00FF41',
            }}
          />
        </div>
      </div>

      {/* FX Pad */}
      <FxPad
        audioContext={audioContext}
        isPlaying={isPlaying}
        source={sourceRef.current}
      />

      {/* Playlist */}
      <div className="border border-[#00FF41] p-3 bg-[#0D0D0D] flex-1 overflow-y-auto">
        <div className="text-xs tracking-widest uppercase mb-2">» Playlist</div>
        {DEMO_TRACKS.map((track, idx) => (
          <div
            key={track.id}
            className={`text-xs py-1 cursor-pointer transition-colors ${
              idx === currentTrackIndex ? 'text-[#DFFF00]' : 'opacity-70 hover:opacity-100'
            }`}
            onClick={() => {
              setCurrentTrackIndex(idx);
              setIsPlaying(false);
            }}
          >
            <Music size={10} className="inline mr-1" />
            {idx + 1}. {track.title}
          </div>
        ))}
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        crossOrigin="anonymous"
        src={currentTrack.url}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};
