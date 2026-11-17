import React from 'react';

interface TaskbarButtonProps {
  label: string;
  onClick: () => void;
}

const TaskbarButton: React.FC<TaskbarButtonProps> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 border border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-[#1A1A1A] transition-all duration-100 text-xs tracking-widest font-mono"
    style={{
      boxShadow: '0 0 10px rgba(0, 255, 65, 0.2)',
    }}
  >
    [ {label} ]
  </button>
);

interface TaskbarProps {
  onPlayerClick: () => void;
  onBioClick: () => void;
  onSetsClick: () => void;
  onContactClick: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  onPlayerClick,
  onBioClick,
  onSetsClick,
  onContactClick,
}) => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-16 border-t border-[#00FF41] bg-[#0D0D0D] flex items-center justify-center gap-4 px-4"
      style={{
        boxShadow: '0 -10px 30px rgba(0, 255, 65, 0.1)',
        zIndex: 50,
      }}
    >
      <TaskbarButton label="REPRODUCTOR_TRACKS" onClick={onPlayerClick} />
      <TaskbarButton label="BIO_&_MANIFIESTO" onClick={onBioClick} />
      <TaskbarButton label="SETS_EN_VIVO" onClick={onSetsClick} />
      <TaskbarButton label="CONTACTO" onClick={onContactClick} />
    </div>
  );
};
