import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const VMSpecs = () => {
  const { vmId } = useParams();
  const [vmData, setVmData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const handleNavigateToMyAccount = () => {
      navigate("/my-account");
      }
      useEffect(() => {
          axios.get('http://localhost:8080/user/vm_list', username)
          .then((response) => {
              console.log(response.data);
        const vm = response.data;
        const vmSpecs = {
          ID: vm.ID,
          Name: vm.NAME,
          State: vm.STATE,
          Owner: vm.UNAME,
          UID: vm.UID,
          GID: vm.GID,
          Memory: vm.MEMORY,
          CPU: vm.CPU,
          OS: vm.OS,
          Disk: vm.DISK,
          Context: vm.CONTEXT
        };
        setVmData(vmSpecs);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [vmId]);

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
      <h1>VM Specifications</h1>
      {vmData && (
          <div style={styles.vmData}>
          <p><strong>ID:</strong> {vmData.ID}</p>
          <p><strong>Name:</strong> {vmData.Name}</p>
          <p><strong>State:</strong> {vmData.State}</p>
          <p><strong>Owner:</strong> {vmData.Owner}</p>
          <p><strong>UID:</strong> {vmData.UID}</p>
          <p><strong>GID:</strong> {vmData.GID}</p>
          <p><strong>Memory:</strong> {vmData.Memory}</p>
          <p><strong>CPU:</strong> {vmData.CPU}</p>
          <p><strong>OS:</strong> {vmData.OS}</p>
          <p><strong>Disk:</strong> {JSON.stringify(vmData.Disk)}</p>
          <p><strong>Context:</strong> {JSON.stringify(vmData.Context)}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    borderRadius: '5px',
  },
  vmData: {
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
  }
};

export default VMSpecs;
