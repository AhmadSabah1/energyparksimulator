import React from 'react';
import {Marker} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DraggableMarkerWithRemove = ({marker, onDragEnd, onRemove}) => {
    // Determine the size based on marker type
    const size = marker.type === 'ITEM1' ? 400 :
        marker.type === 'ITEM2' ? 200 :
            marker.type === 'ITEM3' ? 40 : 40;

    const icon = L.divIcon({
        className: `custom-icon icon${marker.type.slice(-1)}`, // Apply custom CSS class
        html: `<img src="${marker.icon.options.iconUrl}" />`,
        iconSize: [size, size], // Set the container size dynamically
        iconAnchor: [size / 2, size / 2], // Center the icon correctly
        popupAnchor: [0, -size / 2], // Adjust popup position
        shadowSize: [size, size], // Ensure shadow size matches
    });

    return (
        <Marker
            position={marker.position}
            icon={icon}
            draggable={true}
            eventHandlers={{
                dragend: (event) => {
                    const newPosition = event.target.getLatLng();
                    onDragEnd(marker.id, newPosition);
                }
            }}
        >
        </Marker>
    );
};

export default DraggableMarkerWithRemove;
