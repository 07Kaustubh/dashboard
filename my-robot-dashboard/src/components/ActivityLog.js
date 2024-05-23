// src/components/ActivityLog.js
import React from 'react';

const ActivityLog = ({ logs }) => (
    <div>
        <h2>Activity Log</h2>
        <ul>
            {logs.map((log, index) => (
                <li key={index}>{log}</li>
            ))}
        </ul>
    </div>
);

export default ActivityLog;
