package com.example.rbac.service;

import com.example.rbac.entity.User;
import com.example.rbac.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.logging.Logger;

/**
 * Custom implementation of Spring Security's UserDetailsService.
 *
 * Spring Security calls {@code loadUserByUsername} during HTTP Basic Authentication
 * to retrieve the user's credentials and granted authorities.
 *
 * The role stored in the database (e.g. "ROLE_USER") is wrapped into a
 * {@link SimpleGrantedAuthority} so that Spring Security's hasRole / hasAnyRole
 * matchers work correctly.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private static final Logger log = Logger.getLogger(CustomUserDetailsService.class.getName());

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Locate the user based on the username provided during authentication.
     *
     * @param username the username supplied in the HTTP Basic header
     * @return a fully populated {@link UserDetails} object
     * @throws UsernameNotFoundException if no user is found with the given username
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("Attempting to load user by username: " + username);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> {
                    log.warning("User not found: " + username);
                    return new UsernameNotFoundException("User not found with username: " + username);
                });

        log.info("User found: " + user.getUsername() + " with role: " + user.getRole());

        // Map the single role string to a GrantedAuthority.
        // Spring Security's hasRole("ADMIN") checks for "ROLE_ADMIN" internally,
        // so the "ROLE_" prefix must already be present in the authority.
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(user.getRole());

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .authorities(Collections.singletonList(authority))
                .build();
    }
}
