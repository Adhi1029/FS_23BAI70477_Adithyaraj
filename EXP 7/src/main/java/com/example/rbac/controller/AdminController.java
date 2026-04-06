package com.example.rbac.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Admin controller – accessible ONLY by users with ROLE_ADMIN.
 * Spring Security enforces this at the URL level in SecurityConfig.
 *
 * A ROLE_USER attempting to access this will receive 403 Forbidden.
 * An unauthenticated request will receive 401 Unauthorized.
 */
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    /**
     * GET /api/admin/dashboard
     *
     * Strictly guarded: only ROLE_ADMIN may reach this handler.
     *
     * @param authentication injected by Spring Security; contains the principal's details
     * @return an admin-only welcome message with the current admin's username
     */
    @GetMapping("/dashboard")
    public ResponseEntity<String> dashboard(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(
            "Welcome to the Admin Dashboard (Accessible by ADMIN only). " +
            "Admin user: " + username
        );
    }
}
