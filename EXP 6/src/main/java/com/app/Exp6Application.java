package com.app;

import com.app.model.User;
import com.app.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class Exp6Application {

    public static void main(String[] args) {
        SpringApplication.run(Exp6Application.class, args);
    }

    /**
     * This method runs exactly once on application startup.
     * We use it here to insert a default user into the H2 in-memory
     * database so there's an existing account to test login with.
     */
    @Bean
    public CommandLineRunner initData(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Check if user already exists to prevent duplicate entries if H2 persists
            if (userRepository.findByUsername("user123").isEmpty()) {
                User testUser = new User();
                testUser.setUsername("user123");
                // Passwords must be encoded before saving them in the DB
                testUser.setPassword(passwordEncoder.encode("password123"));
                
                userRepository.save(testUser);
                System.out.println("Default test user created: username='user123', password='password123'");
            }
        };
    }
}
