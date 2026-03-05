import type { Element } from '../types';
import { getCategoryColor, getCategoryKey, CATEGORY_LABELS } from '../utils';

interface DetailPanelProps {
  element: Element | null;
  onClose: () => void;
}

export default function DetailPanel({ element, onClose }: DetailPanelProps) {
  if (!element) return null;

  const color = getCategoryColor(element.category);
  const catKey = getCategoryKey(element.category);
  const catLabel = CATEGORY_LABELS[catKey];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-lg rounded-2xl p-6 shadow-2xl border"
        style={{ backgroundColor: '#1e293b', borderColor: `${color}50` }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl leading-none cursor-pointer"
        >
          ×
        </button>

        <div className="flex items-start gap-4 mb-4">
          <div
            className="flex flex-col items-center justify-center rounded-xl p-4 min-w-[100px]"
            style={{ backgroundColor: `${color}20`, border: `2px solid ${color}` }}
          >
            <span className="text-sm opacity-70">{element.number}</span>
            <span className="text-4xl font-bold" style={{ color }}>{element.symbol}</span>
            <span className="text-xs opacity-70">{element.atomic_mass.toFixed(4)}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">{element.name}</h2>
            <span
              className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium"
              style={{ backgroundColor: `${color}30`, color }}
            >
              {catLabel}
            </span>
            <p className="text-sm text-slate-400 mt-2">{element.phase} at STP</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <InfoItem label="Atomic Mass" value={`${element.atomic_mass} u`} />
          <InfoItem label="Electron Config" value={element.electron_configuration_semantic} />
          <InfoItem label="Melting Point" value={element.melt !== null ? `${element.melt} K` : 'Unknown'} />
          <InfoItem label="Boiling Point" value={element.boil !== null ? `${element.boil} K` : 'Unknown'} />
          <InfoItem label="Density" value={element.density !== null ? `${element.density} g/cm³` : 'Unknown'} />
          <InfoItem label="Block" value={element.block.toUpperCase()} />
          <InfoItem label="Period" value={String(element.period)} />
          <InfoItem label="Group" value={element.group ? String(element.group) : 'N/A'} />
          {element.electronegativity_pauling !== null && (
            <InfoItem label="Electronegativity" value={String(element.electronegativity_pauling)} />
          )}
          {element.discovered_by && (
            <InfoItem label="Discovered By" value={element.discovered_by} />
          )}
        </div>

        {element.summary && (
          <p className="text-sm text-slate-300 leading-relaxed border-t border-slate-600 pt-3">
            {element.summary}
          </p>
        )}
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-slate-500 text-xs">{label}</span>
      <p className="text-slate-200 font-mono text-xs">{value}</p>
    </div>
  );
}
