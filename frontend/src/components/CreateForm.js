import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import { API_URL } from '../config';

const CreateForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [inputs, setInputs] = useState([]);

  const addInput = (type) => {
    if (inputs.length >= 20) {
      alert('Maximum 20 inputs allowed');
      return;
    }

    const newInput = {
      type,
      title: '',
      placeholder: '',
      order: inputs.length
    };

    setInputs([...inputs, newInput]);
  };

  const updateInput = (index, field, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = { ...updatedInputs[index], [field]: value };
    setInputs(updatedInputs);
  };

  const removeInput = (index) => {
    setInputs(inputs.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a form title');
      return;
    }

    try {
      await axios.post(`${API_URL}/api/forms`, {
        title,
        inputs: inputs.map((input, index) => ({ ...input, order: index }))
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating form:', error);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Create New Form</h1>
      <div className="form-content">
        <input
          type="text"
          className="form-title-input"
          placeholder="Form Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <div className="input-types">
          <button onClick={() => addInput('text')} className="type-button">Add Text</button>
          <button onClick={() => addInput('email')} className="type-button">Add Email</button>
          <button onClick={() => addInput('password')} className="type-button">Add Password</button>
          <button onClick={() => addInput('number')} className="type-button">Add Number</button>
          <button onClick={() => addInput('date')} className="type-button">Add Date</button>
        </div>

        <div className="inputs-grid">
          {inputs.map((input, index) => (
            <div 
              key={index} 
              className="input-item"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', index);
                e.target.classList.add('dragging');
              }}
              onDragEnd={(e) => {
                e.target.classList.remove('dragging');
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const dragIndex = Number(e.dataTransfer.getData('text/plain'));
                const dropIndex = index;
                const newInputs = [...inputs];
                const [draggedItem] = newInputs.splice(dragIndex, 1);
                newInputs.splice(dropIndex, 0, draggedItem);
                setInputs(newInputs);
              }}
            >
              <div className="input-header">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <i className="fas fa-grip-vertical drag-handle"></i>
                  <div className="input-type-label">{input.type.toUpperCase()}</div>
                </div>
                <i 
                  className="fas fa-trash delete-icon"
                  onClick={() => removeInput(index)}
                  title="Delete input"
                ></i>
              </div>
              <div className="input-fields-container">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Input Title"
                  value={input.title}
                  onChange={(e) => updateInput(index, 'title', e.target.value)}
                />
                <input
                  type="text"
                  className="input-field"
                  placeholder="Placeholder"
                  value={input.placeholder}
                  onChange={(e) => updateInput(index, 'placeholder', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        <button onClick={handleSubmit} className="submit-button">Create Form</button>
      </div>
    </div>
  );
};

export default CreateForm;