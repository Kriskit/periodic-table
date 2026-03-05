# 🧪 Periodic Table Explorer

An interactive periodic table built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **18-column grid layout** with lanthanides/actinides separated below
- **Click any element** to view detailed info: atomic number, symbol, name, mass, electron configuration, discovery, category, phase, melting/boiling points, and summary
- **Color-coded categories**: alkali metals, alkaline earth, transition metals, post-transition, metalloids, nonmetals, noble gases, lanthanides, actinides
- **Real-time search** by name, symbol, or atomic number — non-matching elements dim
- **Temperature slider** (0K–6000K) — shows solid/liquid/gas state per element based on melting and boiling points
- **Dark theme** with responsive, horizontally scrollable layout

## Tech Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- Element data from [Bowserinator/Periodic-Table-JSON](https://github.com/Bowserinator/Periodic-Table-JSON)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## License

MIT
