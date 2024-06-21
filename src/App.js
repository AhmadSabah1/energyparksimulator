import React, { useState , useEffect} from 'react';
import MapContainer from './components/MapContainer';
import SelectableItem from './components/SelectableItem';
import TopBar from './components/TopBar';

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (type) => {
    setSelectedItem(type);
  };

  const [gridStability, setGridStability] = useState(100);
  const [totalPower, setTotalPower] = useState(0);
  const [happiness, setHappiness] = useState(100);
  const [cost, setCost] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [windmills, setWindmills] = useState(0);
  const [solars, setSolars] = useState(0);
  const [p2x, setP2X] = useState(0);
  const [battery, setBattery] = useState(0);
  const [score, setScore] = useState(0)



  const handleAddMarker = (position, type) => {
    if (type === 'ITEM1') setWindmills(prev => prev + 1);
    if (type === 'ITEM2') setSolars(prev => prev + 1);
    if (type === 'ITEM3') setBattery(prev => prev + 1);
    if (type === 'ITEM4') setP2X(prev => prev + 1);

    // Add the respective cost of each source
    const costs = {
      ITEM1: 150,
      ITEM2: 50,
      ITEM3: 120,
      ITEM4: 200
    };

    setCost(prev => prev + (costs[type] || 0));

    const power = {
      ITEM1: 5,
      ITEM2: 1,
      ITEM3: 0,
      ITEM4: -0.05
    };

    setTotalPower(prev => prev + (power[type] || 0));    

    // Update grid stability
    const newGridStability = calculateGridStability(windmills + (type === 'ITEM1' ? 1 : 0), solars + (type === 'ITEM2' ? 1 : 0),battery + (type === 'ITEM3' ? 1 : 0),p2x + (type === 'ITEM4' ? 1 : 0));
    setGridStability(newGridStability);

    setTotalScore(Math.max(gridStability+totalPower+happiness-cost/100,0))
    
  };

  const calculateGridStability = (windmillCount, solarCount, batteryCount, p2xCount) => {
    const total = windmillCount + solarCount;
    if (total === 0) return 100;
    const ratio = windmillCount / total;
    const stability =  100 - Math.abs(ratio - 0.5) * 200;
  
    return Math.min(stability+(1*batteryCount)+(2*p2xCount),100)
  };

  // Update setHappiness to use the score value
  useEffect(() => {
    setHappiness(Math.max(100 - score / 100000,0)); // Adjust the calculation as needed
  }, [score]);


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
              <b>Windmill</b> - <i>150 DKK</i>
            </div>
          </SelectableItem>
          <SelectableItem id="item2" type="ITEM2" onSelect={handleSelectItem}>
            <div style={{ padding: '10px', backgroundColor: '#fff', cursor: 'pointer' }}>
              <b>PV</b> - <i>50 DKK</i>
            </div>
          </SelectableItem>
          <SelectableItem id="item3" type="ITEM3" onSelect={handleSelectItem}>
            <div style={{ padding: '10px', backgroundColor: '#fff', cursor: 'pointer' }}>
              <b>Battery</b> - <i>120 DKK</i>
            </div>
          </SelectableItem>
          <SelectableItem id="item4" type="ITEM4" onSelect={handleSelectItem}>
            <div style={{ padding: '10px', backgroundColor: '#fff', cursor: 'pointer' }}>
              <b>P2X</b> - <i>200 DKK</i>
            </div>
          </SelectableItem>
        </div>
        <div style={{ flex: 1 }}>
          <MapContainer selectedItem={selectedItem} onAddMarker={handleAddMarker} score={score} setScore={setScore}/>
        </div>
      </div>
    </div>
  );
};

export default App;