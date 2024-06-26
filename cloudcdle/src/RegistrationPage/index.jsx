import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        
        const newUser = { username, password };
        axios.post('http://localhost:8080/register', newUser)
        .then((res) => {
                alert(res.data.message)
                localStorage.setItem('username', newUser.username);
                navigate('/os-selection');
         
        })
        .catch((error) => {
            alert(error.response.data.message);
        });
    };

    const handleNavigateToLogin = () => {
        navigate('/login');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Register</h1>
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
            <div style={styles.formGroup}>
                <label style={styles.label}>Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={styles.input}
                />
            </div>
            <button onClick={handleRegister} style={styles.button}>
                Register
            </button>
            <button onClick={handleNavigateToLogin} style={styles.linkButton}>
                Already have an account? Login
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
    linkButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: 'transparent',
        color: '#4f76a3',
        border: 'none',
        cursor: 'pointer',
        textDecoration: 'underline',
        marginTop: '10px',
    },
};

export default RegisterPage;
