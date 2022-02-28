package co.gov.igac.ventanillaunica.vo;

/**
 *
 */
public class TramiteAutodeclarativoLegRequestVo {


    private String id;
    private String username;
    private String idSexo;
    private String idLegi;
    private String idGrupoEtnico;
    private String celular;
    private String email;
    private String direccion;
    private String vereda;
    private String idMunicipio;
    private String idDepartamento;
    private String telefono;

    
    
    public String getIdMunicipio() {
		return idMunicipio;
	}

	public void setIdMunicipio(String idMunicipio) {
		this.idMunicipio = idMunicipio;
	}

	public String getIdDepartamento() {
		return idDepartamento;
	}

	public void setIdDepartamento(String idDepartamento) {
		this.idDepartamento = idDepartamento;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}



	public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getVereda() {
        return vereda;
    }

    public void setVereda(String vereda) {
        this.vereda = vereda;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
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

    public String getIdSexo() {
        return idSexo;
    }

    public void setIdSexo(String idSexo) {
        this.idSexo = idSexo;
    }

    public String getIdLegi() {
        return idLegi;
    }

    public void setIdLegi(String idLegi) {
        this.idLegi = idLegi;
    }

    public String getIdGrupoEtnico() {
        return idGrupoEtnico;
    }

    public void setIdGrupoEtnico(String idGrupoEtnico) {
        this.idGrupoEtnico = idGrupoEtnico;
    }


}
