package com.example.rbac.config;

import com.example.rbac.entity.User;
import com.example.rbac.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

/**
 * DataInitializer seeds the H2 in-memory database with two demo users
 * every time the application starts.
 *
 * Credentials (plain text – hashed by BCrypt before persistence):
 * ┌──────────┬─────────────┬────────────┐
 * │ Username │ Password    │ Role       │
 * ├──────────┼─────────────┼────────────┤
 * │ user1    │ password123 │ ROLE_USER  │
 * │ admin1   │ password123 │ ROLE_ADMIN │
 * └──────────┴─────────────┴────────────┘
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = Logger.getLogger(DataInitializer.class.getName());

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        log.info("=== Seeding demo users into H2 database ===");

        // ── User 1: Regular User ──────────────────────────────────────────────
        if (userRepository.findByUsername("user1").isEmpty()) {
            User regularUser = User.builder()
                    .username("user1")
                    .password(passwordEncoder.encode("password123"))
                    .role("ROLE_USER")
                    .build();
            userRepository.save(regularUser);
            log.info("Created user: username='user1', role='ROLE_USER'");
        } else {
            log.info("User 'user1' already exists – skipping.");
        }

        // ── User 2: Admin User ────────────────────────────────────────────────
        if (userRepository.findByUsername("admin1").isEmpty()) {
            User adminUser = User.builder()
                    .username("admin1")
                    .password(passwordEncoder.encode("password123"))
                    .role("ROLE_ADMIN")
                    .build();
            userRepository.save(adminUser);
            log.info("Created user: username='admin1', role='ROLE_ADMIN'");
        } else {
            log.info("User 'admin1' already exists – skipping.");
        }

        log.info("=== Database seeding complete. Total users: " + userRepository.count() + " ===");
    }
}
