package com.backend.comsiontest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.comsiontest.entities.Predio;

public interface PredioRepository extends JpaRepository<Predio, Long> {

	Predio findByidPredio(Long id);
	
}
