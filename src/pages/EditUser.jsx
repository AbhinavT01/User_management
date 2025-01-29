import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "../components/UserForm";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        alert("Failed to fetch user data.");
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdateUser = async (updatedUser) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser);
      console.log("User Updated:", response.data); // Simulated success response
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Edit User</h2>
      {loading ? <p>Loading...</p> : <UserForm onSubmit={handleUpdateUser} initialData={userData} />}
    </div>
  );
};

export default EditUser;
