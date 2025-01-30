import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "../components/UserForm";

const EditUser = () => {
  // We get id from URL params
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // API call to get user data by id
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => setUserData(response.data))  // User data saved here
      .catch(error => console.error("Error fetching user", error));  // If error happen, log it
  }, [id]); // Dependency is 'id', means it re-run if id changes

  const handleUpdateUser = (updatedUser) => {
    // API call to update user with new data
    axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser)
      .then(() => navigate("/"))  // After update, go back to home page
      .catch(error => console.error("Error updating user", error));  // Log error if any
  };

  return (
    <div className="container">
      <h2>Edit User</h2>
      {userData ? <UserForm onSubmit={handleUpdateUser} initialData={userData} /> : <p>Loading...</p>}
      {/* If user data loaded, show form else show loading */}
    </div>
  );
};

export default EditUser;
