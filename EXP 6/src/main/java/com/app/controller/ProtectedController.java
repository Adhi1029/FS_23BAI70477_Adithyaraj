package com.app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ProtectedController {

    /**
     * GET /protected
     * This endpoint is caught by the SecurityFilterChain and JwtFilter.
     * Only valid requests bearing an Authorization token will successfully reach this method.
     */
    @GetMapping("/protected")
    public ResponseEntity<?> getProtectedResource() {
        // Prepare a successful JSON response
        Map<String, String> responseData = new HashMap<>();
        responseData.put("message", "Success! You have accessed a protected route using a valid JWT Token.");
        responseData.put("status", "Authenticated");
        
        return ResponseEntity.ok(responseData);
    }
}
