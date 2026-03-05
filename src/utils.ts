import type { Element, CategoryKey, PhaseState } from './types';

export const CATEGORY_COLORS: Record<CategoryKey, string> = {
  'alkali metal': '#F44336',
  'alkaline earth metal': '#FF9800',
  'transition metal': '#FFD54F',
  'post-transition metal': '#66BB6A',
  'metalloid': '#26A69A',
  'nonmetal': '#42A5F5',
  'noble gas': '#AB47BC',
  'lanthanide': '#EC407A',
  'actinide': '#8D6E63',
  'unknown': '#78909C',
};

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  'alkali metal': 'Alkali Metal',
  'alkaline earth metal': 'Alkaline Earth',
  'transition metal': 'Transition Metal',
  'post-transition metal': 'Post-Transition',
  'metalloid': 'Metalloid',
  'nonmetal': 'Nonmetal',
  'noble gas': 'Noble Gas',
  'lanthanide': 'Lanthanide',
  'actinide': 'Actinide',
  'unknown': 'Unknown',
};

export function getCategoryKey(category: string): CategoryKey {
  const lower = category.toLowerCase();
  if (lower.includes('alkali') && !lower.includes('alkaline')) return 'alkali metal';
  if (lower.includes('alkaline')) return 'alkaline earth metal';
  if (lower.includes('transition') && !lower.includes('post')) return 'transition metal';
  if (lower.includes('post-transition')) return 'post-transition metal';
  if (lower.includes('metalloid')) return 'metalloid';
  if (lower.includes('nonmetal') || lower.includes('diatomic') || lower.includes('polyatomic')) return 'nonmetal';
  if (lower.includes('noble')) return 'noble gas';
  if (lower.includes('lanthanide')) return 'lanthanide';
  if (lower.includes('actinide')) return 'actinide';
  return 'unknown';
}

export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[getCategoryKey(category)];
}

export function getPhaseAtTemp(element: Element, tempK: number): PhaseState {
  const { melt, boil } = element;
  if (melt === null && boil === null) return 'unknown';
  if (melt !== null && tempK < melt) return 'solid';
  if (boil !== null && tempK > boil) return 'gas';
  if (melt !== null && boil !== null && tempK >= melt && tempK <= boil) return 'liquid';
  // Edge cases: only melt known
  if (melt !== null && boil === null && tempK >= melt) return 'liquid';
  // Only boil known
  if (melt === null && boil !== null && tempK <= boil) return 'liquid';
  return 'unknown';
}

export const PHASE_SYMBOLS: Record<PhaseState, string> = {
  solid: '■',
  liquid: '●',
  gas: '◆',
  unknown: '?',
};
