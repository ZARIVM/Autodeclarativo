package com.backend.comsiontest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.comsiontest.entities.TramiteAutodeclarativo;
import com.backend.comsiontest.entities.UsoConstruccion;

public interface UsoConstruccionRepository extends JpaRepository<UsoConstruccion, Long> {

}

