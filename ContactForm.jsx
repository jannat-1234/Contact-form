// src/ContactForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './ContactForm.css'; // Import the CSS file

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    purpose: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://172.105.55.211/TestApi/contactApi.php?type=getContact', formData);
      if (response.status === 200) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', type: '', purpose: '', message: '' }); // Clear form
      }
    } catch (error) {
      setStatus('Failed to send message. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div className="contact-form">
      <h2>Contact Us</h2>
      {status && <p className="status">{status}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div>
          <label>Type:</label>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select...</option>
            <option value="Inquiry">Inquiry</option>
            <option value="Feedback">Feedback</option>
            <option value="Support">Support</option>
          </select>
        </div>
        <div>
          <label>Purpose:</label>
          <input type="text" name="purpose" value={formData.purpose} onChange={handleChange} required />
        </div>
        <div>
          <label>Message:</label>
          <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactForm;
