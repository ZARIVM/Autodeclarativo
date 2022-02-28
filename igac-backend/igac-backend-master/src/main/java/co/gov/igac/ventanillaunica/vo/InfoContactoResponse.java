package co.gov.igac.ventanillaunica.vo;

public class InfoContactoResponse {

	private String proPoseeOcu;
	private String tipoDoc;
	private String numDoc;
	private String grupoEtnico;
	private String sexo;
	private String nomRazonSocial;
	private String departamento;
	private String municipio;
	private String direccion;
	private String vereda;
	private String telefono;
	private String celular;
	private String correo;
	
	public InfoContactoResponse(String proPoseeOcu, String tipoDoc, String numDoc, String grupoEtnico, String sexo,
			String nomRazonSocial, String departamento, String municipio, String direccion, String vereda,
			String telefono, String celular, String correo) {
		super();
		this.proPoseeOcu = proPoseeOcu;
		this.tipoDoc = tipoDoc;
		this.numDoc = numDoc;
		this.grupoEtnico = grupoEtnico;
		this.sexo = sexo;
		this.nomRazonSocial = nomRazonSocial;
		this.departamento = departamento;
		this.municipio = municipio;
		this.direccion = direccion;
		this.vereda = vereda;
		this.telefono = telefono;
		this.correo = correo;
		this.celular = celular;
	}
	public String getProPoseeOcu() {
		return proPoseeOcu;
	}
	public void setProPoseeOcu(String proPoseeOcu) {
		this.proPoseeOcu = proPoseeOcu;
	}
	public String getTipoDoc() {
		return tipoDoc;
	}
	public void setTipoDoc(String tipoDoc) {
		this.tipoDoc = tipoDoc;
	}
	public String getNumDoc() {
		return numDoc;
	}
	public void setNumDoc(String numDoc) {
		this.numDoc = numDoc;
	}
	public String getGrupoEtnico() {
		return grupoEtnico;
	}
	public void setGrupoEtnico(String grupoEtnico) {
		this.grupoEtnico = grupoEtnico;
	}
	public String getSexo() {
		return sexo;
	}
	public void setSexo(String sexo) {
		this.sexo = sexo;
	}
	public String getNomRazonSocial() {
		return nomRazonSocial;
	}
	public void setNomRazonSocial(String nomRazonSocial) {
		this.nomRazonSocial = nomRazonSocial;
	}
	public String getDepartamento() {
		return departamento;
	}
	public void setDepartamento(String departamento) {
		this.departamento = departamento;
	}
	public String getMunicipio() {
		return municipio;
	}
	public void setMunicipio(String municipio) {
		this.municipio = municipio;
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
	public String getCorreo() {
		return correo;
	}
	public void setCorreo(String correo) {
		this.correo = correo;
	}
	public String getCelular() {
		return celular;
	}
	public void setCelular(String celular) {
		this.celular = celular;
	}
	
	
}
