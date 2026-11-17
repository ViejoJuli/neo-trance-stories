import React from 'react';
import { DraggableWindow } from './DraggableWindow';
import { Taskbar } from './Taskbar';
import { WindowState } from '@/types/index';

interface WindowManagerProps {
  windows: WindowState[];
  onDragStart: (id: string, x: number, y: number) => void;
  onDragMove: (id: string, x: number, y: number) => void;
  onDragEnd: (id: string) => void;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
  onCreateWindow: (type: WindowState['contentType']) => void;
  renderWindowContent: (window: WindowState) => React.ReactNode;
}

export const WindowManager: React.FC<WindowManagerProps> = ({
  windows,
  onDragStart,
  onDragMove,
  onDragEnd,
  onClose,
  onMinimize,
  onFocus,
  onCreateWindow,
  renderWindowContent,
}) => {
  return (
    <>
      {/* Windows */}
      {windows
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((window) => (
          <DraggableWindow
            key={window.id}
            window={window}
            onDragStart={onDragStart}
            onDragMove={onDragMove}
            onDragEnd={onDragEnd}
            onClose={onClose}
            onMinimize={onMinimize}
            onFocus={onFocus}
          >
            {renderWindowContent(window)}
          </DraggableWindow>
        ))}

      {/* Taskbar */}
      <Taskbar
        onPlayerClick={() => onCreateWindow('player')}
        onBioClick={() => onCreateWindow('bio')}
        onSetsClick={() => onCreateWindow('sets')}
        onContactClick={() => onCreateWindow('contact')}
      />
    </>
  );
};
