# Learning Management System (LMS) API

## Overview
This is a **full-stack** LMS application similar to Udemy, built with **Node.js, Prisma, TypeScript, Express, and React**. It includes authentication, course management, enrollments, lectures, progress tracking, and purchases.

## Tech Stack
### **Backend:**
- **Node.js** with **Express.js** (API development)
- **Prisma** (ORM for PostgreSQL)
- **JWT Authentication** (Access & Refresh tokens)
- **Rate Limiting** (Prevents abuse on auth routes)
- **Swagger** (API Documentation)
- **Docker & Docker Compose** (Database containerization)

### **Frontend:**
- **React + TypeScript** (Component-based UI)
- **Redux Toolkit** (State management)
- **Material UI & Framer Motion** (UI & animations)
- **Axios** (API requests)
- **Toastify** (Notifications)

## Features
- **User Authentication:** Signup, Login, Logout, Refresh Token
- **Course Management:** CRUD operations for courses
- **Lecture System:** Add lectures to courses
- **Progress Tracking:** Track completion of lectures
- **Enrollment System:** Users can enroll in courses
- **Purchases:** Secure course purchases with tracking
- **Rate Limiting:** Protects API from excessive requests

## Installation & Setup
### **Backend**
1. Clone the repository:
   ```sh
   git clone https://github.com/aman75way/LMS
   cd LMS
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start PostgreSQL using Docker:
   ```sh
   docker-compose up -d
   ```
4. Apply database migrations:
   ```sh
   npx prisma migrate dev --name init
   ```
5. Start the backend server:
   ```sh
   npm run dev
   ```

### **Frontend**
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm run dev
   ```

## API Documentation
Swagger API documentation is available at:
```
http://localhost:5000/api-docs
```

## Environment Variables
| Variable         | Description                |
|-----------------|----------------------------|
| `PORT`          | Server port (default: 5000) |
| `DATABASE_URL`  | PostgreSQL connection URL |
| `JWT_SECRET`    | Secret key for JWT        |
| `FRONTEND_URL`  | Frontend base URL (CORS)  |

## Project Structure
```
lms-api/
├── backend/
│   ├── app/
│   │   ├── auth/         # Authentication module
│   │   ├── course/       # Course management
│   │   ├── enrollment/   # Enrollment system
│   │   ├── lecture/      # Lecture system
│   │   ├── progress/     # Progress tracking
│   │   ├── purchase/     # Course purchases
│   │   ├── common/       # Middleware & utilities
│   ├── prisma/          # Prisma schema
│   ├── docker-compose.yml
│   ├── index.ts         # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   ├── public/
│   ├── index.tsx
```

[GitHub](https://github.com/aman75way/LMS)

