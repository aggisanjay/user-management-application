import React, { Component } from 'react';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      department: '',
    };
  }

  componentDidMount() {
    if (this.props.user) {
      const [firstName, lastName] = this.props.user.name.split(' ');
      this.setState({
        firstName: firstName || '',
        lastName: lastName || '',
        email: this.props.user.email || '',
        department: this.props.user.company.name || '',
      });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { onSave, user } = this.props;
    onSave({
      id: user?.id,
      name: `${this.state.firstName} ${this.state.lastName}`,
      email: this.state.email,
      company: { name: this.state.department },
    });
  };

  render() {
    const { onCancel } = this.props;
    const { firstName, lastName, email, department } = this.state;

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
        <button type="submit">{this.props.user ? 'Save Changes' : 'Add User'}</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    );
  }
}

export default UserForm;
