# Assessment-Tools
# Assessment-Tools
# Vite and Flask PostgreSQL Application

This project is a full-stack application with a frontend built using Vite and a backend built using Flask with PostgreSQL as the database. Below are the instructions to set up and run the application.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (for Vite)
- [Python 3](https://www.python.org/) (for Flask)
- [PostgreSQL](https://www.postgresql.org/) (for the database)
- [pip](https://pip.pypa.io/en/stable/) (Python package installer)
- [pipenv](https://pipenv.pypa.io/en/latest/) (Python virtual environment and package management, optional but recommended)

## Project Structure


## Backend Setup

1. **Navigate to the `backend` directory:**

    ```bash
    cd backend
    ```

2. **Set up a virtual environment (optional but recommended):**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3. **Install Python dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Set up PostgreSQL database:**

    - Ensure PostgreSQL is running.
    - Create a new database and user for the application.
    - Update the database configuration in `app.py` or your Flask configuration file with the correct database credentials.

5. **Run database migrations (if applicable):**

    If you have migrations set up, run them to create the necessary database tables:

    ```bash
    flask db upgrade
    ```

6. **Start the Flask server:**

    ```bash
    flask run
    ```

   The Flask server should now be running on `http://localhost:5000`.

## Frontend Setup

1. **Navigate to the `frontend` directory:**

    ```bash
    cd frontend
    ```

2. **Install JavaScript dependencies:**

    ```bash
    npm install
    ```

3. **Run the Vite development server:**

    ```bash
    npm run dev
    ```

   The Vite development server should now be running on `http://localhost:3000` (or another port if specified in your Vite configuration).

## Running the Application

With both servers running:

- **Frontend**: `http://localhost:3000` (or the port Vite is configured to use)
- **Backend**: `http://localhost:5000`

Your frontend application should be able to make requests to the backend API.

## Common Issues

- **CORS Errors**: Ensure that CORS is properly configured in your Flask application. You may need to use the `flask-cors` library to handle CORS.
- **Database Connection Issues**: Double-check your database configuration and ensure that PostgreSQL is running and accessible.

## Scripts

- **Frontend**:
  - `npm run dev` - Starts the Vite development server.
  - `npm run build` - Builds the frontend for production.

- **Backend**:
  - `flask run` - Starts the Flask development server.
  - `flask db upgrade` - Applies database migrations.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Vite](https://vitejs.dev/)
- [Flask](https://flask.palletsprojects.com/)
- [PostgreSQL](https://www.postgresql.org/)
