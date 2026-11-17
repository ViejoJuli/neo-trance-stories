import { useState, useRef, useCallback } from 'react';
import { WindowState, DragState } from '@/types/index';

const INITIAL_ZINDEX = 100;

export const useWindowManager = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [dragState, setDragState] = useState<Map<string, DragState>>(new Map());
  const nextZIndexRef = useRef(INITIAL_ZINDEX);

  const createWindow = useCallback(
    (
      contentType: WindowState['contentType'],
      title: string,
      width: number = 600,
      height: number = 400
    ) => {
      const id = `window-${Date.now()}-${Math.random()}`;
      const newWindow: WindowState = {
        id,
        title,
        x: Math.random() * (window.innerWidth - width),
        y: Math.random() * (window.innerHeight - height),
        width,
        height,
        isMinimized: false,
        zIndex: nextZIndexRef.current,
        contentType,
      };

      nextZIndexRef.current += 1;
      setWindows((prev) => [...prev, newWindow]);
      return id;
    },
    []
  );

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setDragState((prev) => {
      const updated = new Map(prev);
      updated.delete(id);
      return updated;
    });
  }, []);

  const startDrag = useCallback(
    (id: string, startX: number, startY: number) => {
      const window = windows.find((w) => w.id === id);
      if (!window) return;

      setDragState((prev) => {
        const updated = new Map(prev);
        updated.set(id, {
          isDragging: true,
          startX,
          startY,
          offsetX: startX - window.x,
          offsetY: startY - window.y,
        });
        return updated;
      });

      // Traer ventana al frente
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, zIndex: nextZIndexRef.current++ } : w
        )
      );
    },
    [windows]
  );

  const updateDrag = useCallback(
    (id: string, currentX: number, currentY: number) => {
      const drag = dragState.get(id);
      if (!drag || !drag.isDragging) return;

      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? {
                ...w,
                x: Math.max(0, Math.min(currentX - drag.offsetX, window.innerWidth - w.width)),
                y: Math.max(0, Math.min(currentY - drag.offsetY, window.innerHeight - w.height)),
              }
            : w
        )
      );
    },
    [dragState]
  );

  const endDrag = useCallback((id: string) => {
    setDragState((prev) => {
      const updated = new Map(prev);
      const drag = updated.get(id);
      if (drag) {
        updated.set(id, { ...drag, isDragging: false });
      }
      return updated;
    });
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, zIndex: nextZIndexRef.current++ } : w
      )
    );
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      )
    );
  }, []);

  return {
    windows,
    createWindow,
    closeWindow,
    startDrag,
    updateDrag,
    endDrag,
    focusWindow,
    minimizeWindow,
  };
};
