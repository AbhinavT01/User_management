import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "../components/UserForm";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    // Fetch user data from deployed JSON server
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => setUserData(response.data))
      .catch(error => console.error("Error fetching user", error));
  }, [id]);

  const handleChange = (event) => {
    // Update state based on input field changes
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdateUser = () => {
    // Save updated user data to deployed JSON server
    axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, userData)
      .then(() => navigate("/"))
      .catch(error => console.error("Error updating user", error));
  };

  return (
    <div className="container">
      <h2>Edit User</h2>
      {userData ? (
        <UserForm onSubmit={handleUpdateUser} initialData={userData} onChange={handleChange} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditUser;
