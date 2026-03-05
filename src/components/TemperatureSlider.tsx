import { PHASE_SYMBOLS } from '../utils';

interface TemperatureSliderProps {
  temperature: number;
  onChange: (temp: number) => void;
}

export default function TemperatureSlider({ temperature, onChange }: TemperatureSliderProps) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-xs text-slate-400 whitespace-nowrap min-w-[28px]">0 K</label>
      <input
        type="range"
        min={0}
        max={6000}
        step={10}
        value={temperature}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-500"
      />
      <label className="text-xs text-slate-400 whitespace-nowrap min-w-[36px]">6000 K</label>
      <span className="text-sm font-mono text-blue-400 min-w-[60px] text-right">{temperature} K</span>
      <div className="flex gap-2 text-xs text-slate-500 ml-2">
        <span>{PHASE_SYMBOLS.solid} Solid</span>
        <span>{PHASE_SYMBOLS.liquid} Liquid</span>
        <span>{PHASE_SYMBOLS.gas} Gas</span>
      </div>
    </div>
  );
}
