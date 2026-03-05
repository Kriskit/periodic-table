import { CATEGORY_COLORS, CATEGORY_LABELS } from '../utils';
import type { CategoryKey } from '../types';

export default function Legend() {
  const categories = Object.keys(CATEGORY_COLORS) as CategoryKey[];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((key) => (
        <div key={key} className="flex items-center gap-1.5">
          <div
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: CATEGORY_COLORS[key] }}
          />
          <span className="text-xs text-slate-400">{CATEGORY_LABELS[key]}</span>
        </div>
      ))}
    </div>
  );
}
