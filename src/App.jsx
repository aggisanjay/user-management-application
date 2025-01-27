

import React, { Component, createRef } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import axios from "axios";
import "./styles/styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUser: null, // For editing a user
      currentPage: 1,
      usersPerPage: 5,
      error: "",
      isAdding: false,
    };
    this.formRef = createRef(); // Ref for scrolling to form
  }

  componentDidMount() {
    this.fetchUsers();
  }

  // Fetch users from API
  fetchUsers = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      this.setState({ users: response.data });
    } catch (err) {
      this.setState({ error: "Failed to fetch users. Please try again later." });
    }
  };

  // Add a new user
  handleAddUser = async (newUser) => {
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/users", newUser);
      this.setState((prevState) => ({
        users: [...prevState.users, { ...newUser, id: response.data.id || prevState.users.length + 1 }],
        isAdding: false,
      }));
    } catch (err) {
      this.setState({ error: "Failed to add user." });
    }
  };

  // Edit an existing user
  handleEditUser = async (updatedUser) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser);
      this.setState((prevState) => ({
        users: prevState.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        ),
        selectedUser: null,
      }));
    } catch (err) {
      this.setState({ error: "Failed to update user." });
    }
  };

  // Delete a user
  handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      this.setState((prevState) => ({
        users: prevState.users.filter((user) => user.id !== id),
      }));
    } catch (err) {
      this.setState({ error: "Failed to delete user." });
    }
  };

  // Scroll to the form section
  scrollToForm = () => {
    this.formRef.current.scrollIntoView({ behavior: "auto" });
  };

  // Handle page change
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { users, selectedUser, currentPage, usersPerPage, error, isAdding } = this.state;

    const totalPages = Math.ceil(users.length / usersPerPage);
    const currentUsers = users.slice(
      (currentPage - 1) * usersPerPage,
      currentPage * usersPerPage
    );

    return (
      <div className="app">
        <h1>User Management</h1>
        {error && <p className="error">{error}</p>}

        <button
          onClick={() => {
            this.setState({ isAdding: true, selectedUser: null });
            this.scrollToForm(); // Scroll to form
          }}
          className="add-user-btn"
        >
          Add User
        </button>

        <UserList
          users={currentUsers}
          onDelete={this.handleDeleteUser}
          onEdit={(user) => {
            this.setState({ selectedUser: user, isAdding: false });
            this.scrollToForm(); // Scroll to form
          }}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={this.handlePageChange}
        />

        {/* Form Section */}
        <div ref={this.formRef}>
          {(isAdding || selectedUser) && (
            <UserForm
              user={selectedUser}
              onSave={selectedUser ? this.handleEditUser : this.handleAddUser}
              onCancel={() => this.setState({ isAdding: false, selectedUser: null })}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
