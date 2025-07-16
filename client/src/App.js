import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    host: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Sending...');

    try {
      await axios.post('https://1290e1da-3b5b-46d1-9e15-450f214ab681-00-1282bz5t3fybf.pike.replit.dev/send-email', formData);
      setMessage('✅ Email sent successfully!');
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to send email.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '40px', textAlign: 'center' }}>
      <h2>Visitor Entry Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required /><br /><br />
        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required /><br /><br />
        <input type="text" name="host" placeholder="Host Name" value={formData.host} onChange={handleChange} required /><br /><br />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;
