import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const VMConfigurator = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const os = queryParams.get('os');
    const [isCreating, setIsCreating] = useState(false);
    const navigate = useNavigate();
    const [vmName, setVmName] = useState('');
    const [memory, setMemory] = useState(0);
    const username = localStorage.getItem('username');
    const name = vmName;
    const size = memory;
    const vm= {username, name, size} ;
    const handleCreate = () => {
        setIsCreating(true);
        axios.post('http://localhost:8080/user/VM', vm).then((res) => {
            alert(res.data.message);
            setIsCreating(false);
            navigate('/VMSpecs');

        }).catch((error) => {
            alert(error.response.data.message);
            setIsCreating(false);
        });
    };


    const validateInputs = () => {
        return vmName && memory > 2252;
    };

    return (
        <div style={styles.container}>
            <div style={styles.form}>
                <h2 style={styles.header}>Configuring VM for {os}</h2>
                <div style={styles.formGroup}>
                    <label style={styles.label}>VM Name:</label>
                    <input
                        type="text"
                        value={vmName}
                        onChange={(e) => setVmName(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Maximum Memory (MB):</label>
                    <input
                        type="number"
                        value={memory}
                        min={0}
                        onChange={(e) => setMemory(Math.max(0, Number(e.target.value)))}
                        style={styles.input}
                    />
                    <input
                        type="range"
                        value={memory}
                        min={2252}
                        max={50000}
                        onChange={(e) => setMemory(Number(e.target.value))}
                        style={styles.slider}
                    />
                </div>
                <button
                    onClick={handleCreate}
                    style={styles.button}
                    disabled={!validateInputs() || isCreating}
                >
                    Create
                </button>
                {isCreating && <div style={styles.loading}>Creating VM...</div>}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#2b2b3d',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    },
    header: {
        marginBottom: '20px',
    },
    formGroup: {
        marginBottom: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    label: {
        marginBottom: '5px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        width: '200px',
        borderRadius: '5px',
        border: '1px solid #4f76a3',
        marginBottom: '5px',
        textAlign: 'center',
    },
    slider: {
        width: '200px',
        marginTop: '5px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#4f76a3',
        color: '#e0e0eb',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    loading: {
        marginTop: '20px',
        fontSize: '18px',
        color: '#4f76a3',
    },
};

export default VMConfigurator;
