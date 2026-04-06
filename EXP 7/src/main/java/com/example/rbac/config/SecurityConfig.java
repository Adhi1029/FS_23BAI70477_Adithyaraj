package com.example.rbac.config;

import com.example.rbac.service.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 * Central Spring Security configuration.
 *
 * Key decisions:
 * - CSRF disabled so Postman / curl can send requests without a CSRF token.
 * - HTTP Basic enabled so Postman can set the Authorization header directly.
 * - H2 console is allowed through by permitting the /h2-console/** path AND
 *   disabling the X-Frame-Options header (H2 console uses iframes).
 * - URL matchers apply role checks using the ROLE_ prefix convention.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;

    public SecurityConfig(CustomUserDetailsService customUserDetailsService) {
        this.customUserDetailsService = customUserDetailsService;
    }

    // -----------------------------------------------------------------------
    // BCrypt Password Encoder
    // -----------------------------------------------------------------------

    /**
     * BCrypt is the recommended hashing algorithm.
     * The strength (work factor) defaults to 10.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // -----------------------------------------------------------------------
    // Authentication Provider
    // -----------------------------------------------------------------------

    /**
     * Wires our custom UserDetailsService and the BCrypt encoder into
     * Spring Security's DAO-based authentication mechanism.
     */
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(customUserDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    /**
     * Exposes the AuthenticationManager bean so it can be injected elsewhere.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // -----------------------------------------------------------------------
    // HTTP Security Filter Chain
    // -----------------------------------------------------------------------

    /**
     * Defines the security filter chain with the following rules:
     *
     * | URL Pattern          | Required Authority              |
     * |----------------------|---------------------------------|
     * | /api/public/**       | None (open to everyone)         |
     * | /api/user/**         | ROLE_USER  OR  ROLE_ADMIN       |
     * | /api/admin/**        | ROLE_ADMIN only                 |
     * | /h2-console/**       | None (dev convenience)          |
     * | Any other request    | Must be authenticated           |
     *
     * Responses:
     * - Missing credentials  → 401 Unauthorized  (Spring Security default)
     * - Wrong role           → 403 Forbidden     (Spring Security default)
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF so Postman / REST clients work without tokens
            .csrf(AbstractHttpConfigurer::disable)

            // Allow H2 console to render its iframe-based UI
            .headers(headers -> headers
                .frameOptions(frameOptions -> frameOptions.sameOrigin())
            )

            // Authorization rules (order matters – more specific first)
            .authorizeHttpRequests(auth -> auth
                // H2 Console – open for development / demo
                .requestMatchers(AntPathRequestMatcher.antMatcher("/h2-console/**")).permitAll()

                // Public endpoints – no authentication needed
                .requestMatchers("/api/public/**").permitAll()

                // User endpoints – any authenticated user with USER or ADMIN role
                .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN")

                // Admin endpoints – only users with ADMIN role
                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                // Everything else requires authentication
                .anyRequest().authenticated()
            )

            // Enable HTTP Basic Authentication
            .httpBasic(httpBasic -> {})

            // Register our custom authentication provider
            .authenticationProvider(authenticationProvider());

        return http.build();
    }
}
