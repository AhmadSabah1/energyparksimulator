import React, { useState, useEffect, useRef } from 'react';
import { Marker, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { isIntersecting, getDivArea } from '../utils/geometry';

const DraggableMarkerWithRemove = ({ marker, onDragEnd, onRemove, divs, updateScore }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [position, setPosition] = useState(marker.position);
    const map = useMap();
    const intersectedDivs = useRef(new Set());

    const radii = {
        ITEM1: 200, // Example radius for ITEM1
        ITEM2: 150, // Example radius for ITEM2
        ITEM3: 100, // Example radius for ITEM3
        ITEM4: 50   // Example radius for ITEM4
    };

    const radius = radii[marker.type] || 100; // Default radius if type not found

    useEffect(() => {
        const checkIntersection = () => {
            const currentIntersectedDivs = new Set();

            divs.forEach((div, index) => {
                const divPos = div.getBoundingClientRect();
                const divSize = { width: div.offsetWidth, height: div.offsetHeight };
                const markerPos = map.latLngToLayerPoint(position);
                const markerRadius = radius; // Use the radius for the marker type

                if (isIntersecting(markerPos, markerRadius, divPos, divSize)) {
                    currentIntersectedDivs.add(index);
                    if (!intersectedDivs.current.has(index)) {
                        const area = getDivArea(divSize.width, divSize.height);
                        if (div.style.backgroundColor !== '') {
                            updateScore(area, marker.id);
                        }
                    }
                }
            });

            // Update intersectedDivs and handle divs that are no longer intersected
            intersectedDivs.current.forEach((index) => {
                if (!currentIntersectedDivs.has(index)) {
                    const div = divs[index];
                    const area = getDivArea(div.offsetWidth, div.offsetHeight);
                    if (div.style.backgroundColor !== '') {
                        updateScore(-area, marker.id);
                    }
                }
            });

            if (currentIntersectedDivs.size === 0 && intersectedDivs.current.size > 0) {
                // If marker is no longer intersecting any divs, reset its score contribution
                updateScore(-marker.score, marker.id, true);
            }

            intersectedDivs.current = currentIntersectedDivs;
        };

        checkIntersection();
    }, [position, divs, map, radius, updateScore, marker.id, marker.score]);

    const icon = L.divIcon({
        className: `custom-icon`,
        html: `<img src="${marker.icon.options.iconUrl}" />`,
        iconSize: [50, 50], // Keep the icon size constant
        iconAnchor: [25, 25], // Center the icon correctly
        popupAnchor: [0, -25], // Adjust popup position
        shadowSize: [50, 50], // Ensure shadow size matches
    });

    return (
        <>
            <Circle
                center={position}
                radius={radius}
                pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.2 }}
            />
            <Marker
                position={position}
                icon={icon}
                draggable={true}
                eventHandlers={{
                    dragend: (event) => {
                        const newPosition = event.target.getLatLng();
                        setPosition(newPosition);
                        onDragEnd(marker.id, newPosition);
                    },
                    mouseover: () => setIsHovered(true),
                    mouseout: () => setIsHovered(false)
                }}
            >
                {isHovered && (
                    <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
                        <button onClick={() => onRemove(marker.id)} style={{
                            background: 'red',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            padding: '2px 5px'
                        }}>x</button>
                    </div>
                )}
            </Marker>
        </>
    );
};

export default DraggableMarkerWithRemove;
