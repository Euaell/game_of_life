import React from 'react';
import './GameControls.css';

interface GameControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onRandomize: () => void;
  isStable: boolean;
  stableGeneration: number | null;
}

const GameControls: React.FC<GameControlsProps> = ({
  isRunning,
  onStart,
  onStop,
  onReset,
  onRandomize,
  isStable,
  stableGeneration
}) => {
  return (
    <div className="game-controls">
      <div className="control-group">
        <button
          className={`btn btn-primary ${isRunning ? 'active' : ''}`}
          onClick={isRunning ? onStop : onStart}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        
        <button
          className="btn btn-secondary"
          onClick={onReset}
          disabled={isRunning}
        >
          Reset
        </button>
        
        <button
          className="btn btn-secondary"
          onClick={onRandomize}
          disabled={isRunning}
          title="Fill grid with random cells"
        >
          Randomize
        </button>
      </div>
      
      <div className={`instructions ${isStable ? 'stable' : ''}`}>
        {isStable && stableGeneration !== null 
          ? `Simulation reached a stable state after ${stableGeneration} generations.`
          : isRunning 
            ? 'Game is running! Click Stop to make changes.' 
            : 'Click cells to toggle them alive/dead, then click Start to begin simulation.'
        }
      </div>
    </div>
  );
};

export default GameControls; 