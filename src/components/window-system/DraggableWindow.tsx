import React, { useEffect, useRef } from 'react';
import { X, Minus } from 'lucide-react';
import { WindowState } from '@/types/index';

interface DraggableWindowProps {
  window: WindowState;
  onDragStart: (id: string, x: number, y: number) => void;
  onDragMove: (id: string, x: number, y: number) => void;
  onDragEnd: (id: string) => void;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
  children: React.ReactNode;
}

export const DraggableWindow: React.FC<DraggableWindowProps> = ({
  window,
  onDragStart,
  onDragMove,
  onDragEnd,
  onClose,
  onMinimize,
  onFocus,
  children,
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button')) return;
      onFocus(window.id);
      onDragStart(window.id, e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      onDragMove(window.id, e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      onDragEnd(window.id);
    };

    header.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      header.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [window.id, onDragStart, onDragMove, onDragEnd, onFocus]);

  if (window.isMinimized) return null;

  return (
    <div
      ref={windowRef}
      className="fixed border border-[#00FF41] bg-[#1A1A1A]"
      style={{
        left: `${window.x}px`,
        top: `${window.y}px`,
        width: `${window.width}px`,
        height: `${window.height}px`,
        zIndex: window.zIndex,
        fontFamily: 'monospace',
        boxShadow: `0 0 20px rgba(0, 255, 65, 0.3)`,
      }}
    >
      {/* Header / Title Bar */}
      <div
        ref={headerRef}
        className="flex items-center justify-between px-3 py-2 cursor-move border-b border-[#00FF41] bg-[#0D0D0D]"
        style={{
          userSelect: 'none',
        }}
      >
        <span className="text-[#00FF41] text-xs tracking-widest">
          [ {window.title.toUpperCase()} ]
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onMinimize(window.id)}
            className="text-[#00FF41] hover:text-[#DFFF00] transition-colors p-1"
            title="Minimize"
          >
            <Minus size={14} />
          </button>
          <button
            onClick={() => onClose(window.id)}
            className="text-[#00FF41] hover:text-[#DFFF00] transition-colors p-1"
            title="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        className="overflow-hidden"
        style={{
          height: `calc(100% - 32px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
