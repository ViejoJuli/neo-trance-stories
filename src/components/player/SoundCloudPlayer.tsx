import React, { useState, useEffect } from 'react';

interface SoundCloudTrack {
  id: string;
  title: string;
  artist: string;
  duration: number;
  artwork_url: string;
  url: string;
  stream_url: string;
}

interface SCTrackPlayer {
  analyser: AnalyserNode | null;
  audioContext: AudioContext | null;
  soundCloudUsername: string;
}

/**
 * SoundCloud Widget Iframe - Integración simple
 * Carga tu perfil de SoundCloud directamente
 */
export const SoundCloudWidget: React.FC<{ username: string }> = ({ username }) => {
  return (
    <div className="p-4 h-full text-[#00FF41] font-mono text-xs overflow-y-auto bg-[#1A1A1A]">
      <div className="text-[#DFFF00] mb-3">[ SOUNDCLOUD TRACKS ]</div>

      {/* Widget embed de SoundCloud */}
      <iframe
        title="SoundCloud Tracks"
        width="100%"
        height="400"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/soundcloud%3Ausers%3A${username}&color=%2300FF41&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
        style={{
          border: '1px solid #00FF41',
          borderRadius: '0',
          boxShadow: '0 0 10px rgba(0, 255, 65, 0.3)',
        }}
      ></iframe>

      <div className="mt-4 p-3 border border-[#00FF41] bg-[#0D0D0D]">
        <div className="text-[#DFFF00] text-xs mb-2">[ INFO ]</div>
        <p className="text-xs opacity-70">
          Escucha mis tracks de Neo Trance Cafetero en SoundCloud. Sígueme para nuevas
          releases y sets en vivo.
        </p>
      </div>
    </div>
  );
};

/**
 * Alternativa: Cargar tracks via API SoundCloud
 * (Requiere client_id)
 */
export const useSoundCloudTracks = (profileUrl: string) => {
  const [tracks, setTracks] = useState<SoundCloudTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        // SoundCloud API (nota: requiere autenticación)
        // Para uso simple, mejor usar el widget embed
        const response = await fetch(
          `https://soundcloud.com/oembed?url=${profileUrl}&format=json`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch SoundCloud data');
        }

        const data = await response.json();
        setTracks([data as SoundCloudTrack]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    if (profileUrl) {
      fetchTracks();
    }
  }, [profileUrl]);

  return { tracks, loading, error };
};
