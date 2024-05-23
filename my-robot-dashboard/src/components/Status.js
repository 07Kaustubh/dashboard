// src/components/Status.js
import React from 'react';

const Status = ({ batteryLevel, status }) => (
    <div>
        <h2>Status</h2>
        <p>Battery Level: {batteryLevel}%</p>
        <p>Operational Status: {status}</p>
    </div>
);

export default Status;
