import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableItem = ({ id, type, children }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type,
        item: { id, type },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            {children}
        </div>
    );
};

export default DraggableItem;
