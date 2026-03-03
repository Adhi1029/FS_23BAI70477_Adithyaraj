# Full Stack Development Lab – React Experiments

**Student Name:** Adithyaraj  
**Register Number:** 23BAI70477  
**Course:** Full Stack Development Lab  
**Repository:** FS_23BAI70477_Adithyaraj  

This repository contains a series of experiments demonstrating modern frontend development using React, SPA architecture, UI libraries, routing, and advanced state management.

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
Building upon previous experiments, this update enhances the existing application by replacing standard state management with Redux Toolkit for complex data flows.  It introduces a global Context API for overarching app properties and utilizes `useMemo` to prevent unnecessary re-rendering of derived data computations. Additionally, a new dedicated page is integrated using React Router to demonstrate these combined features.

### Technologies & Concepts Used
* **Redux Toolkit:** `configureStore`, `createSlice`, `useDispatch`, `useSelector`
* **Context API:** `createContext`, `useContext`
* **Performance Hooks:** `useMemo`
* **Routing:** React Router DOM
* Vercel (Deployment)

### Features Implemented
* **React Router Integration:** Navigation across at least 3 pages (including one brand new page added for this experiment).
* **Global Context:** App-wide context provider implemented to manage overarching state (e.g., light/dark theme toggle or user profile).
* **Redux Toolkit State Management:** Configured a centralized store with at least one slice containing 3+ reducer actions (e.g., `addItem`, `removeItem`, `updateQty`).
* **Performance Optimization:** Implemented `useMemo` for derived data optimization (e.g., calculating total cart price or filtering lists) to ensure re-computations only occur when specific dependencies change.
* **Responsive UI:** Clean, modern layout maintained consistently across desktop and mobile.

### Recommended Folder Structure
```text
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ThemeToggle.jsx
│   ├── CardComponent.jsx
│   └── FilterBar.jsx
│
├── context/
│   └── AppContext.jsx
│
├── redux/
│   ├── store.js
│   └── slices/
│       └── appSlice.js        # (e.g., cartSlice.js / taskSlice.js)
│
├── pages/
│   ├── Home.jsx
│   ├── Projects.jsx           # From Experiment 3
│   ├── Analytics.jsx          # From Experiment 4
│   └── Reports.jsx            # ✅ New page for Experiment 5
│
├── App.jsx
├── main.jsx
└── index.css
