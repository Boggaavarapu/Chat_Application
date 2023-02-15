package com.example.WebDemo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.WebDemo.Model.Data;
public interface DataRepo extends JpaRepository<Data,Long > {

}
