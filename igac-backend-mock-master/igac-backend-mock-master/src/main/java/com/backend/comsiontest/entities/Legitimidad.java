package com.backend.comsiontest.entities;

import javax.persistence.*;

/**
 * The persistent class for the client database table.
 */
@Entity
@Table(name = "LEGITIMIDAD")
public class Legitimidad {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="leg_id_seq")
    @SequenceGenerator(name="leg_id_seq", sequenceName="leg_id_seq", allocationSize=1)
    private Long id;



    private Long idGrupoEtnico;
    private Long idSexo;
    private String idMunicipio;
    private String direccion;
    private String vereda;
    private String telefono;
    private String celular;
    private String email;
    private String username;
    private String idLegi;
    private String idDepartamento;

    @OneToOne(cascade = CascadeType.ALL)
    TramiteAutodeclarativo tramite;


    public TramiteAutodeclarativo getTramite() {
        return tramite;
    }

    public void setTramite(TramiteAutodeclarativo tramite) {
        this.tramite = tramite;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdGrupoEtnico() {
        return idGrupoEtnico;
    }

    public void setIdGrupoEtnico(Long idGrupoEtnico) {
        this.idGrupoEtnico = idGrupoEtnico;
    }

    public Long getIdSexo() {
        return idSexo;
    }

    public void setIdSexo(Long idSexo) {
        this.idSexo = idSexo;
    }

    public String getIdMunicipio() {
        return idMunicipio;
    }

    public void setIdMunicipio(String idMunicipio) {
        this.idMunicipio = idMunicipio;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getVereda() {
        return vereda;
    }

    public void setVereda(String vereda) {
        this.vereda = vereda;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getIdLegi() {
		return idLegi;
	}

	public void setIdLegi(String idLegi) {
		this.idLegi = idLegi;
	}

	public String getIdDepartamento() {
		return idDepartamento;
	}

	public void setIdDepartamento(String idDepartamento) {
		this.idDepartamento = idDepartamento;
	}
}
