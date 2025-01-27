import React, { Component, createRef } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import axios from 'axios';
import './styles/styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUser: null, // For editing a user
      currentPage: 1,
      usersPerPage: 5,
      error: '',
      isAdding: false,
    };
    this.formRef = createRef(); // Ref for scrolling to form
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const usersWithSNo = response.data.map((user, index) => ({
        ...user,
        sNo: index + 1,
      }));
      this.setState({ users: usersWithSNo });
    } catch (err) {
      this.setState({ error: 'Failed to fetch users. Please try again later.' });
    }
  };

  handleAddUser = async (newUser) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
      const updatedUsers = [
        ...this.state.users,
        { ...newUser, id: response.data.id || this.state.users.length + 1 },
      ].map((user, index) => ({ ...user, sNo: index + 1 })); // Recalculate S.No
      this.setState({ users: updatedUsers, isAdding: false });
    } catch (err) {
      this.setState({ error: 'Failed to add user.' });
    }
  };

  handleEditUser = async (updatedUser) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser);
      const updatedUsers = this.state.users
        .map((user) => (user.id === updatedUser.id ? updatedUser : user))
        .map((user, index) => ({ ...user, sNo: index + 1 })); // Recalculate S.No
      this.setState({ users: updatedUsers, selectedUser: null });
    } catch (err) {
      this.setState({ error: 'Failed to update user.' });
    }
  };

  handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      const updatedUsers = this.state.users
        .filter((user) => user.id !== id)
        .map((user, index) => ({ ...user, sNo: index + 1 })); // Recalculate S.No
      this.setState({ users: updatedUsers });
    } catch (err) {
      this.setState({ error: 'Failed to delete user.' });
    }
  };

  scrollToForm = () => {
    this.formRef.current.scrollIntoView({ behavior: 'smooth' });
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
            this.scrollToForm();
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
            this.scrollToForm();
          }}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => this.setState({ currentPage: page })}
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
