# React-Django Blog Application

This is a full-stack blog application built with React for the frontend and Django for the backend. Users can view blog posts, register, log in, create new posts, and comment on existing posts.

## Features

- **User authentication**: Users can register, log in, and log out.
- **CRUD operations**: Users can create, read, update, and delete blog posts.
- **Commenting**: Authenticated users can leave comments on blog posts.
- **Responsive design**: The application is optimized for desktop and mobile devices.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- PostgreSQL installed and running on your local machine.
- Python and pip installed for backend setup.
- Node.js and npm installed for frontend setup.

## Installation

1. Clone the repository:
    ```bash
    git clone [https://github.com/sumanbalayar08/full_blog_app.git] (https://github.com/sumanbalayar08/full_blog_app.git)
    ```

2. Navigate to the project directory:
    ```bash
    cd full_blog_app
    ```

3. Install frontend dependencies:
    ```bash
    npm install
    ```

4. Install backend dependencies:
    ```bash
    cd backend
    cd blogbackend
    ```

## Setup

### Database setup:

1. Create a PostgreSQL database for the project.
2. Configure your database settings in `backend/settings.py`.
3. Run migrations to create database tables:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

## Running the Application

1. Start the backend server:
    ```bash
    python manage.py runserver
    ```

2. Start the frontend server:
    ```bash
    cd ..
    cd ..
    npm start
    ```

3. Access the application in your browser:
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend (admin panel): [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)

## Usage

- Visit the frontend URL in your browser to view the blog posts.
- Register or log in to create new posts and leave comments.
- Access the Django admin panel to manage blog posts and user accounts.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with any improvements or bug fixes.

## License

This project is licensed under the MIT License.

Feel free to adapt and expand upon this template according to your project's specific needs and requirements.
