package co.gov.igac.ventanillaunica.helpers;

public class AnexoTramiteHelpers {
	private String codigoUnico;	// código único para el anexo
	private String nombre;
	private Boolean opcional;
	
	public String getCodigoUnico() {
		return codigoUnico;
	}
	public void setCodigoUnico(String codigoUnico) {
		this.codigoUnico = codigoUnico;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public Boolean getOpcional() {
		return opcional;
	}
	public void setOpcional(Boolean opcional) {
		this.opcional = opcional;
	}

}
