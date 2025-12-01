package com.task.backend.service;

import com.task.backend.model.User;
import com.task.backend.model.UserPrincipal;
import com.task.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepo repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=repo.findByEmail(username).orElseThrow(()->new UsernameNotFoundException("Not Found!"));

        return new UserPrincipal(user);
    }
}
