import React from "react";
import { useNavigate } from "react-router-dom";

const NavigationPage = () => {
  const navigate = useNavigate();

  const handleCreateVM = () => {
    navigate("/vm-config");
  };

  const handleMyAccount = () => {
    navigate("/my-account");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome</h1>
      <button onClick={handleCreateVM} style={styles.button}>
        Create a VM
      </button>
      <button onClick={handleMyAccount} style={styles.button}>
        My Account
      </button>
      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
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
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4f76a3",
    color: "#e0e0eb",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default NavigationPage;
