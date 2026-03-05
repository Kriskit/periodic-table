import type { Element, PhaseState } from '../types';
import { getCategoryColor, getPhaseAtTemp, PHASE_SYMBOLS } from '../utils';

interface ElementCardProps {
  element: Element;
  onClick: (element: Element) => void;
  isSelected: boolean;
  isDimmed: boolean;
  temperature: number;
}

export default function ElementCard({ element, onClick, isSelected, isDimmed, temperature }: ElementCardProps) {
  const color = getCategoryColor(element.category);
  const phase: PhaseState = getPhaseAtTemp(element, temperature);

  return (
    <button
      onClick={() => onClick(element)}
      className="relative flex flex-col items-center justify-center p-0.5 rounded-md cursor-pointer transition-all duration-200 border group"
      style={{
        gridColumn: element.xpos,
        gridRow: element.ypos <= 7 ? element.ypos : element.ypos + 1,
        backgroundColor: isSelected ? color : `${color}18`,
        borderColor: isSelected ? color : `${color}60`,
        opacity: isDimmed ? 0.15 : 1,
        color: isSelected ? '#0f172a' : color,
        minWidth: '52px',
        minHeight: '56px',
      }}
      onMouseEnter={(e) => {
        if (!isSelected && !isDimmed) {
          e.currentTarget.style.backgroundColor = `${color}35`;
          e.currentTarget.style.borderColor = color;
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.zIndex = '10';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = `${color}18`;
          e.currentTarget.style.borderColor = `${color}60`;
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.zIndex = '1';
        }
      }}
    >
      <span className="text-[10px] opacity-70 leading-none">{element.number}</span>
      <span className="text-lg font-bold leading-tight">{element.symbol}</span>
      <span className="text-[8px] opacity-60 leading-none truncate w-full text-center">{element.name}</span>
      <span className="text-[8px] opacity-50 leading-none">{PHASE_SYMBOLS[phase]}</span>
    </button>
  );
}
