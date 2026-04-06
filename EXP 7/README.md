# Spring Boot RBAC Demo

A complete **Role-Based Access Control (RBAC)** demo using **Spring Boot 3**, **Spring Security**, and an **H2 in-memory database**.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Architecture Overview](#architecture-overview)
3. [Prerequisites](#prerequisites)
4. [Build & Run](#build--run)
5. [Pre-seeded Users](#pre-seeded-users)
6. [API Endpoints](#api-endpoints)
7. [Postman Testing Guide](#postman-testing-guide)
8. [H2 Console](#h2-console)
9. [Screenshots Checklist](#screenshots-checklist)

---

## Project Structure

```
EXP 7/
├── pom.xml
├── README.md
├── screenshots/                          ← Add your Postman screenshots here
└── src/
    └── main/
        ├── java/com/example/rbac/
        │   ├── RbacDemoApplication.java  ← Entry point
        │   ├── config/
        │   │   ├── SecurityConfig.java   ← Spring Security configuration
        │   │   └── DataInitializer.java  ← Seeds H2 with demo users
        │   ├── controller/
        │   │   ├── PublicController.java
        │   │   ├── UserController.java
        │   │   └── AdminController.java
        │   ├── entity/
        │   │   └── User.java
        │   ├── repository/
        │   │   └── UserRepository.java
        │   └── service/
        │       └── CustomUserDetailsService.java
        └── resources/
            └── application.properties
```

---

## Architecture Overview

```
HTTP Request
     │
     ▼
Spring Security Filter Chain
     │
     ├── /api/public/**  ──────────────────────► PublicController  (No auth needed)
     │
     ├── /api/user/**    ── [ROLE_USER|ADMIN] ──► UserController
     │
     ├── /api/admin/**   ── [ROLE_ADMIN only] ──► AdminController
     │
     └── 401 / 403 responses handled by Spring Security automatically
```

**Authentication Flow (HTTP Basic):**
1. Client sends `Authorization: Basic <base64(username:password)>` header.
2. `CustomUserDetailsService.loadUserByUsername()` fetches the `User` from H2.
3. Spring Security compares the provided password against the BCrypt hash.
4. On success, sets the `SecurityContext` with the user's authorities.
5. URL authorization rules are evaluated; `403` is returned on insufficient role.

---

## Prerequisites

| Tool | Version |
|------|---------|
| Java | 17+ |
| Maven | 3.8+ |

Verify your environment:
```bash
java -version
mvn -version
```

---

## Build & Run

### Step 1 — Clone / Navigate to the project

```bash
cd "EXP 7"
```

### Step 2 — Build the project

```bash
mvn clean package -DskipTests
```

### Step 3 — Run the application

```bash
mvn spring-boot:run
```

Or run the packaged JAR:

```bash
java -jar target/rbac-demo-1.0.0.jar
```

### Step 4 — Confirm startup

Look for this line in the console output:

```
Started RbacDemoApplication in X.XXX seconds
```

The server starts on **`http://localhost:8080`**.

---

## Pre-seeded Users

The `DataInitializer` component seeds these users on every fresh startup:

| Username | Password    | Role       |
|----------|-------------|------------|
| `user1`  | `password123` | `ROLE_USER`  |
| `admin1` | `password123` | `ROLE_ADMIN` |

> **Note:** Passwords are stored as BCrypt hashes. Plain-text is never persisted.

---

## API Endpoints

| Method | Endpoint | Auth Required | Allowed Roles | Description |
|--------|----------|---------------|---------------|-------------|
| GET | `/api/public/hello` | ❌ No | Everyone | Public greeting |
| GET | `/api/user/profile` | ✅ Yes | USER, ADMIN | User profile page |
| GET | `/api/admin/dashboard` | ✅ Yes | ADMIN only | Admin dashboard |

### HTTP Status Codes

| Scenario | Status Code |
|----------|-------------|
| No credentials sent | **401 Unauthorized** |
| Wrong password | **401 Unauthorized** |
| Correct credentials, wrong role | **403 Forbidden** |
| Correct credentials, correct role | **200 OK** |

---

## Postman Testing Guide

> **Setup:** In Postman, use `GET` requests with **HTTP Basic Auth** (`Authorization` tab → Type: `Basic Auth`).

---

### Test 1 — Public Endpoint (No Auth)

**Goal:** Confirm public endpoint is accessible without any credentials.

- **Method:** `GET`
- **URL:** `http://localhost:8080/api/public/hello`
- **Authorization:** _None_

**Expected Response:**
```
Status: 200 OK
Body:   Hello! This is a public endpoint.
```

📸 _Screenshot: Save as `screenshots/01_public_endpoint_no_auth.png`_

---

### Test 2 — User Profile as ROLE_USER (Success)

**Goal:** A `ROLE_USER` can access their profile.

- **Method:** `GET`
- **URL:** `http://localhost:8080/api/user/profile`
- **Authorization:** Basic Auth
  - Username: `user1`
  - Password: `password123`

**Expected Response:**
```
Status: 200 OK
Body:   Welcome to the User Profile (Accessible by USER and ADMIN). Logged in as: user1
```

📸 _Screenshot: Save as `screenshots/02_user_profile_role_user.png`_

---

### Test 3 — Admin Dashboard as ROLE_USER (403 Forbidden)

**Goal:** A `ROLE_USER` is **denied** access to the admin area.

- **Method:** `GET`
- **URL:** `http://localhost:8080/api/admin/dashboard`
- **Authorization:** Basic Auth
  - Username: `user1`
  - Password: `password123`

**Expected Response:**
```
Status: 403 Forbidden
```

📸 _Screenshot: Save as `screenshots/03_admin_dashboard_forbidden_user.png`_

---

### Test 4 — Admin Dashboard as ROLE_ADMIN (Success)

**Goal:** A `ROLE_ADMIN` can access the admin dashboard.

- **Method:** `GET`
- **URL:** `http://localhost:8080/api/admin/dashboard`
- **Authorization:** Basic Auth
  - Username: `admin1`
  - Password: `password123`

**Expected Response:**
```
Status: 200 OK
Body:   Welcome to the Admin Dashboard (Accessible by ADMIN only). Admin user: admin1
```

📸 _Screenshot: Save as `screenshots/04_admin_dashboard_role_admin.png`_

---

### Test 5 — Protected Route Without Credentials (401 Unauthorized)

**Goal:** Accessing a protected route without any credentials returns 401.

- **Method:** `GET`
- **URL:** `http://localhost:8080/api/user/profile`
- **Authorization:** _None_

**Expected Response:**
```
Status: 401 Unauthorized
```

📸 _Screenshot: Save as `screenshots/05_protected_no_credentials_401.png`_

---

### Bonus Test — Admin Profile as ROLE_ADMIN

**Goal:** Confirm ROLE_ADMIN can also access ROLE_USER routes.

- **Method:** `GET`
- **URL:** `http://localhost:8080/api/user/profile`
- **Authorization:** Basic Auth
  - Username: `admin1`
  - Password: `password123`

**Expected Response:**
```
Status: 200 OK
Body:   Welcome to the User Profile (Accessible by USER and ADMIN). Logged in as: admin1
```

---

## H2 Console

The H2 in-memory database console is available during development at:

**URL:** `http://localhost:8080/h2-console`

| Field | Value |
|-------|-------|
| JDBC URL | `jdbc:h2:mem:rbacdb` |
| Username | `sa` |
| Password | _(leave blank)_ |

You can inspect the `USERS` table and see the BCrypt-hashed passwords.

---

## Screenshots Checklist

After completing the Postman tests above, populate the `screenshots/` folder:

- [ ] `01_public_endpoint_no_auth.png` — 200 OK on `/api/public/hello` with no auth
- [ ] `02_user_profile_role_user.png` — 200 OK on `/api/user/profile` as `user1`
- [ ] `03_admin_dashboard_forbidden_user.png` — 403 Forbidden on `/api/admin/dashboard` as `user1`
- [ ] `04_admin_dashboard_role_admin.png` — 200 OK on `/api/admin/dashboard` as `admin1`
- [ ] `05_protected_no_credentials_401.png` — 401 Unauthorized on `/api/user/profile` with no auth

> **Tip:** In Postman, click the **three dots (•••)** next to the response and choose **"Save Response"** or use a screenshot tool to capture the full request + response panel.

---

## Key Security Concepts Demonstrated

| Concept | Implementation |
|---------|---------------|
| **Authentication** | HTTP Basic Auth via `CustomUserDetailsService` |
| **Password Hashing** | BCrypt (`BCryptPasswordEncoder`) |
| **Authorization** | URL-based rules in `SecurityFilterChain` |
| **Role Hierarchy** | `hasRole("ADMIN")` vs `hasAnyRole("USER","ADMIN")` |
| **401 Unauthorized** | Spring Security default for missing/bad credentials |
| **403 Forbidden** | Spring Security default for authenticated but insufficient role |
| **CSRF Disabled** | Allowed for REST API / Postman testing |
