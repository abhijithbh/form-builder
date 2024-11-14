import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import { API_URL } from '../config';

const ViewForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/forms/${id}`);
        setForm(response.data);
        const initialData = {};
        response.data.inputs.forEach(input => {
          initialData[input.title] = '';
        });
        setFormData(initialData);
      } catch (error) {
        console.error('Error fetching form:', error);
      }
    };
    fetchForm();
  }, [id]);

  const handleInputChange = (inputTitle, value) => {
    setFormData(prev => ({
      ...prev,
      [inputTitle]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Form submitted successfully!');
  };

  if (!form) return <div></div>;

  return (
    <div className="page-container">
      <div className="view-container">
        <h1>{form.title}</h1>
        <form onSubmit={handleSubmit} className="view-form">
          <div className="inputs-grid">
            {form.inputs.map((input) => (
              <div key={input._id} className="form-input">
                <label>{input.title}</label>
                <input
                  type={input.type}
                  placeholder={input.placeholder}
                  value={formData[input.title]}
                  onChange={(e) => handleInputChange(input.title, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ViewForm;
