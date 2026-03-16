package com.app.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // 1. Get the Authorization Header
        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        // 2. Check if it starts with "Bearer "
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7); // Remove "Bearer " prefix
            try {
                username = jwtUtil.extractUsername(jwt);
            } catch (Exception e) {
                logger.warn("JWT Token extraction failed: " + e.getMessage());
            }
        }

        // 3. If we have a username and the current security context is not already authenticated
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            
            // CUSTOM LOGIC: We bypass the DB check entirely.
            // If the JWT's signature and expiration are valid, we trust its contents.
            UserDetails dummyUserDetails = org.springframework.security.core.userdetails.User.withUsername(username)
                    .password("") // Provide dummy password
                    .authorities(new java.util.ArrayList<>())
                    .build();

            // 4. Validate the token (this validates signature, expiration, and username)
            if (jwtUtil.validateToken(jwt, dummyUserDetails)) {
                
                // 5. Create Authentication Token manually
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        dummyUserDetails, null, dummyUserDetails.getAuthorities());

                
                // Add details regarding the web request (IP address, session ID, etc.)
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                // 6. Set Authentication in Context
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        
        // Continue the filter chain
        filterChain.doFilter(request, response);
    }
}
