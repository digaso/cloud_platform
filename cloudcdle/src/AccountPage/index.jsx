import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AccountPage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from the server
    axios.get('http://localhost:8080/user', userData.username)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  if (!userData) {
    return <div style={styles.container}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>My Account</h1>
      <div style={styles.userData}>
        <p>Username: {userData.username}</p>
        <p>Email: {userData.email}</p>
        {/* Add more user data fields as necessary */}
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
};

export default AccountPage;
