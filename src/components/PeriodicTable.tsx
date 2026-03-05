import { useMemo } from 'react';
import type { Element } from '../types';
import ElementCard from './ElementCard';

interface PeriodicTableProps {
  elements: Element[];
  selectedElement: Element | null;
  onSelectElement: (element: Element) => void;
  searchQuery: string;
  temperature: number;
}

export default function PeriodicTable({
  elements,
  selectedElement,
  onSelectElement,
  searchQuery,
  temperature,
}: PeriodicTableProps) {
  const matchingNumbers = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase().trim();
    const matches = new Set<number>();
    for (const el of elements) {
      if (
        el.name.toLowerCase().includes(q) ||
        el.symbol.toLowerCase().includes(q) ||
        String(el.number) === q
      ) {
        matches.add(el.number);
      }
    }
    return matches;
  }, [elements, searchQuery]);

  // Separate main table (ypos 1-7) and lanthanides/actinides (ypos 8-10)
  const mainElements = elements.filter(el => el.ypos <= 7);
  const lanthActElements = elements.filter(el => el.ypos > 7);

  return (
    <div className="overflow-x-auto pb-4">
      {/* Main table */}
      <div
        className="grid gap-0.5 mx-auto"
        style={{
          gridTemplateColumns: 'repeat(18, minmax(52px, 1fr))',
          gridTemplateRows: 'repeat(7, minmax(56px, auto))',
          width: 'fit-content',
          minWidth: '960px',
        }}
      >
        {mainElements.map((el) => (
          <ElementCard
            key={el.number}
            element={el}
            onClick={onSelectElement}
            isSelected={selectedElement?.number === el.number}
            isDimmed={matchingNumbers !== null && !matchingNumbers.has(el.number)}
            temperature={temperature}
          />
        ))}
      </div>

      {/* Spacer */}
      <div className="h-4" />

      {/* Lanthanides & Actinides */}
      <div
        className="grid gap-0.5 mx-auto"
        style={{
          gridTemplateColumns: 'repeat(18, minmax(52px, 1fr))',
          gridTemplateRows: 'repeat(2, minmax(56px, auto))',
          width: 'fit-content',
          minWidth: '960px',
        }}
      >
        {lanthActElements.map((el) => {
          // Map ypos 8/9 → row 1, ypos 10 → row 2
          const row = el.ypos <= 9 ? 1 : 2;
          return (
            <div
              key={el.number}
              style={{
                gridColumn: el.xpos,
                gridRow: row,
              }}
            >
              <ElementCard
                element={el}
                onClick={onSelectElement}
                isSelected={selectedElement?.number === el.number}
                isDimmed={matchingNumbers !== null && !matchingNumbers.has(el.number)}
                temperature={temperature}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
