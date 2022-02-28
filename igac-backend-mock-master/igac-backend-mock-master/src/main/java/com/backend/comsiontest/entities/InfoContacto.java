package com.backend.comsiontest.entities;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "INFO_CONTACTO")
public class InfoContacto {

    @Id
    private String numDocumento;//id

    @Column(name = "idtipo")
    private String idTipo;

    @Column(name = "tipodocumento")
    private String tipoDocumento;

    @Column(name = "idsexo")
    private String idSexo;

    @Column(name = "idgrupoetnico")
    private String idGrupoEtnico;

    @Column(name = "nombrerazon")
    private String nombreRazon;

    @Column(name = "iddepartamento")
    private String idDepartamento;

    @Column(name = "idmunicipio")
    private String idMunicipio;

    @OneToMany(mappedBy = "infoContacto", fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private Set<Predio> predios;

	public InfoContacto() {
	}

	@Column
    private String vereda;
    @Column
    private String telefono;
    @Column
    private String email;
    @Column
    private String celular;
    
    @Column
    private String direccion;


    public InfoContacto(String idTipo, String tipoDocumento, String numDocumento, String idSexo, String idGrupoEtnico,
                        String nombreRazon, String idDepartamento, String idMunicipio, String idDireccion, String vereda,
                        String telefono, String email, String celular, String direccion) {
        super();
        this.idTipo = idTipo;
        this.tipoDocumento = tipoDocumento;
        this.numDocumento = numDocumento;
        this.idSexo = idSexo;
        this.idGrupoEtnico = idGrupoEtnico;
        this.nombreRazon = nombreRazon;
        this.idDepartamento = idDepartamento;
        this.idMunicipio = idMunicipio;
       // this.idDireccion = idDireccion;
        this.vereda = vereda;
        this.telefono = telefono;
        this.email = email;
        this.celular = celular;
        this.direccion = direccion;
    }
    

    public InfoContacto(String idTipo, String tipoDocumento, String numDocumento, String idSexo, String idGrupoEtnico,
            String nombreRazon, String idDepartamento, String idMunicipio, String idDireccion, String vereda,
            String telefono, String email, String celular, String direccion, Set<Predio> predios) {
		super();
		this.numDocumento = numDocumento;
		this.idTipo = idTipo;
		this.tipoDocumento = tipoDocumento;
		this.idSexo = idSexo;
		this.idGrupoEtnico = idGrupoEtnico;
		this.nombreRazon = nombreRazon;
		this.idDepartamento = idDepartamento;
		this.idMunicipio = idMunicipio;
		this.predios = predios;
		this.vereda = vereda;
		this.telefono = telefono;
		this.email = email;
		this.celular = celular;
		this.direccion = direccion;
	}


	public Set<Predio> getPredios() {
		return predios;
	}

    
	public void setPredios(Set<Predio> predios) {
		this.predios = predios;
	}

	
	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getIdTipo() {
        return idTipo;
    }

    public void setIdTipo(String idTipo) {
        this.idTipo = idTipo;
    }

    public String getTipoDocumento() {
        return tipoDocumento;
    }

    public void setTipoDocumento(String tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public String getNumDocumento() {
        return numDocumento;
    }

    public void setNumDocumento(String numDocumento) {
        this.numDocumento = numDocumento;
    }

    public String getIdSexo() {
        return idSexo;
    }

    public void setIdSexo(String idSexo) {
        this.idSexo = idSexo;
    }

    public String getIdGrupoEtnico() {
        return idGrupoEtnico;
    }

    public void setIdGrupoEtnico(String idGrupoEtnico) {
        this.idGrupoEtnico = idGrupoEtnico;
    }

    public String getNombreRazon() {
        return nombreRazon;
    }

    public void setNombreRazon(String nombreRazon) {
        this.nombreRazon = nombreRazon;
    }

    public String getIdDepartamento() {
        return idDepartamento;
    }

    public void setIdDepartamento(String idDepartamento) {
        this.idDepartamento = idDepartamento;
    }

    public String getIdMunicipio() {
        return idMunicipio;
    }

    public void setIdMunicipio(String idMunicipio) {
        this.idMunicipio = idMunicipio;
    }

//    public String getIdDireccion() {
//        return idDireccion;
//    }
//
//    public void setIdDireccion(String idDireccion) {
//        this.idDireccion = idDireccion;
//    }

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }


}
