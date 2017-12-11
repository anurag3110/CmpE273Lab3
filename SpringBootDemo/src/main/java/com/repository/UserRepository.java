package com.repository;

import com.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    List<User> findByEmailAndPassword(String email,String password);
    List<User> findById(Integer id);
    List<User> findByEmail(String email);

}