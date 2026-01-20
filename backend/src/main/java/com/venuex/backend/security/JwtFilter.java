package com.venuex.backend.security;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
public class JwtFilter implements Filter{
    
    private final JwtUtil jwtUtil;

    //List of URLs that don't need a token
    private final List<String> whiteList = Arrays.asList("/api/auth/login",
        "/api/auth/register",
        "/api/venues",
        "/api/venues/",
        "/api/events",
        "/api/events/");

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        String path = httpRequest.getRequestURI();

        // Whitelist
        if (whiteList.contains(path)) {
        chain.doFilter(request, response);
            return;
        }

        String authHeader = httpRequest.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            if (jwtUtil.validateToken(token)) {
                String role = jwtUtil.extractRole(token);

                // SUPER_USER Bypass
                if (role.equals("SUPER_USER")) {
                    chain.doFilter(request, response);
                    return; // Stop the filter here
                }

                // Admin Routes
                if (path.startsWith("/api/admin") && !role.equals("ADMIN")) {
                    httpResponse.setStatus(403);
                    httpResponse.getWriter().write("Access Denied: Admin role required");
                    return;
                }

                // Host Routes
                if (path.startsWith("/api/host") && !(role.equals("HOST") || role.equals("ADMIN"))) {
                    httpResponse.setStatus(403);
                    httpResponse.getWriter().write("Access Denied: Host or Admin role required");
                    return;
                }

                // Standard User Routes
                if (path.startsWith("/api/user") && role.equals("GUEST")) {
                    httpResponse.setStatus(403);
                    httpResponse.getWriter().write("Access Denied: Please register an account");
                    return;
                }

                // Success!
                String email = jwtUtil.extractEmail(token);
                httpRequest.setAttribute("userEmail", email);
                httpRequest.setAttribute("userRole", role);
                chain.doFilter(request, response);
                return; // Stop here so we don't hit the 401 at the bottom
            } else {
                // Token was present but failed validation (expired/tampered)
                httpResponse.setStatus(401);
                httpResponse.getWriter().write("Unauthorized: Invalid or expired token");
                return;
            }
        }

        //If we reach this point, it means no "Bearer" header was present at all
        httpResponse.setStatus(401);
        httpResponse.getWriter().write("Unauthorized: Missing token");
    }

}
