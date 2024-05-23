// src/components/DropdownMenu.js
import React from 'react';

const DropdownMenu = ({ options = [], selectedOption, onChange }) => {
    if (!options.length) return null; // Ensure options is not undefined or empty

    return (
        <select value={selectedOption} onChange={onChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default DropdownMenu;
