import React, { useState } from 'react';
import MapContainer from './components/MapContainer';
import SelectableItem from './components/SelectableItem';

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (type) => {
    setSelectedItem(type);
  };

  return (
      <div style={{ display: 'flex', height: '100vh' }}>
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
          <MapContainer selectedItem={selectedItem} />
        </div>
      </div>
  );
};

export default App;
