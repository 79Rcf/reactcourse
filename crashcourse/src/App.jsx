import React, { useState } from 'react';
import './App.css'

function Call() {
  const [name, setName] = useState('');
  const [submittdName, setsubmittdName] = useState([]);

  const handleSubmit = () => {
    if (name) {
      setsubmittdName([...submittdName, name]);
      setName('');
    }
  };

  return (
    <>
      <h3>Enter your name</h3>

      <input 
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>

      {submittdName.length > 0 && (
        submittdName.map((item, index) => (
          <li key={index}>{item}</li>
        ))
      )}
    </>
  );
}

function App() {
  return <Call />;
}




export default App
