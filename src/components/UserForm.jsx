import { useState, useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import { addUser, updateUser } from './api'

const UserForm = ({ user, setUsers, setShowForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: { bs: '' }
  })
  const [error, setError] = useState(null)

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        company: { bs: user.company?.bs || '' }
      })
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Name and Email are required fields')
      return
    }

    try {
      if (user) {
        const updatedUser = await updateUser(user.id, formData)
        setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u))
      } else {
        const newUser = await addUser(formData)
        setUsers(prev => [newUser, ...prev])
      }
      setShowForm(false)
    } catch (error) {
      setError(error.message)
    }
  }

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
              placeholder="John Doe"
            />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 234 567 890"
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
              placeholder="Engineering"
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="button button-danger"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="button button-success"
            >
              {user ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserForm