import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#007bff", color: "white" }}>
      <h2>User Management Dashboard</h2>
      <Link to="/" style={{ color: "white", marginRight: "10px" }}>Home</Link>
      <Link to="/add-user" style={{ color: "white" }}>Add User</Link>
    </nav>
  );
};

export default Navbar;
