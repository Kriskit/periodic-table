import { useState, useMemo } from 'react';
import type { Element } from './types';
import rawData from './data/elements.json';
import PeriodicTable from './components/PeriodicTable';
import DetailPanel from './components/DetailPanel';
import SearchBar from './components/SearchBar';
import TemperatureSlider from './components/TemperatureSlider';
import Legend from './components/Legend';

const elements: Element[] = (rawData as { elements: Element[] }).elements;

export default function App() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [temperature, setTemperature] = useState(298);

  // Filter out element 0 if present
  const validElements = useMemo(() => elements.filter(el => el.number > 0), []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-6">
      <header className="max-w-[1200px] mx-auto mb-6">
        <h1 className="text-3xl font-bold text-white mb-1">
          🧪 Periodic Table Explorer
        </h1>
        <p className="text-sm text-slate-400 mb-4">
          Interactive periodic table — click any element for details
        </p>

        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="flex-1">
            <SearchBar query={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>

        <div className="mb-3">
          <TemperatureSlider temperature={temperature} onChange={setTemperature} />
        </div>

        <Legend />
      </header>

      <main className="max-w-[1200px] mx-auto">
        <PeriodicTable
          elements={validElements}
          selectedElement={selectedElement}
          onSelectElement={setSelectedElement}
          searchQuery={searchQuery}
          temperature={temperature}
        />
      </main>

      <DetailPanel
        element={selectedElement}
        onClose={() => setSelectedElement(null)}
      />
    </div>
  );
}
