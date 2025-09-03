Task Management App

A full-stack Task Management application that allows users to register, log in, manage projects, and handle tasks efficiently. Built with Node.js, Express, MySQL, Sequelize, React, and Axios.

Features

Authentication

User registration and login using email and password.

JWT-based authentication for secure access.

Protected API routes for authenticated users.

Dashboard

Display all projects for the logged-in user.

Add new projects with a title and description.

Click on a project to view detailed tasks.

Project Detail & Task Management

List all tasks under a project.

Create, edit, delete, and assign tasks.

Filter tasks by status (Todo, In Progress, Done) or assignee.

Real-time UI updates without refreshing the page.

Technology Stack

Frontend: React, Axios, Inline CSS

Backend: Node.js, Express

Database: MySQL with Sequelize ORM

Authentication: JSON Web Tokens (JWT)

Deployment (Optional): Docker

Installation and Setup

Clone the repository

Install dependencies for backend and frontend.

Set up environment variables for database credentials, JWT secret, and port.

Start the backend server using npm run dev.

Start the frontend server using npm start.

Open the app in a browser at http://localhost:3000.

Project Structure

Backend

models/ – Sequelize models

routes/ – API routes (auth, projects, tasks)

index.js – Backend entry point

.env – Environment variables

Frontend

src/pages/ – React pages (Login, Register, Dashboard, ProjectDetail)

src/api/ – Axios API calls

App.js – Main React component

Optional

docker-compose.yml – For MySQL container deployment

API Endpoints

Authentication

POST /api/auth/register – Register a new user

POST /api/auth/login – Login user and get JWT token

Projects

GET /api/projects – List all projects

POST /api/projects – Create a new project

Tasks

GET /api/tasks/:projectId – List tasks for a project

POST /api/tasks – Create a new task

PUT /api/tasks/:id – Update an existing task

DELETE /api/tasks/:id – Delete a task
