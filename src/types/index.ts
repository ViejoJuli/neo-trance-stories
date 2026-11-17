export interface WindowState {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  zIndex: number;
  contentType: 'player' | 'bio' | 'sets' | 'contact';
}

export interface AudioContextType {
  analyser: AnalyserNode | null;
  audioContext: AudioContext | null;
  isPlaying: boolean;
  currentFrequency: number[];
  bassFrequency: number;
}

export interface FxPadButton {
  id: string;
  label: string;
  color: string;
}

export interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  offsetX: number;
  offsetY: number;
}
