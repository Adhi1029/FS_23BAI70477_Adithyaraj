package com.example.rbac.entity;

import jakarta.persistence.*;

/**
 * JPA Entity representing an application user.
 * The 'role' field is stored as a plain string (e.g., "ROLE_USER", "ROLE_ADMIN")
 * and is mapped to a GrantedAuthority in CustomUserDetailsService.
 */
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false)
    private String password;

    /**
     * Role must follow Spring Security convention: must start with "ROLE_".
     * Examples: "ROLE_USER", "ROLE_ADMIN"
     */
    @Column(nullable = false, length = 30)
    private String role;

    // ── Constructors ──────────────────────────────────────────────────────────

    public User() {}

    public User(Long id, String username, String password, String role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    // ── Getters & Setters ─────────────────────────────────────────────────────

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    // ── Builder ───────────────────────────────────────────────────────────────

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String username;
        private String password;
        private String role;

        public Builder id(Long id)             { this.id = id;             return this; }
        public Builder username(String u)      { this.username = u;        return this; }
        public Builder password(String p)      { this.password = p;        return this; }
        public Builder role(String r)          { this.role = r;            return this; }

        public User build() {
            return new User(id, username, password, role);
        }
    }

    @Override
    public String toString() {
        return "User{id=" + id + ", username='" + username + "', role='" + role + "'}";
    }
}
