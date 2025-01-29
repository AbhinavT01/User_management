// src/components/UserList.jsx
import { useEffect, useState } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { fetchUsers, deleteUser } from './api';
import UserForm from './UserForm';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(prevUsers => {
        const updatedUsers = prevUsers.filter(user => user.id !== id);
        if (updatedUsers.length <= (currentPage - 1) * itemsPerPage) {
          setCurrentPage(prev => Math.max(1, prev - 1));
        }
        return updatedUsers;
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddUser = (newUser) => {
    setUsers(prev => [newUser, ...prev]);
    const newTotalPages = Math.ceil((users.length + 1) / itemsPerPage);
    if ((users.length + 1) > currentPage * itemsPerPage) {
      setCurrentPage(newTotalPages);
    }
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <div className="content-header">
          <h1>User Management</h1>
          <button 
            className="btn-primary"
            onClick={() => { setSelectedUser(null); setShowForm(true); }}
          >
            <FiPlus /> Add User
          </button>
        </div>

        {showForm && (
          <UserForm 
            user={selectedUser} 
            setUsers={handleAddUser} 
            setShowForm={setShowForm} 
          />
        )}

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.company?.bs || 'N/A'}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-warning"
                        onClick={() => { setSelectedUser(user); setShowForm(true); }}
                      >
                        <FiEdit />
                      </button>
                      <button 
                        className="btn-danger"
                        onClick={() => handleDelete(user.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {users.length === 0 && (
            <div className="no-users">No users found. Click "Add User" to create new users.</div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 1}
            >
              <FiChevronLeft /> Previous
            </button>
            
            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === totalPages}
            >
              Next <FiChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;