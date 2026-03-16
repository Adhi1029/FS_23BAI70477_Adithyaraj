package com.app.controller;

import com.app.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * POST /login
     * Excects JSON body like:
     * {
     *     "username": "anyUser",
     *     "password": "anyPassword"
     * }
     */
    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception {

        // CUSTOM LOGIC: Bypass DB Authentication completely.
        // We accept ANY username/password combination and generate a JWT token immediately.
        
        // Create a dummy UserDetails object since we are skipping the DB check
        UserDetails dummyUser = org.springframework.security.core.userdetails.User.withUsername(authRequest.getUsername())
                .password("") // Password isn't needed for the token generation
                .authorities(new ArrayList<>())
                .build();

        // Generate the JWT token representing this user
        final String jwt = jwtUtil.generateToken(dummyUser);

        // Return the generated token
        Map<String, String> response = new HashMap<>();
        response.put("token", jwt);
        
        return ResponseEntity.ok(response);
    }

    // A simple DTO class for parsing incoming JSON requests
    public static class AuthRequest {
        private String username;
        private String password;

        public AuthRequest() {
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
