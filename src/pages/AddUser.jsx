import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";

const AddUser = () => {
  const navigate = useNavigate(); // Hook to navigate after adding a user

  // Function to handle adding a new user
  const handleAddUser = async (userData) => {
    try {
      // Sending a POST request to add a new user
      const response = await axios.post("https://jsonplaceholder.typicode.com/users", userData);
      console.log("User Added:", response.data); // Logging added user data
      navigate("/"); // Redirecting to home page after successful addition
    } catch (error) {
      console.error("Error adding user:", error); // Logging the error in console
      alert("Failed to add user. Please try again."); // Showing error message to user
    }
  };

  return (
    <div className="container">
      <h2>Add User</h2>
      {/* Rendering the UserForm component and passing handleAddUser function */}
      <UserForm onSubmit={handleAddUser} />
    </div>
  );
};

export default AddUser;
