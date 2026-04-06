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
* React.js
* Node.js & npm
* JavaScript (ES6+)
* HTML5 & CSS3
* Vite
* Vercel (Deployment)

### Features Implemented
* Component-based architecture
* React Hooks (`useState`, `useEffect`)
* API data fetching
* SPA navigation & Responsive UI
* Deployment on Vercel

### Learning Outcomes
* Understanding SPA architecture

---

## EXPERIMENT 5: Advanced State Management, Context API, and Performance Optimization

### Objectives
1. Learn structured, scalable state management using **Redux Toolkit**.
2. Use **Context API** for app-wide concerns (e.g., theme, auth, or profile).
3. Optimize derived calculations using **`useMemo`**.
4. Extend a multi-page React app while maintaining consistent UI/UX.

### Description
Building upon previous experiments, this update enhances the existing application by replacing standard state management with Redux Toolkit for complex data flows. It introduces a global Context API for overarching app properties and utilizes `useMemo` to prevent unnecessary re-rendering of derived data computations. Additionally, a new dedicated page is integrated using React Router to demonstrate these combined features.

### Technologies & Concepts Used
* **Redux Toolkit:** `configureStore`, `createSlice`, `useDispatch`, `useSelector`
* **Context API:** `createContext`, `useContext`

---

## EXPERIMENT 6: Backend Security and JWT Authentication

### Objectives
1. Implement JWT (JSON Web Token) Authentication in a backend application.
2. Manage user sessions statelessly using Spring Security.
3. Understand how to use Postman for testing authentication processes and API endpoints.
4. Learn about session management and cryptographic token validation in web applications.

### Description
This experiment transitions from frontend development to backend security by implementing a robust Authentication and Authorization system using Spring Boot (Java). The application features a custom `JwtFilter` middleware that intercepts incoming HTTP requests. 

For testing and demonstration purposes, the `/login` route bypasses strict database validation—accepting any credentials—to immediately generate and sign an HMAC-SHA JWT token. This token must then be passed as a `Bearer` token in the `Authorization` header to successfully access the `/protected` route, demonstrating stateless session management.

### Technologies Used
* Java 17+ & Maven
* Spring Boot 3 (Spring Web, Spring Data JPA)
* Spring Security 6+ (Stateless SecurityFilterChain)
* JJWT (0.11.2) (JSON Web Token library)
* H2 Database (In-memory database)
* Postman (API Testing)

### Features Implemented
* **Stateless Authentication:** Server runs on Port 5000 with a strictly stateless session policy.
* **Token Generation:** `JwtUtil` class to generate and sign JWTs upon a `POST` request to `/login`.
* **Middleware Interception:** `JwtFilter` implementation to extract and validate tokens from request headers.
* **Route Protection:** Public access granted to `/login` and `/h2-console`, while `/protected` requires a valid cryptographic token.

### Running the Application
1. Navigate to the `EXP 6` directory.
2. Ensure Maven is installed and run: `mvn clean compile` followed by `mvn spring-boot:run`.
3. The server will start on `http://localhost:5000`.

### Screenshots
* *(Add screenshot here: POST request to `http://localhost:5000/login` receiving the JWT token)*
* *(Add screenshot here: GET request to `http://localhost:5000/protected` using the `Authorization: Bearer <token>` header)*
* *(Add screenshot here: GET request to `http://localhost:5000/protected` without a token, returning a `403 Forbidden` error)*

---

## EXPERIMENT 7: Role-Based Access Control (RBAC) in Spring Boot

### Objectives
1. Implement authentication and authorization in Spring Boot.
2. Restrict API access using roles (`ROLE_USER`, `ROLE_ADMIN`).
3. Configure Spring Security for secured endpoints.
4. Test protected APIs using Postman.
5. Understand the difference between `401 Unauthorized` and `403 Forbidden`.

### Description
This experiment focuses on implementing Role-Based Authorization (RBAC) in a Spring Boot backend. It restricts API access based on assigned user roles to demonstrate proper endpoint protection. The application enforces that normal users can only access permitted endpoints, admins can access admin-only endpoints, and unauthorized requests are blocked correctly.

### Technologies Used
* Java 17+ & Maven
* Spring Boot (Spring Web, Spring Security, Spring Data JPA)
* H2 In-Memory Database
* Postman (API Testing)

### Features Implemented
* **User Authentication:** HTTP Basic Auth or session-based login using Spring Security.
* **Database & Entities:** `User` and `Role` entities stored in an H2 Database.
* **Protected Endpoints:**
  * `GET /api/public/hello` (Accessible to everyone, no auth required)
  * `GET /api/user/profile` (Accessible to users with `USER` or `ADMIN` roles)
  * `GET /api/admin/dashboard` (Accessible **only** to users with the `ADMIN` role)
