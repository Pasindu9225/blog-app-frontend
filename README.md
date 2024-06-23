# MERN Stack Blog Application Frontend

This is the frontend part of a MERN stack blog application. The frontend is built using React.js and styled with Tailwind CSS. It provides a user-friendly interface for creating, reading, updating, and deleting blog posts, along with user authentication and a comment system.

## Features

- **User Authentication:** Secure login and registration.
- **Blog Management:** CRUD (Create, Read, Update, Delete) operations for blog posts.
- **Image Upload:** Upload and display images for each blog post.
- **Comment System:** Engage with readers through a built-in commenting feature.
- **Responsive Design:** Seamless user experience across devices with a fully responsive layout.

## Technologies Used

- **Frontend:** React.js
- **State Management:** Redux
- **Styling:** Tailwind CSS
- **API Integration:** Axios

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/en/)
- npm (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Pasindu9225/blog-app-frontend.git
   cd blog-app-frontend
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory and add your API base URL:**

   ```env
   REACT_APP_INTERNAL_API=http://localhost:5000/api
   ```

4. **Start the development server:**

   ```bash
   npm start
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

- `src`: Contains the source code
  - `api`: Axios API calls
  - `components`: Reusable components
  - `pages`: Application pages
  - `redux`: Redux store and slices
  - `App.js`: Main application component
  - `index.js`: Entry point of the application

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note:** This is a one-way operation. Once you `eject`, you can’t go back!

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you would like to contribute.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to reach out.

- **Email:** pasindu9225@gmail.com
- **GitHub:** [Pasindu9225](https://github.com/Pasindu9225)
