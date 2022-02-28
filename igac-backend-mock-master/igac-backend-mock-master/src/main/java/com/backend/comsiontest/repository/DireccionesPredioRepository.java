package com.backend.comsiontest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.comsiontest.entities.DireccionPredio;
import com.backend.comsiontest.entities.InfoContacto;

public  interface DireccionesPredioRepository extends JpaRepository<DireccionPredio, Long> {
}
