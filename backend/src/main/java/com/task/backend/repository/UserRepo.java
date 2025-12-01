package com.task.backend.repository;

import com.task.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Integer> {

    public Optional<User> findByEmail(String email);

    public boolean existsByEmail(String email);
}
