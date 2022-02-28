package com.backend.comsiontest.entities;

import javax.persistence.*;

/**
 * The persistent class for the client database table.
 */
@Entity
@Table(name = "TRAMITE_AUTODECLARATIVO")

public class TramiteAutodeclarativo {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="tramite_id_seq")
    @SequenceGenerator(name="tramite_id_seq", sequenceName="tramite_id_seq", allocationSize=1)
    private Long id;

    private String username;



    @OneToOne(cascade = CascadeType.ALL)
    Legitimidad legitimidad;

    public Legitimidad getLegitimidad() {
        return legitimidad;
    }

    public void setLegitimidad(Legitimidad legitimidad) {
        this.legitimidad = legitimidad;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
