import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import { API_URL } from '../config';

const FormList = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/forms`);
        setForms(response.data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };
    fetchForms();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      try {
        await axios.delete(`${API_URL}/api/forms/${id}`);
        setForms(forms.filter(form => form._id !== id));
      } catch (error) {
        console.error('Error deleting form:', error);
      }
    }
  };

  return (
    <div className="container">
      <div className="welcome-section">
        <h1>Welcome to Form.com</h1>
        <p>This is a simple form builder</p>
        <Link to="/form/create" className="button create-button">
          Create New Form
        </Link>
      </div>
      
      <hr className="divider" />
      
      <div className="forms-section">
        <h2>Forms</h2>
        {forms.length === 0 ? (
          <p className="no-forms">There are no forms created yet.</p>
        ) : (
          <div className="form-list">
            {forms.map((form) => (
              <div key={form._id} className="form-card">
                <h3>{form.title}</h3>
                <div className="form-actions">
                  <Link to={`/form/${form._id}`} className="button view-button">View</Link>
                  <Link to={`/form/${form._id}/edit`} className="button edit-button">Edit</Link>
                  <button 
                    onClick={() => handleDelete(form._id)} 
                    className="button delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormList;