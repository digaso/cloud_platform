import React, { useState } from 'react';

const VMConfigurator = () => {
    const [cpus, setCpus] = useState('');
    const [memory, setMemory] = useState(0);
    const [processingPower, setProcessingPower] = useState(0);
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = () => {
        setIsCreating(true);
        setTimeout(() => {
            setIsCreating(false);
            alert(`VM has been created successfully!\nMemory: ${memory} MB, CPUs: ${cpus}, Processing Power: ${processingPower} MB`);
        }, 3000);
    };

const validateInputs = () => {
    if (cpus > 8) {
        alert('The number of CPUs is too high. Please enter a value less than or equal to 8.');
        setCpus(8);
        return false;
    }
    return cpus > 0 && memory > 0 && processingPower > 0;
};

return (
    <div style={styles.container}>
        <div style={styles.formGroup}>
            <label style={styles.label}>Number of CPUs:</label>
            <input
                type="number"
                value={cpus}
                onChange={(e) => setCpus(e.target.value)}
                style={styles.input}
            />
        </div>
        <div style={styles.formGroup}>
            <label style={styles.label}>Maximum Memory (MB):</label>
            <input
                type="number"
                value={memory}
                onChange={(e) => setMemory(parseFloat(e.target.value))}
                style={styles.input}
            />
        </div>
        <div style={styles.formGroup}>
            <label style={styles.label}>Processing Power (MB):</label>
            <input
                type="number"
                value={processingPower}
                onChange={(e) => setProcessingPower(parseFloat(e.target.value))}
                style={styles.input}
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
);
};