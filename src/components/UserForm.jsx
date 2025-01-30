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

  // If user data is provided (edit mode), prefill the form fields
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
    
    // Basic validation: Name and email are mandatory
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Name and Email are required fields');
      return;
    }

    try {
      if (user) {
        // Updating an existing user
        const updatedUser = await updateUser(user.id, formData);
        setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));
      } else {
        // Creating a new user
        const newUser = await addUser(formData);
        setUsers(prev => [newUser, ...prev]); // Add new user at the top
      }
      setShowForm(false); // Close the form after successful operation
    } catch (error) {
      setError(error.message); // Something went wrong, show the error message
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="header">
          <h2 className="form-title">{user ? 'Edit User' : 'Create New User'}</h2>
          <button 
            className="button button-danger" 
            onClick={() => setShowForm(false)}
            style={{ padding: '0.5rem' }}
          >
            <FiX /> {/* Close button */}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>} {/* Show error if any */}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Amit Sharma" // Using an Indian name for better relatability
            />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="amit.sharma@example.in" // Indian domain example
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98765 43210" // Indian phone number format
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              value={formData.company.bs}
              onChange={e => setFormData({ 
                ...formData, 
                company: { bs: e.target.value } 
              })}
              placeholder="IT Services" // Common department in Indian companies
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="button button-danger"
              onClick={() => setShowForm(false)} // User decides to cancel, just close form
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="button button-success"
            >
              {user ? 'Update User' : 'Create User'} {/* Change button text based on mode */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
