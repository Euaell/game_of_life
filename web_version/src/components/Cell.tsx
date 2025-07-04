import React from 'react';
import './Cell.css';

interface CellProps {
  isAlive: boolean;
  onClick: () => void;
  isRunning: boolean;
}

const Cell: React.FC<CellProps> = ({ isAlive, onClick, isRunning }) => {
  return (
    <div
      className={`cell ${isAlive ? 'alive' : 'dead'} ${isRunning ? 'running' : ''}`}
      onClick={onClick}
      title={isRunning ? 'Game is running' : 'Click to toggle cell'}
    />
  );
};

export default Cell; 