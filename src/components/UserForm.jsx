// src/components/UserForm.jsx
import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { addUser, updateUser } from './api';

const UserForm = ({ user, setUsers, setShowForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: { bs: '' }
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        company: { bs: user.company?.bs || '' }
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Name and Email are required fields');
      return;
    }

    try {
      let response;
      if (user) {
        response = await updateUser(user.id, formData);
        setUsers(updatedUser => updatedUser);
      } else {
        response = await addUser(formData);
        setUsers(response);
      }
      setShowForm(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{user ? 'Edit User' : 'New User'}</h2>
          <button 
            className="btn-close"
            onClick={() => setShowForm(false)}
          >
            <FiX />
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Rohan Sharma"
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="Rohan@gmail.com"
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+916203522711"
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              value={formData.company.bs}
              onChange={e => setFormData({ ...formData, company: { bs: e.target.value } })}
              placeholder="Engineering"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {user ? 'Update' : 'Create'}
            </button>
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;