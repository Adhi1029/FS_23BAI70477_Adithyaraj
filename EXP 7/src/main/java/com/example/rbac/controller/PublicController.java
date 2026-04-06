package com.example.rbac.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Public controller – no authentication required.
 * Mapped to /api/public/** which is permitted for all in SecurityConfig.
 */
@RestController
@RequestMapping("/api/public")
public class PublicController {

    /**
     * GET /api/public/hello
     *
     * Accessible by anyone – unauthenticated users included.
     *
     * @return a plain-text greeting message
     */
    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello! This is a public endpoint.");
    }
}
