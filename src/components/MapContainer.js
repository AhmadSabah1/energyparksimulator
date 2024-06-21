import React, { useState, useRef } from 'react';
import { MapContainer as LeafletMap, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import DraggableMarkerWithRemove from './DraggableMarkerWithRemove';

const mapStyles = {
    width: '100%',
    height: '100%',
    position: 'relative'
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
    const mapRef = useRef(null);

    const addMarker = (position, type) => {
        const newMarker = {
            position,
            type,
            id: Date.now(),
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
        setMarkers(markers.filter(marker => marker.id !== id));
    };

    return (
        <div style={mapStyles}>
            <LeafletMap
                center={center}
                zoom={zoom}
                style={mapStyles}
                zoomControl={false} // Disable zoom control
                dragging={false} // Disable dragging
                doubleClickZoom={false} // Disable double-click zoom
                scrollWheelZoom={false} // Disable scroll wheel zoom
                whenCreated={mapInstance => { mapRef.current = mapInstance; }}
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
                    />
                ))}
            </LeafletMap>
            <div style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "600px",
                height: "400px",
                background: "red",
                zIndex: 10
            }}>
                {/* Your content here */}
            </div>
        </div>
    );
};

export default MapContainer;
