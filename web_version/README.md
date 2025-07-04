# Game of Life

An implementation of Conway's Game of Life built with React and Vite. This cellular automaton demonstrates how simple rules can create complex, fascinating patterns.

## Features

- **Interactive Grid**: Click cells to toggle them alive/dead before starting the simulation
- **Customizable Dimensions**: Set grid size from 5x5 to 100x100 cells
- **Real-time Controls**: Start, stop, reset, and randomize the simulation
- **Hover Effects**: Visual feedback when interacting with cells
- **Responsive Design**: Works beautifully on desktop and mobile devices
- **Generation Counter**: Track how many generations have passed
- **Smooth Animations**: Elegant transitions and cell birth animations

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm (comes with Node.js)

### Installation

1. Clone the repository and navigate to the web version:
```bash
git clone https://github.com/Euaell/game_of_life
cd game_of_life/web_version
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and go to `http://localhost:5173`

## 📖 How to Play

1. **Set Dimensions**: When you first load the app, choose your grid size (minimum 5x5) (maximum 20x20)
2. **Design Initial Pattern**: Click cells to toggle them alive (blue) or dead (white)
3. **Start Simulation**: Click the "Start" button to begin the cellular automaton
4. **Watch Evolution**: Observe how your pattern evolves according to the Game of Life rules
5. **Control the Game**: Use the controls to stop, reset, or randomize the grid

### Game Controls

- **Start/Stop**: Begin or pause the simulation
- **Reset**: Clear the grid and return to generation 0
- **Randomize**: Fill the grid with random living cells
- **Change Dimensions**: Modify the grid size at any time

## 🧬 Game of Life Rules

The Game of Life follows four simple rules:

1. **Underpopulation**: Any live cell with fewer than 2 live neighbors dies
2. **Survival**: Any live cell with 2 or 3 live neighbors lives on to the next generation
3. **Overpopulation**: Any live cell with more than 3 live neighbors dies
4. **Reproduction**: Any dead cell with exactly 3 live neighbors becomes a live cell

## 🏗️ Project Structure

```
web_version/
├── src/
│   ├── components/
│   │   ├── Cell.tsx              # Individual cell component
│   │   ├── Cell.css              # Cell styling with hover effects
│   │   ├── Grid.tsx              # Grid container component
│   │   ├── Grid.css              # Grid layout and responsive design
│   │   ├── GameControls.tsx      # Control buttons (start/stop/reset)
│   │   ├── GameControls.css      # Control styling
│   │   ├── DimensionsModal.tsx   # Modal for setting grid dimensions
│   │   └── DimensionsModal.css   # Modal styling
│   ├── App.tsx                   # Main application component
│   ├── App.css                   # Global app styles
│   ├── index.css                 # Global CSS reset and base styles
│   └── main.tsx                  # React entry point
├── public/                       # Static assets
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts               # Vite configuration
└── README.md                    # This file
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🎨 Customization

### Changing Game Speed

Edit the interval in `App.tsx`:
```typescript
const interval = setInterval(() => {
  updateGrid();
}, 200); // Change 200ms to your preferred speed
```

### Modifying Cell Appearance

Edit the CSS in `Cell.css` to change colors, sizes, or animations:
```css
.cell.alive {
  background: #007bff; /* Change this color */
}
```

### Adding New Patterns

You can modify the randomize function or add preset patterns in `App.tsx`.

## 🔧 Technical Details

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 7.0+
- **Styling**: Pure CSS with modern features
- **State Management**: React hooks (useState, useEffect, useCallback)
- **Responsive Design**: CSS Grid and Flexbox
- **Performance**: Optimized re-renders and efficient grid updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Learn More

- [Conway's Game of Life - Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
- [LifeWiki - Patterns and Rules](https://conwaylife.com/wiki/Main_Page)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

## 📄 License

This project is open source and available under the [MIT License](../LICENSE).

## 🎯 Future Enhancements

- [ ] Save/load pattern presets
- [ ] Pattern library with famous Game of Life patterns
- [ ] Different rule sets (Brian's Brain, Day & Night, etc.)
- [ ] Export patterns as images or GIFs
- [ ] Touch controls for mobile devices
- [ ] Performance optimizations for very large grids

---

Built with ❤️ using React and Vite. Based on the original Python implementation in the parent directory.
