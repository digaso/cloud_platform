import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "No info",
    email: "No info",
    one_id: "No info",
    vms: [],
    ssh_keys_pub: [],
    ssh_keys_priv: []
  });

  const [newSshKey, setNewSshKey] = useState('');
  const username = localStorage.getItem('username');

  useEffect(() => {
    // Fetch user data from the server
    axios.get('http://localhost:8080/user', { params: { username } })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [username]);

  const handleSshKeyChange = (event) => {
    setNewSshKey(event.target.value);
  };

  const handleSshKeySubmit = () => {
    const userConfirmed = window.confirm("Do you want to update your SSH key?");
    if (userConfirmed) {
      axios.post('http://localhost:8080/user/ssh_key', {
        username,
        ssh_key: newSshKey
      })
      .then((response) => {
        setUserData(prevData => ({
          ...prevData,
          ssh_keys_pub: [...prevData.ssh_keys_pub, newSshKey]
        }));
        setNewSshKey('');
      })
      .catch((error) => {
        console.error('Error adding SSH key:', error);
      });
    }
  };

  const handleHomePage = () => {
    navigate("/os-selection");
  };

  const handleVMSpecsPage = () => {
    navigate("/VMSpecs");
  };

  if (!userData) {
    return <div style={styles.container}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <button onClick={handleHomePage} style={styles.button}>
        Back
      </button>
      <button onClick={handleVMSpecsPage} style={styles.button}>
        My VMs
      </button>
      <h1 style={styles.header}>My Account</h1>
      <div style={styles.userData}>
        <p>Username: {userData.username}</p>
        <p>One ID: {userData.one_id}</p>
        <p>VMs:</p>
        <ul>
          {userData.vms.map((vm, index) => (
            <li key={index}>{vm.NAME}</li>
          ))}
        </ul>
        <p>Public SSH: {userData.ssh_keys_pub.join(', ')}</p>
        <input
          type="text"
          value={newSshKey}
          onChange={handleSshKeyChange}
          placeholder="Enter new SSH Key"
          style={styles.input}
        />
        <button onClick={handleSshKeySubmit} style={styles.button}>
          Alter
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#1f1f2e",
    color: "#e0e0eb",
    fontFamily: "Helvetica, Arial, sans-serif",
  },
  header: {
    marginBottom: "20px",
  },
  userData: {
    padding: "10px",
    backgroundColor: "#333",
    borderRadius: "5px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    marginTop: "10px",
    width: "100%",
    boxSizing: "border-box",
  },
};

export default AccountPage;
