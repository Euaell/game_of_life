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
  const [isStable, setIsStable] = useState(false);
  const [stableGeneration, setStableGeneration] = useState<number | null>(null);
  const [population, setPopulation] = useState(0);
  
  // Initialize grid with given dimensions
  const initializeGrid = useCallback((width: number, height: number) => {
    const newGrid: GameGrid = Array(height)
      .fill(null)
      .map(() => Array(width).fill(false));
    setGrid(newGrid);
    setGeneration(0);
    setPopulation(0);
  }, []);

  // Initialize grid when dimensions change
  useEffect(() => {
    initializeGrid(gridDimensions.width, gridDimensions.height);
    setIsStable(false);
    setStableGeneration(null);
  }, [gridDimensions, initializeGrid]);

  // Calculate population whenever grid changes
  useEffect(() => {
    if (grid.length > 0) {
      const newPopulation = grid.flat().filter(cell => cell).length;
      setPopulation(newPopulation);
    }
  }, [grid]);

  // Helper function to compare two grids for equality
  const gridsAreEqual = useCallback((grid1: GameGrid, grid2: GameGrid): boolean => {
    if (grid1.length !== grid2.length) return false;
    for (let y = 0; y < grid1.length; y++) {
      if (grid1[y].length !== grid2[y].length) return false;
      for (let x = 0; x < grid1[y].length; x++) {
        if (grid1[y][x] !== grid2[y][x]) return false;
      }
    }
    return true;
  }, []);

  // Count live neighbors for a cell
  const countLiveNeighbors = useCallback((grid: GameGrid, x: number, y: number): number => {
    let count = 0;
    const { width, height } = gridDimensions;
    
    for (let ny = Math.max(0, y - 1); ny <= Math.min(height - 1, y + 1); ny++) {
      for (let nx = Math.max(0, x - 1); nx <= Math.min(width - 1, x + 1); nx++) {
        if (nx === x && ny === y) continue;
        if (grid[ny][nx]) count++;
      }
    }
    return count;
  }, [gridDimensions]);

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
      
      // Check if the grid has reached a stable state
      if (gridsAreEqual(currentGrid, newGrid)) {
        setIsRunning(false); // Stop the simulation
        setIsStable(true);
        setStableGeneration(generation + 1);
      }
      
      return newGrid;
    });
    setGeneration(prev => prev + 1);
  }, [gridDimensions, countLiveNeighbors, gridsAreEqual, generation]);

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
    
    // Reset generation counter and stability state when user edits the grid
    setGeneration(0);
    setIsStable(false);
    setStableGeneration(null);
  };

  // Handle dimension modal submission
  const handleDimensionsSubmit = (width: number, height: number) => {
    setGridDimensions({ width, height });
    setShowModal(false);
  };

  // Control functions
  const handleStart = () => {
    if(isStable) {
      handleReset();
    }
    setIsRunning(true);
    setIsStable(false);
    setStableGeneration(null);
  };
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setIsStable(false);
    setStableGeneration(null);
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
    setIsStable(false);
    setStableGeneration(null);
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
        <h1>Game of Life</h1>
        
        <div className="game-info">
          <div>
            <span>Generation: {generation}</span>
            <span>Population: {population}</span>
          </div>
          <div>
            <span>Grid: {gridDimensions.width} x {gridDimensions.height}</span>
          
            <button 
              className="btn btn-secondary" 
              onClick={() => setShowModal(true)}
            >
              Change Dimensions
            </button>
          </div>
        </div>
        
        <GameControls
          isRunning={isRunning}
          onStart={handleStart}
          onStop={handleStop}
          onReset={handleReset}
          onRandomize={handleRandomize}
          isStable={isStable}
          stableGeneration={stableGeneration}
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
