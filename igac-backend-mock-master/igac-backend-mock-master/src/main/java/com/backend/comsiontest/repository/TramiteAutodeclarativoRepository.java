package com.backend.comsiontest.repository;


import com.backend.comsiontest.entities.TramiteAutodeclarativo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TramiteAutodeclarativoRepository extends JpaRepository<TramiteAutodeclarativo, Long> {
     List<TramiteAutodeclarativo> findByUsername(String username);
}
