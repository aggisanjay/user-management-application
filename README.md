# User Management Web Application

This is a simple web application where users can view, add, edit, and delete user details. It interacts with the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) to simulate the user data and CRUD operations.

## Features:
- **View Users**: Displays a list of users with ID, First Name, Last Name, Email, and Department.
- **Add User**: Allows the user to add a new user (using a mock API).
- **Edit User**: Allows the user to edit existing user details.
- **Delete User**: Allows the user to delete a user (simulated by mock API).
- **Pagination**: Supports pagination to manage large data sets.
- **Responsive Design**: The app is responsive and works well on mobile and desktop screens.

## Setup Instructions:

1. **Clone the Repository**:

   git clone https://github.com/your-username/your-repository-name.git
   
   cd your-repository-name
   
2.**Install Dependencies**:

  npm install

3.**Run Application**:

  npm run dev

The app should be available at http://localhost:3000 OR 5173.

**Development Challenges**:

1.Simulating Real Data with JSONPlaceholder: Although JSONPlaceholder is an excellent resource for testing, it's not a real database, and changes don't persist after page reload. This 
  limited some of the functionality during testing (e.g., adding a user only simulates the action without real data storage).

2.Handling Errors and Edge Cases: Dealing with failed API requests (e.g., network errors) required careful error handling to make sure users have a smooth experience.

3.Pagination: Implementing pagination with a mock API was a bit tricky, especially when there was no real control over the number of users returned. I had to manually paginate based on a 
  fixed number of users.


  

  
  
