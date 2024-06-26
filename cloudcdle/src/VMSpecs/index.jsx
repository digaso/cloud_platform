import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const VMSpecs = () => {
  const { vmId } = useParams();
  const [vmData, setVmData] = useState(null);
  const [vmlist, setVmlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const handleNavigateToMyAccount = () => {
    navigate("/my-account");
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/user/vm_list", { params: { username } })
      .then((response) => {
        setVmlist(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading VM data: {error.message}</div>;
  }

  return (
    <div style={styles.container}>
      <button onClick={handleNavigateToMyAccount} style={styles.button}>
        Back
      </button>
      <h1>VM List</h1>
      {vmData && (
        <div style={styles.vmData}>
          {vmlist.map((vm) => (
            <div>
              <h2>{}</h2>
              <p>Size: {vm.Disk.SIZE}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    borderRadius: "5px",
  },
  vmData: {
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
  },
};

export default VMSpecs;
