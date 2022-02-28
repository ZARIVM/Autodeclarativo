package com.backend.comsiontest.vo;

public class InfoContactoRequest {

	private String idTipo;
	private String tipoDocumento;
	private String numDocumento;
	private String idSexo;
	private String idGrupoEtnico;
	private String nombreRazon;
	private String idDepartamento;
	private String idMunicipio;
	private String idDireccion;
	private String vereda;
	private String telefono;
	private String email;
	private String celular; 
	private String idPredio;
	
	
	public InfoContactoRequest(String idTipo, String tipoDocumento, String numDocumento, String idSexo, String idGrupoEtnico,
			String nombreRazon, String idDepartamento, String idMunicipio, String idDireccion, String vereda,
			String telefono, String email, String celular, String idPredio) {
		super();
		this.idTipo = idTipo;
		this.tipoDocumento = tipoDocumento;
		this.numDocumento = numDocumento;
		this.idSexo = idSexo;
		this.idGrupoEtnico = idGrupoEtnico;
		this.nombreRazon = nombreRazon;
		this.idDepartamento = idDepartamento;
		this.idMunicipio = idMunicipio;
		this.idDireccion = idDireccion;
		this.vereda = vereda;
		this.telefono = telefono;
		this.email = email;
		this.celular = celular;
		this.idPredio = idPredio;
	}
	
	
	
	public String getIdPredio() {
		return idPredio;
	}



	public void setIdPredio(String idPredio) {
		this.idPredio = idPredio;
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
	public String getIdDireccion() {
		return idDireccion;
	}
	public void setIdDireccion(String idDireccion) {
		this.idDireccion = idDireccion;
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
