package com.example.WebDemo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.WebDemo.Model.UserData;

public interface JpaRepo extends JpaRepository<UserData,Long > {

}
