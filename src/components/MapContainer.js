import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MapContainer as LeafletMap, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import DraggableMarkerWithRemove from './DraggableMarkerWithRemove';

const mapStyles = {
    width: '100%',
    height: '100%',
    position: 'relative' // Ensure this is relative
};

// Set your desired center and zoom level here
const center = [55.2742, 11.8212];
const zoom = 16;

const MapComponent = ({ selectedItem, addMarker }) => {
    useMapEvents({
        click(e) {
            if (selectedItem) {
                addMarker(e.latlng, selectedItem);
            }
        }
    });
    return null;
};

const MapContainer = ({ selectedItem, onAddMarker }) => {
    const [markers, setMarkers] = useState([]);
    const [score, setScore] = useState(0);
    const mapRef = useRef(null);
    const divRefs = useRef([]);

    useEffect(() => {
        divRefs.current = divRefs.current.slice(0, 4);
    }, []);

    const addMarker = (position, type) => {
        const newMarker = {
            position,
            type,
            id: Date.now(),
            score: 0,
            icon: L.icon({
                iconUrl: type === 'ITEM1' ? '/icons/icon1.png' :
                    type === 'ITEM2' ? '/icons/icon2.png' :
                        type === 'ITEM3' ? '/icons/icon3.png' :
                            '/icons/icon4.png',
                iconSize: [25, 25], // Keep the icon size constant
                iconAnchor: [12.5, 12.5], // Center the icon correctly
                popupAnchor: [0, -12.5], // Adjust popup position
                shadowSize: [25, 25] // Ensure shadow size matches
            })
        };
        setMarkers([...markers, newMarker]);
        onAddMarker(position, type); // This line was added to pass the type to handleAddMarker
    };    

    const updateMarkerPosition = (id, newPosition) => {
        setMarkers(markers.map(marker => marker.id === id ? { ...marker, position: newPosition } : marker));
    };

    const removeMarker = (id) => {
        const marker = markers.find(marker => marker.id === id);
        if (marker) {
            updateScore(-marker.score, id, true);
        }
        setMarkers(markers.filter(marker => marker.id !== id));
    };

    const updateScore = useCallback((area, markerId, reset = false) => {
        setMarkers(markers => markers.map(marker => {
            if (marker.id === markerId) {
                const newScore = reset ? 0 : (marker.score + area);
                setScore(prevScore => prevScore + (newScore - marker.score));
                return { ...marker, score: newScore };
            }
            return marker;
        }));
    }, []);

    console.log(score)
    return (
        <div style={mapStyles}>
            <LeafletMap
                center={center}
                zoom={zoom}
                style={{ width: '100%', height: '100%' }}
                zoomControl={false}
                dragging={false}
                doubleClickZoom={false}
                scrollWheelZoom={false}
                whenCreated={mapInstance => {
                    mapRef.current = mapInstance;
                }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapComponent selectedItem={selectedItem} addMarker={addMarker} />
                {markers.map(marker => (
                    <DraggableMarkerWithRemove
                        key={marker.id}
                        marker={marker}
                        onDragEnd={updateMarkerPosition}
                        onRemove={removeMarker}
                        divs={divRefs.current}
                        updateScore={updateScore}
                    />
                ))}
            </LeafletMap>

            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none' // Make the entire overlay non-interactive initially
            }}>
                <div style={{
                    width: "100%",
                    height: "400px",
                    display: "flex"
                }}>
                    <div ref={(el) => (divRefs.current[0] = el)} style={{
                        width: '600px',
                        height: '400px',
                        zIndex: 100,
                        pointerEvents: 'auto', // Make this specific div interactive
                        backgroundColor: 'rgba(255, 0, 0, 0.5)' // Temporary background for visibility
                    }}>
                    </div>
                    <div ref={(el) => (divRefs.current[1] = el)} style={{
                        width: '300px',
                        height: '400px',
                        zIndex: 100,
                        pointerEvents: 'auto', // Make this specific div interactive
                        backgroundColor: 'rgba(0, 255, 0, 0.5)' // Temporary background for visibility
                    }}/>
                </div>
                <div style={{
                    width: "100%",
                    height: "150px",
                    display: "flex"
                }}>
                    <div ref={(el) => (divRefs.current[2] = el)} style={{
                        width: '500px',
                        height: '150px',
                        zIndex: -10,
                        backgroundColor: 'rgba(0, 0, 255, 0.5)' // Temporary background for visibility
                    }}/>
                </div>
                <div style={{
                    width: "100%",
                    height: "400px",
                    display: "flex"
                }}>
                    <div ref={(el) => (divRefs.current[3] = el)} style={{
                        width: '300px',
                        height: '400px',
                        zIndex: 100,
                        pointerEvents: 'auto', // Make this specific div interactive
                        backgroundColor: 'rgba(255, 255, 0, 0.5)' // Temporary background for visibility
                    }}/>
                </div>
            </div>
            <div style={{
                position: 'absolute',
                bottom: 10,
                left: 10,
                background: 'white',
                padding: '10px',
                zIndex: 200,
                pointerEvents: 'auto' // Ensure this div is interactive
            }}>
                Score: {score}
            </div>
        </div>
    );
};

export default MapContainer;
