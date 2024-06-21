import React, { useState } from 'react';
import MapContainer from './components/MapContainer';
import SelectableItem from './components/SelectableItem';
import TopBar from './components/TopBar';

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (type) => {
    setSelectedItem(type);
  };

  const [gridStability, setGridStability] = useState(75);
  const [totalPower, setTotalPower] = useState(60);
  const [happiness, setHappiness] = useState(80);
  const [cost, setCost] = useState(50);
  const [totalScore, setTotalScore] = useState(65);
  const [windmills, setWindmills] = useState(0);
  const [solars, setSolars] = useState(0);

  const handleAddMarker = (position, type) => {
    if (type === 'ITEM1') setWindmills(prev => prev + 1);
    if (type === 'ITEM2') setSolars(prev => prev + 1);

    // Increase power and decrease happiness
    setTotalPower(prev => prev + 10); // Adjust the increment as needed
    setHappiness(prev => prev - 5); // Adjust the decrement as needed

    // Update grid stability
    const newGridStability = calculateGridStability(windmills + (type === 'ITEM1' ? 1 : 0), solars + (type === 'ITEM2' ? 1 : 0));
    setGridStability(newGridStability);
    
  };

  const calculateGridStability = (windmillCount, solarCount) => {
    const total = windmillCount + solarCount;
    if (total === 0) return 100;
    const ratio = windmillCount / total;
    return 100 - Math.abs(ratio - 0.5) * 200;
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar 
        gridStability={gridStability}
        totalPower={totalPower} 
        happiness={happiness} 
        cost={cost} 
        totalScore={totalScore} 
      />
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ width: '20%', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <SelectableItem id="item1" type="ITEM1" onSelect={handleSelectItem}>
            <div style={{ padding: '10px', backgroundColor: '#fff', cursor: 'pointer' }}>
              Windmill
            </div>
          </SelectableItem>
          <SelectableItem id="item2" type="ITEM2" onSelect={handleSelectItem}>
            <div style={{ padding: '10px', backgroundColor: '#fff', cursor: 'pointer' }}>
              Solar
            </div>
          </SelectableItem>
          <SelectableItem id="item3" type="ITEM3" onSelect={handleSelectItem}>
            <div style={{ padding: '10px', backgroundColor: '#fff', cursor: 'pointer' }}>
              Battery
            </div>
          </SelectableItem>
          <SelectableItem id="item4" type="ITEM4" onSelect={handleSelectItem}>
            <div style={{ padding: '10px', backgroundColor: '#fff', cursor: 'pointer' }}>
              PtX
            </div>
          </SelectableItem>
        </div>
        <div style={{ flex: 1 }}>
          <MapContainer selectedItem={selectedItem} onAddMarker={handleAddMarker} />
        </div>
      </div>
    </div>
  );
};

export default App;