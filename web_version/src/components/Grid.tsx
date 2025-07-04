import React from 'react';
import Cell from './Cell';
import './Grid.css';

interface GridProps {
  grid: boolean[][];
  onCellClick: (x: number, y: number) => void;
  isRunning: boolean;
}

const Grid: React.FC<GridProps> = ({ grid, onCellClick, isRunning }) => {
  if (!grid || grid.length === 0) {
    return <div className="grid-loading">Loading grid...</div>;
  }

  return (
    <div className="grid-container">
      <div 
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
          gridTemplateRows: `repeat(${grid.length}, 1fr)`
        }}
      >
        {grid.map((row, y) =>
          row.map((isAlive, x) => (
            <Cell
              key={`${x}-${y}`}
              isAlive={isAlive}
              onClick={() => onCellClick(x, y)}
              isRunning={isRunning}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Grid; 