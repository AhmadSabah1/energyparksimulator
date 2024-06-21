// components/TopBar.js
import React from 'react';

const TopBar = ({ gridStability, totalPower, happiness, cost, totalScore }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#e0e0e0' }}>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <div style={{ marginBottom: '5px' }}>Grid Stability</div>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{gridStability.toFixed(0)} %</div>
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <div style={{ marginBottom: '5px' }}>Total Power</div>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{totalPower.toFixed(0)} MW</div>
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <div style={{ marginBottom: '5px' }}>Happiness</div>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{happiness.toFixed(0)}</div>
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <div style={{ marginBottom: '5px' }}>Cost</div>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{cost.toFixed(0)} DKK</div>
      </div>
      <div style={{ flex: 2, textAlign: 'center', marginLeft: '20px' }}>
        <div style={{ marginBottom: '5px' }}>Total Score</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalScore.toFixed(0)}</div>
      </div>
    </div>
  );
};

export default TopBar;
