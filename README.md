# Full Stack Development Lab – React & Spring Boot Experiments

**Student Name:** Adithyaraj  
**Register Number:** 23BAI70477  
**Course:** Full Stack Development Lab  
**Repository:** FS_23BAI70477_Adithyaraj  

This repository contains a series of experiments demonstrating modern frontend development using React, SPA architecture, UI libraries, routing, advanced state management, and backend API security using Spring Boot.

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
This experiment introduces React as a modern frontend framework and demonstrates how to build a Single Page Application (SPA). The application uses reusable components, manages state efficiently, and integrates external APIs for dynamic content. 
The SPA architecture enables seamless navigation without page reloads, improving performance and user experience.

### Technologies Used
* React.js
* Node.js
* npm
* JavaScript (ES6+)
* HTML5 & CSS3
* Vite
* Vercel (Deployment)

### Features Implemented
* Component-based architecture
* React Hooks (`useState`, `useEffect`)
* API data fetching
* SPA navigation
* Responsive UI
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
This experiment transitions from frontend development to backend security by implementing a robust Authentication and Authorization system using **Spring Boot (Java)**. The application features a custom `JwtFilter` middleware that intercepts incoming HTTP requests. 

For testing and demonstration purposes, the `/login` route bypasses strict database validation—accepting any credentials—to immediately generate and sign an `HMAC-SHA` JWT token. This token must then be passed as a `Bearer` token in the `Authorization` header to successfully access the `/protected` route, demonstrating stateless session management.

### Technologies Used
* **Java 17+** & **Maven**
* **Spring Boot 3** (Spring Web, Spring Data JPA)
* **Spring Security 6+** (Stateless SecurityFilterChain)
* **JJWT (0.11.2)** (JSON Web Token library)
* **H2 Database** (In-memory database)
* **Postman** (API Testing)

### Features Implemented
* **Stateless Authentication:** Server runs on Port 5000 with a strictly stateless session policy.
* **Token Generation:** `JwtUtil` class to generate and sign JWTs upon a `POST` request to `/login`.
* **Middleware Interception:** `JwtFilter` implementation to extract and validate tokens from request headers.
* **Route Protection:** Public access granted to `/login` and `/h2-console`, while `/protected` requires a valid cryptographic token.

### 📸 Postman Testing & Screenshots

The following screenshots demonstrate the API functionality and token validation process:

#### 1. Successful Login Request & Token Generation
*(Shows a POST request to `http://localhost:5000/login` receiving the JWT token)*
> **[INSERT YOUR SCREENSHOT 1 HERE]**

#### 2. Accessing Protected Route (Authorized)
*(Shows a GET request to `http://localhost:5000/protected` using the `Authorization: Bearer <token>` header)*
> **[INSERT YOUR SCREENSHOT 2 HERE]**

#### 3. Token Invalidation / Unauthorized Access
*(Shows a GET request to `http://localhost:5000/protected` without a token, returning a `403 Forbidden` error)*
> **[INSERT YOUR SCREENSHOT 3 HERE]**

### How to Run Locally
1. Navigate to the `EXP 6` directory.
2. Ensure Maven is installed and run: `mvn clean compile` followed by `mvn spring-boot:run`.
3. The server will start on `http://localhost:5000`.
