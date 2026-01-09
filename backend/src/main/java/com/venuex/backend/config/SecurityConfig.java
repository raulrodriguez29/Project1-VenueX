package com.venuex.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {}) // Tell security to use our CORS settings
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/**").permitAll() // This "Unlocks" the door for React
                        .anyRequest().authenticated()
                );
        return http.build();
    }
}
