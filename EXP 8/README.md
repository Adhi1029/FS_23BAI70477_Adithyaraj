# Experiment 8: React Frontend with JWT Authentication

## **Objective**
To build a production-ready React frontend application that consumes a secured Spring Boot REST API. The frontend must implement a robust authentication flow using JSON Web Tokens (JWT), complete with protected routing, secure token storage, and an automated request interception mechanism.

## **Technologies Used**
- **Frontend Framework:** React 18 (Initialized with Vite)
- **Routing:** React Router v6 (`react-router-dom`)
- **HTTP Client:** Axios (with custom interceptors)
- **Styling & UI:** Modern CSS, Material UI (MUI), Bootstrap Grid
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Storage:** Browser `sessionStorage`

## **Features Implemented**
- **Sleek UI Design:** Glassmorphism styled components with a responsive, modern aesthetic.
- **Login Authentication flow:** Communicates with the `POST /login` endpoint on the backend.
- **Protected Routing (`ProtectedRoute.jsx`):** Secures the `/dashboard` page from unauthenticated users.
- **JWT Storage:** Securely stores the received authentication token in `sessionStorage`.
- **Axios Interceptors:** A unified `api` instance automatically attaches the `Authorization: Bearer <token>` header to all outgoing requests.
- **Global Error Handling:** Invalid tokens or `401 Unauthorized` responses automatically log the user out and redirect to `/login`.
- **Logout Functionality:** Securely clears the session and forces re-authentication.

---

## **Application Screenshots**

#### **1. Login UI**
*(Placeholder for: Screenshot of the centered, glassmorphism Login page)*

#### **2. Token stored in sessionStorage**
*(Placeholder for: Screenshot of Browser Developer Tools -> Application -> Session Storage showing the `token` key)*

#### **3. Accessing Protected API**
*(Placeholder for: Screenshot of the `/dashboard` page displaying the successfully fetched protected data from the backend)*

#### **4. Unauthorized access attempt**
*(Placeholder for: Screenshot of the app redirecting an unauthenticated user back to `/login` when trying to manually navigate to `/dashboard`)*

#### **5. Logout functionality**
*(Placeholder for: Screenshot showing the session storage cleared and the user returned to the Login page after clicking Logout)*

---

## **Setup & Execution Instructions**

**1. Install Dependencies**
```bash
npm install
```

**2. Start the Development Server**
```bash
npm run dev
```

**3. Run the Backend API**
Ensure the Spring Boot backend from Experiment 6 is running locally on port `5000`.

**4. View Application**
Open `http://localhost:5173` in your browser.
