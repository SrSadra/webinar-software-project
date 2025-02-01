import React, { useEffect, useState } from "react";
import apiClient from "../../utils/api-client";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({ name: "", password: "" });

  // Fetch users from the API
  useEffect(() => {
    apiClient
      .get("/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Handle editing user
  const handleEdit = (user) => {
    setEditingUser(user._id);
    setUpdatedUser({ name: user.name, password: "" });
  };

  // Handle updating user
  const handleUpdate = (id) => {
    apiClient
      .put(`/users/${id}`, updatedUser)
      .then((response) => {
        setUsers(users.map((user) => (user._id === id ? response.data : user)));
        setEditingUser(null);
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  // Handle deleting user
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      apiClient
        .delete(`/users/${id}`)
        .then(() => setUsers(users.filter((user) => user._id !== id)))
        .catch((error) => console.error("Error deleting user:", error));
    }
  };

  return (
    <div className="users_page">
      <h1>Users Management</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {editingUser === user._id ? (
                  <input
                    type="text"
                    value={updatedUser.name}
                    onChange={(e) =>
                      setUpdatedUser({ ...updatedUser, name: e.target.value })
                    }
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>{user.email}</td>
              <td>
                {editingUser === user._id ? (
                  <>
                    <button onClick={() => handleUpdate(user._id)}>Save</button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
