import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const user = { username, password };
        
        axios.post('http://localhost:8080/login', user)
        .then((res) => {
                alert(res.data.message)
                localStorage.setItem('username', user.username);
                navigate('/os-selection');
         
        })
        .catch((error) => {
            alert(error.response.data.message);
        });

    };
        
        const handleNavigateToRegister = () => {

            navigate('/');  
        }
        
    return (
        <div style={styles.container}>
            <button onClick={handleNavigateToRegister} style={styles.button}>
                Back
            </button>
            <h1 style={styles.header}>Login</h1>
            <div style={styles.formGroup}>
                <label style={styles.label}>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
            </div>
            <div style={styles.formGroup}>
                <label style={styles.label}>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
            </div>
            <button onClick={handleLogin} style={styles.button}>
                Login
            </button>
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
};

export default LoginPage;
