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
