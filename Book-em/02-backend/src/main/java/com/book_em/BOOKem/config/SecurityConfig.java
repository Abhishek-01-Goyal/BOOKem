package com.book_em.BOOKem.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Disable CSRF for testing purposes (you can enable this in production)
                .csrf(csrf -> csrf.disable())

                // Configure authorization rules
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/users/register").permitAll()  // Allow unauthenticated access to registration endpoint
                        .anyRequest().authenticated()  // All other endpoints require authentication
                )

                // Configure basic authentication using lambda expressions
                .httpBasic(httpBasicCustomizer -> {});  // Default HTTP Basic Authentication

        return http.build();
    }
}
