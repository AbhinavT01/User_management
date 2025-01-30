import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "../components/UserForm";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => setUserData(response.data))
      .catch(error => console.error("Error fetching user", error));
  }, [id]);

  const handleUpdateUser = (updatedUser) => {
    axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser)
      .then(() => navigate("/"))
      .catch(error => console.error("Error updating user", error));
  };

  return (
    <div className="container">
      <h2>Edit User</h2>
      {userData ? <UserForm onSubmit={handleUpdateUser} initialData={userData} /> : <p>Loading...</p>}
    </div>
  );
};

export default EditUser;
