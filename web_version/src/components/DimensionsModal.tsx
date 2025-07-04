import React, { useState } from 'react';
import './DimensionsModal.css';

interface DimensionsModalProps {
  onSubmit: (width: number, height: number) => void;
  onCancel: () => void;
}

const DimensionsModal: React.FC<DimensionsModalProps> = ({ onSubmit, onCancel }) => {
  const [width, setWidth] = useState('10');
  const [height, setHeight] = useState('10');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const w = parseInt(width);
    const h = parseInt(height);
    
    if (isNaN(w) || isNaN(h)) {
      setError('Please enter valid numbers');
      return;
    }
    
    if (w < 5 || h < 5) {
      setError('Minimum size is 5x5');
      return;
    }
    
    if (w > 100 || h > 100) {
      setError('Maximum size is 100x100');
      return;
    }
    
    onSubmit(w, h);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Set Grid Dimensions</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="width">Width:</label>
            <input
              type="number"
              id="width"
              value={width}
              onChange={(e) => {
                setWidth(e.target.value);
                setError('');
              }}
              min="5"
              max="100"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="height">Height:</label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
                setError('');
              }}
              min="5"
              max="100"
              required
            />
          </div>
          
          {error && <div className="error">{error}</div>}
          
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Grid
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DimensionsModal; 