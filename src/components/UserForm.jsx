
import React, { Component } from "react";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    };
  }

  // Populate form data if editing a user
  componentDidMount() {
    const { user } = this.props;
    if (user) {
      const [firstName, lastName] = user.name.split(" ");
      this.setState({
        firstName: firstName || "",
        lastName: lastName || "",
        email: user.email || "",
        department: user.company?.name || "",
      });
    }
  }

  // Handle input change
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Handle form submission
  handleSubmit = (event) => {
    event.preventDefault();
    const { onSave, user } = this.props;
    const { firstName, lastName, email, department } = this.state;

    onSave({
      id: user?.id,
      name: `${firstName} ${lastName}`,
      email,
      company: { name: department },
    });
  };

  render() {
    const { firstName, lastName, email, department } = this.state;
    const { onCancel, user } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className="user-form">
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={this.handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={this.handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={this.handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="department"
          value={department}
          onChange={this.handleChange}
          placeholder="Department"
          required
        />
        <button type="submit">{user ? "Save Changes" : "Add User"}</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    );
  }
}

export default UserForm;
