package com.task.backend.controller;

import com.task.backend.dto.AuthRequest;
import com.task.backend.dto.AuthResponse;
import com.task.backend.dto.RegisterRequest;
import com.task.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerUser(@RequestBody @Valid RegisterRequest req){
        var res=service.registerUser(req);
        return ResponseEntity.ok(res);
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> logInUser(@RequestBody @Valid AuthRequest req){
        var res=service.logIn(req);
        return ResponseEntity.ok(res);
    }
}
