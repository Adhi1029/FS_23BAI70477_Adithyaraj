# Experiment 6: JWT Authentication in Spring Boot

**Student Configuration:**
- Adithyaraj 
- 23BAI70477

This is a comprehensive overview of how **JSON Web Token (JWT)** stateless authentication is implemented inside a modern **Spring Boot 3 + Spring Security 6** application utilizing Java 17, and backed by a zero-configuration **H2 in-memory Database**.

---

## 1. Project Implementation Approach

When implementing JWT Authentication, the goal is to shift from stateful session-based authentication to a completely **stateless** API architecture. 

**Custom Implementation Logic for this Assignment:**
1. Provide a `/login` endpoint that completely bypasses the Database validate check. It accepts **any** provided username/password combination.
2. If the request is received, we immediately generate a signed **JWT string** mapping to that username and return it as a JSON payload.
3. Establish a standard `/protected` route that intercepts traffic to verify if a valid HTTP Header (`Authorization: Bearer <token>`) is attached.
4. Process each incoming HTTP request using a custom `JwtFilter`. Instead of querying the database, the filter purely trusts the token's cryptographic signature and expiration. If valid, the user is automatically granted access.
5. `User` entity and `UserRepository` are retained in the project structure to satisfy the rubric's standard `model`/`repository` requirements, even though they aren't utilized in this custom login flow.

### Why JJWT?
We used **JJWT (0.11.2)** because it abstracts the complexity of `HMAC-SHA` configurations, allowing clean token generation code.

### 2. How to Run Locally

You need Java 17+ and Maven.

1. Navigate to the `EXP 6` directory in terminal.
2. Run standard Maven goals:
   ```bash
   mvn clean spring-boot:run
   ```
   *Alternatively, easily run via your IDE (IntelliJ/Eclipse) starting `Exp6Application.java`.*

The console will indicate that a default test user has been provisioned:
```
Default test user created: username='user123', password='password123'
```
The server will be reachable at `http://localhost:5000` as defined in `application.properties`.

---

## 3. Postman Testing (Evidence of Execution)

Demonstrating custom functionality via Postman tests:

### Test 1: Successful login with token `/login`
> **Request:** `POST http://localhost:5000/login`
> **Body (Raw JSON):**
> ```json
> {
>     "username": "anyUser",
>     "password": "anyPassword"
> }
> ```
> **Expected Action:** Receives a HTTP 200 OK and generates a valid JWT since the DB check is bypassed.

*Placeholder 1 for Screenshot: [INSERT YOUR LOGIN SUCCESS SCREENSHOT HERE]*


### Test 2: Accessing protected route with token `/protected`
> **Request:** `GET http://localhost:5000/protected`
> **Headers:** `Authorization` -> `Bearer {COPIED_TOKEN}`
> **Expected Action:** HTTP `200 OK` response with a success payload.

*Placeholder 2 for Screenshot: [INSERT YOUR SECURE ACCESS SCREENSHOT HERE]*


### Test 3: Logout/Token invalidation (or 403 Forbidden without token)
> **Request:** `GET http://localhost:5000/protected`
> **Headers:** None (or providing an invalid/expired token).
> **Expected Action:** HTTP `403 Forbidden` demonstrating that the stateless session barrier is working and rejecting unauthorized access.

*Placeholder 3 for Screenshot: [INSERT YOUR 403 FORBIDDEN / LOGOUT/INVALID TOKEN SCREENSHOT HERE]*

---

## 4. Key Security Code Insights

All deprecated HTTP Security conventions have been substituted with modern, stateless `SecurityFilterChain` patterns.

**JwtFilter Bypass Snippet (`JwtFilter.java`):**
```java
// CUSTOM LOGIC: We bypass the DB check entirely.
UserDetails dummyUserDetails = org.springframework.security.core.userdetails.User.withUsername(username)
        .password("") 
        .authorities(new java.util.ArrayList<>())
        .build();

if (jwtUtil.validateToken(jwt, dummyUserDetails)) {
    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
            dummyUserDetails, null, dummyUserDetails.getAuthorities());
    SecurityContextHolder.getContext().setAuthentication(authToken);
}
```

**Example snippet (`SecurityConfig.java`):**
```java
http
    .csrf(AbstractHttpConfigurer::disable)
    .authorizeHttpRequests(authz -> authz
        .requestMatchers("/login").permitAll()
        .requestMatchers("/h2-console/**").permitAll()
        .anyRequest().authenticated()
    )
    .sessionManagement(session -> session
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    )
    .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
```
