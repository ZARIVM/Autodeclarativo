package com.backend.comsiontest.entities;


import javax.persistence.*;

/**
 * The persistent class for the client database table.
 */
@Entity
@Table(name = "LEGITIMIDAD_ADJUNTOS")
public class LegitimidadAdjuntos {

    @OneToOne
    @JoinColumn(name = "FK_LEG_ADJU", updatable = false, nullable = false)
    private Legitimidad legitimidad;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idLegitimidadAdjunto;

    private String path;

    public Legitimidad getLegitimidad() {
        return legitimidad;
    }

    public void setLegitimidad(Legitimidad legitimidad) {
        this.legitimidad = legitimidad;
    }

    public Long getIdLegitimidadAdjunto() {
        return idLegitimidadAdjunto;
    }

    public void setIdLegitimidadAdjunto(Long idLegitimidadAdjunto) {
        this.idLegitimidadAdjunto = idLegitimidadAdjunto;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
