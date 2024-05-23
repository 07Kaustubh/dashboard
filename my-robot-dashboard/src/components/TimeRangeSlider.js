// src/components/TimeRangeSlider.js
import React from 'react';

const TimeRangeSlider = ({ value, onChange }) => (
    <div>
        <h2>Time Range</h2>
        <input
            type="range"
            min="1"
            max="48"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
        />
        <p>{value} hours</p>
    </div>
);

export default TimeRangeSlider;
