import React from 'react';

const SelectableItem = ({ id, type, children, onSelect }) => {
    const handleClick = () => {
        onSelect(type);
    };

    return (
        <div onClick={handleClick} style={{ cursor: 'pointer' }}>
            {children}
        </div>
    );
};

export default SelectableItem;
