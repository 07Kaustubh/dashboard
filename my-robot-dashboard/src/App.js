import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import Header from './components/Header';
import Status from './components/Status';
import ActivityLog from './components/ActivityLog';
import DropdownMenu from './components/DropdownMenu';
import TimeRangeSlider from './components/TimeRangeSlider';
import Login from './components/Login';
import './App.css';

const App = () => {
    const [batteryLevel, setBatteryLevel] = useState(0);
    const [status, setStatus] = useState('');
    const [logs, setLogs] = useState([]);
    const [timeRange, setTimeRange] = useState(24);
    const [options, setOptions] = useState([
        { value: 'view1', label: 'View 1' },
        { value: 'view2', label: 'View 2' },
    ]);
    const [selectedOption, setSelectedOption] = useState('view1');
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        if (!isLoggedIn) return;

        const token = localStorage.getItem('token');

        const fetchStatus = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/status', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setBatteryLevel(res.data.batteryLevel);
                setStatus(res.data.status);
            } catch (error) {
                console.error("Error fetching status:", error);
            }
        };

        const fetchLogs = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/logs', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setLogs(res.data);
            } catch (error) {
                console.error("Error fetching logs:", error);
            }
        };

        const fetchHistoricalData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/historical?range=${timeRange}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                // Assuming you want to do something with historical data
                // setHistoricalData(res.data);
            } catch (error) {
                console.error("Error fetching historical data:", error);
            }
        };

        fetchStatus();
        fetchLogs();
        fetchHistoricalData();

        const socket = socketIOClient('http://localhost:5000');
        socket.on('statusUpdate', (data) => {
            setBatteryLevel(data.batteryLevel);
            setStatus(data.status);
        });

        return () => socket.disconnect();
    }, [timeRange, isLoggedIn]);

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="App">
            <Header />
            {isLoggedIn ? (
                <>
                    <Status batteryLevel={batteryLevel} status={status} />
                    <ActivityLog logs={logs} />
                    <DropdownMenu
                        options={options}
                        selectedOption={selectedOption}
                        onChange={handleDropdownChange}
                    />
                    <TimeRangeSlider value={timeRange} onChange={setTimeRange} />
                </>
            ) : (
                <Login onLogin={() => setIsLoggedIn(true)} />
            )}
        </div>
    );
};

export default App;
