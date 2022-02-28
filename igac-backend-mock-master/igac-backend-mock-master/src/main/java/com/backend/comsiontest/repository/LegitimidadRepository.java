package com.backend.comsiontest.repository;

import com.backend.comsiontest.entities.Legitimidad;
import com.backend.comsiontest.entities.TramiteAutodeclarativo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LegitimidadRepository extends JpaRepository<Legitimidad, Long> {
    @Query("SELECT t FROM Legitimidad t WHERE t.tramite = ?1 ")
    public Legitimidad finByTramite(TramiteAutodeclarativo t);
}
