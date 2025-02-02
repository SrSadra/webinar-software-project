import React, { useEffect, useState } from "react";
import apiClient from "../../utils/api-client";
import "./Users.css";
import config from "../../config.json";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({ email: "" });

  // Fetch users from the API
  useEffect(() => {
    apiClient
      .get(`${config.backendURL}/manager/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Handle editing user
  const handleEdit = (user) => {
    setEditingUser(user.username);
    setUpdatedUser({ email: user.email });
  };

  // Handle updating user
  const handleUpdate = (username) => {
    apiClient
      .put(`${config.backendURL}/manager/edit-users/${username}`, updatedUser)
      .then((response) => {
        setUsers(users.map((user) => (user.username === username ? response.data : user)));
        setEditingUser(null);
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  // Handle deleting user
  const handleDelete = (username) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      apiClient
        .delete(`/users/${username}`)
        .then(() => setUsers(users.filter((user) => user.username !== username)))
        .catch((error) => console.error("Error deleting user:", error));
    }
  };

  return (
    <div className="users_page">
      <h1>Users Management</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>
                {editingUser === user.username ? (
                  <input
                    type="text"
                    value={updatedUser.email}
                    onChange={(e) => setUpdatedUser({ email: e.target.value })}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUser === user.username ? (
                  <>
                    <button onClick={() => handleUpdate(user.username)}>Save</button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user.username)}>Delete</button>
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