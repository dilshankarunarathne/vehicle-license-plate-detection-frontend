import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function HomePage() {
  return (
    <div>
      <Link to="/scan-image">Scan Image</Link>
      <Link to="/register-plate">Register License Plate</Link>
    </div>
  );
}

function ScanImage() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
    // Send the image to the API and set the result
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {result && <div>{JSON.stringify(result)}</div>}
    </div>
  );
}

function RegisterPlate() {
  const [form, setForm] = useState({});

  const handleFormChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the form to the API
  };

  return (
    <form onChange={handleFormChange} onSubmit={handleSubmit}>
      {/* Add form fields here */}
      <button type="submit">Submit</button>
    </form>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scan-image" element={<ScanImage />} />
          <Route path="/register-plate" element={<RegisterPlate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
