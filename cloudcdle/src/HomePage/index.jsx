import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const handleStartSetup = (os) => {
        navigate(`/vm-config?os=${os}`);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Welcome to VM Configurator</h1>
            <div style={styles.buttonGroup}>
                <button onClick={() => handleStartSetup('Linux')} style={styles.button}>
                    Start Setup for Linux
                </button>
                <button onClick={() => handleStartSetup('Windows')} style={styles.button}>
                    Start Setup for Windows
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#1f1f2e',
        color: '#e0e0eb',
        fontFamily: 'Helvetica, Arial, sans-serif',
    },
    header: {
        marginBottom: '20px',
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#4f76a3',
        color: '#e0e0eb',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default HomePage;
