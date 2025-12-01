package com.task.backend.service;

import com.task.backend.dto.AuthRequest;
import com.task.backend.dto.AuthResponse;
import com.task.backend.dto.RegisterRequest;
import com.task.backend.exception.NotFoundException;
import com.task.backend.model.User;
import com.task.backend.repository.UserRepo;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(12);

    public AuthResponse registerUser(@Valid RegisterRequest req) {
        if(repo.existsByEmail(req.getEmail())){
            throw new NotFoundException("Email Already Exists!");
        }

        User user= User.builder().name(req.getName())
                .email(req.getEmail())
                .password(encoder.encode(req.getPassword())).build();

        repo.save(user);
        var token=jwtService.generateToken(user.getEmail());
        return new AuthResponse(token);
    }

    public AuthResponse logIn(@Valid AuthRequest req) {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        } catch (AuthenticationException ex) {
            throw new NotFoundException("Invalid credentials");
        }
        User user = repo.findByEmail(req.getEmail()).orElseThrow(() -> new NotFoundException("User not found"));
        var token = jwtService.generateToken(user.getEmail());
        return new AuthResponse(token);
    }
}
