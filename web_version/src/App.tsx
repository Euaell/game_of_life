import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import DimensionsModal from './components/DimensionsModal';
import Grid from './components/Grid';
import GameControls from './components/GameControls';

type CellState = boolean;
type GameGrid = CellState[][];

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(true);
  const [gridDimensions, setGridDimensions] = useState({ width: 10, height: 10 });
  const [grid, setGrid] = useState<GameGrid>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [generation, setGeneration] = useState(0);

  // Initialize grid with given dimensions
  const initializeGrid = useCallback((width: number, height: number) => {
    const newGrid: GameGrid = Array(height)
      .fill(null)
      .map(() => Array(width).fill(false));
    setGrid(newGrid);
    setGeneration(0);
  }, []);

  // Initialize grid when dimensions change
  useEffect(() => {
    initializeGrid(gridDimensions.width, gridDimensions.height);
  }, [gridDimensions, initializeGrid]);

  // Count live neighbors for a cell
  const countLiveNeighbors = (grid: GameGrid, x: number, y: number): number => {
    let count = 0;
    const { width, height } = gridDimensions;
    
    for (let ny = Math.max(0, y - 1); ny <= Math.min(height - 1, y + 1); ny++) {
      for (let nx = Math.max(0, x - 1); nx <= Math.min(width - 1, x + 1); nx++) {
        if (nx === x && ny === y) continue;
        if (grid[ny][nx]) count++;
      }
    }
    return count;
  };

  // Update grid according to Game of Life rules
  const updateGrid = useCallback(() => {
    setGrid(currentGrid => {
      const newGrid = currentGrid.map(row => [...row]);
      
      for (let y = 0; y < gridDimensions.height; y++) {
        for (let x = 0; x < gridDimensions.width; x++) {
          const liveNeighbors = countLiveNeighbors(currentGrid, x, y);
          const isAlive = currentGrid[y][x];
          
          if (isAlive) {
            // Live cell rules
            if (liveNeighbors < 2) {
              newGrid[y][x] = false; // Underpopulation
            } else if (liveNeighbors === 2 || liveNeighbors === 3) {
              newGrid[y][x] = true; // Survival
            } else {
              newGrid[y][x] = false; // Overpopulation
            }
          } else {
            // Dead cell rules
            if (liveNeighbors === 3) {
              newGrid[y][x] = true; // Reproduction
            }
          }
        }
      }
      
      return newGrid;
    });
    setGeneration(prev => prev + 1);
  }, [gridDimensions, countLiveNeighbors]);

  // Game loop
  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      updateGrid();
    }, 200); // Update every 200ms
    
    return () => clearInterval(interval);
  }, [isRunning, updateGrid]);

  // Handle cell click
  const handleCellClick = (x: number, y: number) => {
    if (isRunning) return; // Don't allow editing while running
    
    setGrid(currentGrid => {
      const newGrid = currentGrid.map(row => [...row]);
      newGrid[y][x] = !newGrid[y][x];
      return newGrid;
    });
  };

  // Handle dimension modal submission
  const handleDimensionsSubmit = (width: number, height: number) => {
    setGridDimensions({ width, height });
    setShowModal(false);
  };

  // Control functions
  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    initializeGrid(gridDimensions.width, gridDimensions.height);
  };
  const handleRandomize = () => {
    if (isRunning) return;
    
    setGrid(currentGrid => {
      const newGrid = currentGrid.map(row => 
        row.map(() => Math.random() > 0.7)
      );
      return newGrid;
    });
    setGeneration(0);
  };

  return (
    <div className="app">
      {showModal && (
        <DimensionsModal
          onSubmit={handleDimensionsSubmit}
          onCancel={() => setShowModal(false)}
        />
      )}
      
      <div className="game-container">
        <h1>Conway's Game of Life</h1>
        
        <div className="game-info">
          <span>Generation: {generation}</span>
          <span>Grid: {gridDimensions.width} × {gridDimensions.height}</span>
          <button 
            className="btn btn-secondary" 
            onClick={() => setShowModal(true)}
          >
            Change Dimensions
          </button>
        </div>
        
        <GameControls
          isRunning={isRunning}
          onStart={handleStart}
          onStop={handleStop}
          onReset={handleReset}
          onRandomize={handleRandomize}
        />
        
        <Grid
          grid={grid}
          onCellClick={handleCellClick}
          isRunning={isRunning}
        />
      </div>
    </div>
  );
};

export default App;
