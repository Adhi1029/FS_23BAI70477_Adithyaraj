# Full Stack Development Lab – React & Spring Boot Experiments

**Student Name:** Adithyaraj  
**Register Number:** 23BAI70477  
**Course:** Full Stack Development Lab  
**Repository:** [FS_23BAI70477_Adithyaraj](https://github.com/Adhi1029/FS_23BAI70477_Adithyaraj)  

This repository contains a comprehensive series of experiments demonstrating modern Full Stack development. It transitions from frontend Single Page Application (SPA) architecture using React, UI libraries, and advanced state management, to secure backend API development using Spring Boot with JWT Authentication and Role-Based Access Control (RBAC).

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
1. Set up the development environment (Git, Node.js, npm, VS Code).
2. Understand modern frontend frameworks and SPA architecture.
3. Create a functional SPA with basic components and React Hooks.
4. Deploy the application to a hosting platform (Vercel).

### Description
This introductory experiment establishes the foundational React environment. It demonstrates how to build a Single Page Application (SPA) using Vite, managing state efficiently, and deploying the initial build to Vercel via GitHub integration.

### Technologies Used
* React.js (Vite), Node.js, npm
* Vercel (Deployment)

---

## EXPERIMENT 2: UI Component Libraries & Modern Design
### Objectives
1. Learn component-based UI design and React folder structuring.
2. Build a meaningful, real-world webpage.
3. Apply modern UI/UX principles using established component libraries.

### Description
This experiment focuses on visual aesthetics and responsive layouts. The application integrates modern UI libraries to create a sleek, visually appealing landing page/dashboard. It emphasizes proper spacing, typography, and mobile-first responsive design.

### Technologies Used
* Bootstrap (Layout & Styling)
* Material UI / MUI (Components)

---

## EXPERIMENT 3: Client-Side Routing
### Objectives
1. Understand the use of React Router DOM.
2. Create multiple interconnected pages within the SPA.
3. Extend the webpage structure while maintaining consistent UI design.

### Description
Building upon Experiment 2, this project introduces multi-page navigation without triggering a full page reload. A secondary page (e.g., Projects, Contact, or Analytics) is added and linked via React Router, demonstrating seamless client-side routing.

### Technologies Used
* React Router DOM (v6)

---

## EXPERIMENT 4: Global State Management & Optimization (useReducer)
### Objectives
1. Understand global state using the Context API.
2. Manage complex state transitions using `useReducer`.
3. Optimize derived calculations using `useMemo`.

### Description
This experiment introduces structured state updates. A global Context provider wraps the application, while `useReducer` handles complex state logic (like a cart, task list, or favorites). `useMemo` is implemented to prevent unnecessary re-rendering of derived data, optimizing app performance.

### Technologies Used
* React Hooks: `useContext`, `useReducer`, `useMemo`

---

## EXPERIMENT 5: Advanced State Management (Redux Toolkit)
### Objectives
1. Replace `useReducer` with structured, scalable state management using Redux Toolkit.
2. Use Context API for overarching app properties (theme/auth/profile).
3. Extend the multi-page React app with a new route utilizing Redux state.

### Description
This update enhances the application by migrating state logic to Redux Toolkit for centralized, predictable data flows. A store and slices are configured to manage application state across multiple components, demonstrating production-ready state architecture.

### Technologies Used
* Redux Toolkit (`configureStore`, `createSlice`, `useDispatch`, `useSelector`)
* Context API & `useMemo`

---

## EXPERIMENT 6: Backend Security & JWT Authentication
### Objectives
1. Implement JWT Authentication in a Spring Boot backend.
2. Manage user sessions statelessly.
3. Secure specific routes and test authentication processes using Postman.

### Description
This experiment shifts to backend development. A Spring Boot REST API is constructed featuring a `/login` endpoint that generates a JSON Web Token (JWT). A custom security filter intercepts requests to `/protected` endpoints, validating the `Bearer` token to ensure stateless, secure access.

### Technologies Used
* Java 17+, Maven, Spring Boot 3
* Spring Security, Spring Data JPA, H2 Database
* JJWT (JSON Web Token Library)
* Postman (API Testing)



---

## EXPERIMENT 7: Backend Role-Based Access Control (RBAC)
### Objectives
1. Implement Role-Based Authorization in Spring Boot (`ADMIN` vs `USER`).
2. Restrict API access based on assigned user roles.
3. Understand the difference between `401 Unauthorized` and `403 Forbidden`.

### Description
Building on backend security, this experiment introduces granular authorization. Users are assigned specific roles in the database. The `SecurityFilterChain` is configured to ensure that only `ADMIN` users can access administrative endpoints, while standard `USER` accounts receive a `403 Forbidden` error if they attempt to breach access levels.

### Technologies Used
* Spring Boot Security (RBAC configurations)
* Postman (Multi-role testing)


---

## EXPERIMENT 8: Frontend Integration with JWT APIs
### Objectives
1. Build a React frontend that consumes the Spring Boot JWT APIs from Exp 6.
2. Implement session-based authentication storing the token in `sessionStorage`.
3. Restrict UI access to pages based on login state.

### Description
This experiment connects the React frontend to the Spring Boot backend. A login UI captures user credentials, POSTs them to the backend, and securely stores the resulting JWT in `sessionStorage`. Protected routes in React read this token, allowing access to the dashboard or redirecting unauthenticated users back to the login screen.

### Technologies Used
* React.js, Axios / Fetch API
* `sessionStorage`
* Bootstrap & Material UI



---

## EXPERIMENT 9: Frontend Role-Based Access Control (RBAC) UI
### Objectives
1. Integrate the React frontend with the Spring Boot RBAC backend from Exp 7.
2. Hide/show UI components dynamically based on roles (`USER` / `ADMIN`).
3. Demonstrate strict role-based access control from the frontend.

### Description
The final experiment implements complete frontend authorization. Upon login, both the JWT and the User Role are stored in `sessionStorage`. The application dynamically renders navigation links and dashboard components based on these roles. If a `USER` attempts to access an `ADMIN` page, the application elegantly catches the `403 Forbidden` response and displays an unauthorized error alert.

### Technologies Used
* React.js, Axios Interceptors
* Conditional Rendering & Route Guards
