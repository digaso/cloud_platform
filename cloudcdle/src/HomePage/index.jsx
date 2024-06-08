import React from "react";
import { useNavigate } from "react-router-dom";

const OSSelectionPage = () => {
  const navigate = useNavigate();

  const handleSelectOS = (os) => {
    navigate(`/vm-config?os=${os}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Select OS</h1>
      <button onClick={() => handleSelectOS("Linux")} style={styles.button}>
        Linux
      </button>
      <button onClick={() => handleSelectOS("Windows")} style={styles.button}>
        Windows
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

export default OSSelectionPage;
