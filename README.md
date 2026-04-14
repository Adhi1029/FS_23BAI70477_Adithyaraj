# Full Stack Development Lab – React & Spring Boot Experiments

**Student Name:** Adithyaraj  
**Register Number:** 23BAI70477  
**Course:** Full Stack Development Lab  
**Repository:** [FS_23BAI70477_Adithyaraj](https://github.com/Adhi1029/FS_23BAI70477_Adithyaraj)  

This repository contains a series of experiments demonstrating modern frontend development using React, SPA architecture, UI libraries, routing, advanced state management, and backend API security using Spring Boot.

---

## 🚀 Live Deployments
* **Experiment 1:** [Deployment Link](https://23-bai-70477-adithyarajexp1.vercel.app/)
* **Experiment 2:** [Deployment Link](https://23-bai-70477-adithyarajexp2.vercel.app/)
* **Experiment 3:** [Deployment Link](https://23-bai-70477-adithyarajexp3.vercel.app/)
* **Experiment 5:** [Deployment Link](https://fs-23-bai-70477-adithyaraj-exp5.vercel.app/)
* **Main App:** [Deployment Link](https://fs-23-bai-70477-adithyaraj.vercel.app/)

---

## EXPERIMENT 1: Modern Frontend Frameworks and SPA Development
### Objectives
1. Understand modern frontend frameworks and SPA architecture
2. Set up development environment with Node.js and npm
3. Create a functional SPA with basic components
4. Implement client-side routing for navigation
5. Manage component state using React Hooks
6. Integrate external APIs and handle data fetching
7. Deploy SPA to a hosting platform

### Description
This experiment introduces React as a modern frontend framework and demonstrates how to build a Single Page Application (SPA). The application uses reusable components, manages state efficiently, and integrates external APIs for dynamic content. The SPA architecture enables seamless navigation without page reloads, improving performance and user experience.

### Technologies Used
* React.js, Vite
* Node.js & npm
* JavaScript (ES6+), HTML5 & CSS3
* Vercel (Deployment)

### Features Implemented
* Component-based architecture
* React Hooks (`useState`, `useEffect`)
* API data fetching & SPA navigation

---

## EXPERIMENT 5: Advanced State Management, Context API, and Performance Optimization
### Objectives
1. Learn structured, scalable state management using **Redux Toolkit**.
2. Use **Context API** for app-wide concerns (e.g., theme, auth, or profile).
3. Optimize derived calculations using **`useMemo`**.
4. Extend a multi-page React app while maintaining consistent UI/UX.

### Description
Building upon previous experiments, this update enhances the existing application by replacing standard state management with Redux Toolkit for complex data flows. It introduces a global Context API for overarching app properties and utilizes `useMemo` to prevent unnecessary re-rendering of derived data computations. 

### Technologies & Concepts Used
* **Redux Toolkit:** `configureStore`, `createSlice`, `useDispatch`, `useSelector`
* **Context API:** `createContext`, `useContext`

---

## EXPERIMENT 8: Frontend Integration with JWT Authentication
### Objectives
1. Build a modern React frontend UI that consumes Spring Boot JWT APIs.
2. Implement strict session-based authentication using `sessionStorage`.
3. Restrict UI access to protected pages based on the user's login state.
4. Establish clean API call architecture using Axios.

### Description
This experiment bridges the gap between the frontend UI and the secure backend built in Experiment 6. The application leverages **Material UI (MUI)** for polished form components and **Bootstrap** for responsive grid layouts. It features a robust Authentication Flow: upon successful login, a JWT is stored locally in `sessionStorage`. A custom `ProtectedRoute` wrapper is implemented to guard internal routes, ensuring only authenticated users can view sensitive dashboard data.

### Technologies Used
* React.js (Vite)
* React Router DOM (v6)
* Material UI (MUI) & Bootstrap
* Axios (HTTP Client)

### Features Implemented
* Secure Login Interface with MUI styling.
* `sessionStorage` manipulation for token management.
* High-Order Components (HOC) for protected routing.
* State-driven conditional redirects (Unauthorized users sent to `/login`).
* Logout functionality that clears session data completely.

### 📸 Execution Screenshots
> **[INSERT SCREENSHOT 1: Login UI]** > **[INSERT SCREENSHOT 2: Token stored in sessionStorage (DevTools)]** > **[INSERT SCREENSHOT 3: Access protected API (data visible on UI)]** > **[INSERT SCREENSHOT 4: Unauthorized access handling (redirect to login)]** > **[INSERT SCREENSHOT 5: Logout functionality]**

---

## EXPERIMENT 9: Role-Based Access Control (RBAC) UI Implementation
### Objectives
1. Build a React frontend that securely integrates with a Spring Boot RBAC backend.
2. Store and manage multifaceted session data (both Token and Role).
3. Dynamically hide/show UI components based on the active user role (`USER` vs `ADMIN`).
4. Enforce strict route protection to prevent URL-bypassing.

### Description
Experiment 9 elevates the application's security posture by implementing dynamic Authorization. The frontend now parses role-based data upon login and adjusts the entire user experience accordingly. An **Axios Interceptor** automates the attachment of `Bearer` tokens to every outgoing request. 

The UI features intelligent rendering: standard users only see the User Dashboard and are actively blocked (with HTTP 403 handling) if they attempt to navigate to Admin-exclusive routes. Administrators are granted full visibility, including an exclusive Admin Panel.

### Technologies Used
* React.js (Vite) & React Router DOM
* Axios (with Interceptors)
* Material UI (Snackbars, Cards, Navigation) & Bootstrap

### Features Implemented
* **Role Extraction:** Capturing and storing `ADMIN` or `USER` roles in `sessionStorage`.
* **Dynamic Navigation:** Navbar items conditionally render based on the current session role.
* **Granular Route Guards:** `AdminRoute` wrappers that explicitly check for `ADMIN` clearance.
* **Error Handling:** Elegant interception of `403 Forbidden` responses displaying Material UI alerts.
