import React, { useState } from 'react';

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
      <label>
        License Plate:
        <input type="text" name="licensePlate" />
      </label>
      <br />
      <label>
        Car Model:
        <input type="text" name="carModel" />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default RegisterPlate;
