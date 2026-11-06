# MERN-Intern-Assignment-Prerana-Maiti
<img width="1886" height="852" alt="image" src="https://github.com/user-attachments/assets/9c8635bf-3a20-4285-83ef-977cd9a2c423" />
<b>Dashboard</b>
<img width="1890" height="960" alt="image" src="https://github.com/user-attachments/assets/f5de426f-6da4-4ea4-9b6e-521eb16c28bd" />
<b>Register Page</b>
<img width="1916" height="852" alt="image" src="https://github.com/user-attachments/assets/dd3d01af-b414-4e55-9fb3-592e3baad756" />
<Login Page>
# TaskFlow – Project & Task Management Application

TaskFlow is a MERN Stack-based project and task management application designed to help users organize projects, manage tasks, track progress, and monitor deadlines.

The application supports user authentication, project management, task management, task prioritization, status tracking, and dashboard statistics.

## Tech Stack

**Frontend**
- React.js
- Vite
- Bootstrap 5
- Axios
- React Router DOM

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcryptjs

## Features Implemented

### 1. Authentication
- User registration with name, email, and password.
- Password hashing using bcryptjs.
- User login with JWT authentication.
- Protected backend API routes.
- Logout functionality on the frontend.

### 2. Project Management
- Create new projects.
- View projects belonging to the logged-in user.
- Update project details.
- Delete projects.
- Automatically delete associated tasks when a project is deleted.
- Project access restricted to project owners.

### 3. Task Management
- Create tasks within projects.
- View tasks belonging to a project.
- Update task details.
- Delete tasks.
- Set task priority: Low, Medium, or High.
- Set task status: To Do, In Progress, or Done.
- Assign due dates.
- Change task status through a separate API.

### 4. Filtering and Search
- Filter tasks by status.
- Filter tasks by priority.
- Search tasks by title.
- Combine multiple filters and search conditions.

### 5. Dashboard
- Total projects count.
- Total tasks count.
- Completed tasks count.
- Pending tasks count.
- Overdue tasks count.
- Overdue task details.

### 6. Admin API
- Admin-only protected endpoint.
- View all registered users.
- View all projects.
- Display total user and project counts.

## Project Structure

```text
Task_Tracker/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   ├── taskController.js
│   │   ├── dashboardController.js
│   │   └── adminController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── taskRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── adminRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

## Prerequisites

Before running the application, install:

- Node.js and npm
- MongoDB Atlas account
- Git

## Installation and Setup

### Step 1: Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate into the project:

```bash
cd Task_Tracker
```

### Step 2: Configure the Backend

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace the MongoDB connection string with your own MongoDB Atlas connection string.

**Important:** Never commit your `.env` file or expose your database credentials.

Start the backend server:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

You can verify the server by opening the URL in your browser.

Expected response:

```text
TaskFlow API is running
```

### Step 3: Configure the Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

Open this URL in your browser to access TaskFlow.

## API Endpoints

All endpoints use the base URL:

`http://localhost:5000/api`

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a user |
| POST | `/auth/login` | Login a user |

### Projects

| Method | Endpoint | Description |
|---|---|---|
| POST | `/projects` | Create a project |
| GET | `/projects` | Get user's projects |
| PUT | `/projects/:id` | Update a project |
| DELETE | `/projects/:id` | Delete a project and its tasks |

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| POST | `/tasks/:projectId` | Create a task |
| GET | `/tasks/:projectId` | Get project tasks |
| PUT | `/tasks/:taskId` | Update a task |
| PATCH | `/tasks/:taskId/status` | Update task status |
| DELETE | `/tasks/:taskId` | Delete a task |

Optional task query parameters:

- `status`
- `priority`
- `search`

Example:

```text
GET /tasks/PROJECT_ID?status=In%20Progress&priority=High&search=login
```

### Dashboard

| Method | Endpoint | Description |
|---|---|---|
| GET | `/dashboard` | Get dashboard statistics |

### Admin

| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/overview` | View users and projects |

Protected endpoints require a JWT token in the Authorization header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

## Current Development Status

The backend APIs for authentication, project management, task management, filtering, search, dashboard statistics, and admin overview have been implemented.

The React frontend currently includes:
- Registration page
- Login page
- Initial dashboard page
- Axios API configuration
- Bootstrap styling

**Frontend development is still in progress.** The complete project and task management interface, filtering controls, frontend validation, and responsive refinements are yet to be completed.

## Future Improvements

- Complete project and task management interfaces.
- Add task filtering and search controls to the frontend.
- Improve frontend form validation and error handling.
- Add loading indicators and success notifications.
- Improve mobile responsiveness.
- Complete admin dashboard interface.

---

**Developed as part of the MERN Stack Intern Assignment – HSR Hi-Tech Solutions.**


