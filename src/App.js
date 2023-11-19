import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function HomePage() {
  return (
    <div className='w-full max-w-sm container flex content-around flex-wrap bg-gray-200 h-48'>
      <h1>Vehicle License Plate Detection</h1>
        <Link className='margin-20 font-medium text-blue-600 dark:text-blue-500 hover:underline' to="/scan-image">Scan Image</Link>
        <Link className='margin-20 font-medium text-blue-600 dark:text-blue-500 hover:underline' to="/register-plate">Register License Plate</Link>
    </div>
  );
}

function ScanImage() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
  
    fetch('http://127.0.0.1:5000/process', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      setResult(data);
      console.log(data);
      navigate('/result', { state: { result: data } });
    })
    .catch(error => console.error(error));
  
    setImage(file);
  };

  return (
    <div className='w-full max-w-xs content-around flex-wrap bg-gray-200 h-48'>
      <form>
        <input type="file" onChange={handleImageUpload} 
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
        {result && <div>{JSON.stringify(result)}</div>}
        <input type='submit' value='Submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' />
      </form>
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
    <div className='w-full max-w-xs content-around flex-wrap bg-gray-200 h-48'>
      <form onChange={handleFormChange} onSubmit={handleSubmit} className=''>
        <label htmlFor="plate" className='block text-gray-700 text-sm font-bold mb-2'>License Plate</label>
        <input type="text" name="plate" id="plate" 
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
        
        <label htmlFor="name" className='block text-gray-700 text-sm font-bold mb-2'>Owner Name</label>
        <input type="text" name="name" id="name" 
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>

        <label htmlFor="phone" className='block text-gray-700 text-sm font-bold mb-2'>Owner Phone</label>
        <input type="text" name="phone" id="phone" 
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>

        <label htmlFor="address" className='block text-gray-700 text-sm font-bold mb-2'>Owner Address</label>
        <input type="text" name="address" id="address" 
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
        
        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Submit</button>
      </form>
    </div>
  );
}

function ResultPage() {
  const location = useLocation();
  const result = location.state.result;

  return (
    <div>
      <h2>Plate Number: {result.plate}</h2>
      <h2>Owner Name: {result.results[0][1]}</h2>
      <h2>Owner Phone: {result.results[0][2]}</h2>
      <h2>Owner Address: {result.results[0][3]}</h2>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-split">
          <HomePage />
          <Routes>
            <Route path="/scan-image" element={<ScanImage />} />
            <Route path="/register-plate" element={<RegisterPlate />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
