package com.example.rbac.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * User controller – accessible by users with ROLE_USER or ROLE_ADMIN.
 * Spring Security enforces this at the URL level in SecurityConfig.
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    /**
     * GET /api/user/profile
     *
     * Requires the caller to be authenticated and have either ROLE_USER or ROLE_ADMIN.
     * Returns 401 for unauthenticated requests and 403 for roles that don't match.
     *
     * @param authentication injected by Spring Security; contains the principal's details
     * @return a welcome message that includes the authenticated username
     */
    @GetMapping("/profile")
    public ResponseEntity<String> profile(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(
            "Welcome to the User Profile (Accessible by USER and ADMIN). " +
            "Logged in as: " + username
        );
    }
}
