# Experiment 10: Node.js & MongoDB CRUD REST API

## 📖 Objectives
The goal of this assignment is to develop a production-ready RESTful API using Node.js, Express.js, and MongoDB (via Mongoose). This API performs Create, Read, Update, and Delete (CRUD) operations on a `Student` resource, showcasing an understanding of basic backend web development principles, database interactions, schema validation, and error handling.

## 🚀 Tech Stack
- **Runtime Environment:** Node.js
- **Web Framework:** Express.js
- **Database:** MongoDB
- **ODM (Object Data Modeling):** Mongoose
- **Middleware:** CORS, Express JSON Parser

## ✨ Features implemented
- **Complete CRUD Operations:** Create, Read (All & Single), Update, Delete for `Student` records.
- **Mongoose Schema Validation:** Enforces data integrity (e.g., required fields, string trimming, unique emails, and regex validation for email formats).
- **Global Error Handling:** centralized error handling middleware to capture and process errors, including validation errors and bad object IDs, returning graceful JSON responses.
- **Proper HTTP Status Codes:** Returns semantic status codes (`201 Created`, `200 OK`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`).
- **Robust Exception Handling:** `try/catch` blocks wrap all asynchronous database operations to prevent unhandled promise rejections.
- **CORS Support:** Configured to allow cross-origin requests.

---

## 🛠️ Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) installed.
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally on the default port (`27017`), or a MongoDB Atlas URI.

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd experiment10
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   A `.env` file has been provided in the root directory. Ensure it contains the correct settings:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/experiment10_db
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   *The server should start on `http://localhost:5000` and confirm a successful database connection.*

---

## 📚 API Documentation

| Method | Endpoint | Description | Expected Body | Success Response |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/students` | Creates a new student record. | `{ "name": "...", "email": "...", "course": "..." }` | `201 Created` |
| `GET` | `/api/students` | Retrieves all student records. | *None* | `200 OK` |
| `GET` | `/api/students/:id` | Retrieves a specific student by ID. | *None* | `200 OK` |
| `PUT` | `/api/students/:id` | Updates an existing student record. | `{ "name": "...", "course": "..." }` | `200 OK` |
| `DELETE` | `/api/students/:id` | Deletes a student record by ID. | *None* | `200 OK` |

---

## 📸 Screenshots & Output Validation

### 1. MongoDB Connected Message (Terminal)
> *(Insert screenshot showing successful connection message in the terminal when running `npm run dev`)*
> 
> **Placeholder:** `[Screenshot 1]`

### 2. Create Record API Success (Postman)
> *(Insert screenshot of Postman executing a `POST /api/students` request and receiving a `201 Created` response)*
> 
> **Placeholder:** `[Screenshot 2]`

### 3. Read All Records Output (Postman)
> *(Insert screenshot of Postman executing a `GET /api/students` request, returning an array of student records with a `200 OK` status)*
> 
> **Placeholder:** `[Screenshot 3]`

### 4. Update Record Success (Postman)
> *(Insert screenshot of Postman executing a `PUT /api/students/:id` request and showing the updated data in the response)*
> 
> **Placeholder:** `[Screenshot 4]`

### 5. Delete Record Success (Postman)
> *(Insert screenshot of Postman executing a `DELETE /api/students/:id` request and receiving a success message)*
> 
> **Placeholder:** `[Screenshot 5]`

### 6. Database Collection View (MongoDB Compass / Atlas)
> *(Insert screenshot of MongoDB Compass or Atlas showing the created records in the `experiment10_db` database, inside the `students` collection)*
> 
> **Placeholder:** `[Screenshot 6]`
