import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";

const AddUser = () => {
  const navigate = useNavigate();

  const handleAddUser = async (userData) => {
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/users", userData);
      console.log("User Added:", response.data); // Simulated success response
      navigate("/");
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Add User</h2>
      <UserForm onSubmit={handleAddUser} />
    </div>
  );
};

export default AddUser;
