import { useEffect, useState } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { fetchUsers, deleteUser } from './api';
import UserForm from './UserForm';

const UserList = () => {
  // Need to store users here
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For editing or adding user
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Pagination, too many users in one page is bad
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 10 per page feels right

  useEffect(() => {
    const getUsers = async () => {
      try {
        // Fetching users, hope no errors
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message); // Something broke
      } finally {
        setLoading(false); // Loading done
      }
    };
    getUsers();
  }, []);

  // Delete function, user gone forever
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(prevUsers => {
        const updatedUsers = prevUsers.filter(user => user.id !== id);

        // If last user on page deleted, move back one page
        if (updatedUsers.length <= (currentPage - 1) * itemsPerPage) {
          setCurrentPage(prev => Math.max(1, prev - 1));
        }
        return updatedUsers;
      });
    } catch (err) {
      setError(err.message); // Something wrong
    }
  };

  // Find where to cut user list
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages))); // No out of range
  };

  if (loading) return <div className="loading">Loading users... please wait</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <div className="content-header">
          <h1>User Management System</h1>
          {/* Button opens form */}
          <button 
            className="button btn-primary"
            onClick={() => { setSelectedUser(null); setShowForm(true); }}
          >
            <FiPlus /> Add User
          </button>
        </div>

        {/* Show form when needed */}
        {showForm && (
          <UserForm 
            user={selectedUser} 
            setUsers={setUsers} 
            setShowForm={setShowForm} 
          />
        )}

        <div className="scroll-message">
          <p>Scroll ➤ to View</p>
        </div>

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
                  {/* Show number, restart on new page */}
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.company?.bs || 'N/A'}</td>
                  <td>
                    <div className="action-buttons">
                      {/* Edit button, open form */}
                      <button 
                        className="button btn-warning"
                        onClick={() => { setSelectedUser(user); setShowForm(true); }}
                      >
                        <FiEdit />
                      </button>

                      {/* Delete button, user disappears */}
                      <button 
                        className="btn-danger button-danger"
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

          {/* No users, empty list */}
          {users.length === 0 && (
            <div className="no-users">No users found. Click "Add User" to create new ones.</div>
          )}
        </div>

        {/* Show pagination if many pages */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className={`page-button ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FiChevronLeft />
            </button>
            
            {/* Loop through pages */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className={`page-button ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FiChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
