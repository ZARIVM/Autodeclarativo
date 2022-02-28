package co.gov.igac.ventanillaunica.helpers;

public class RespuestaRegistroHelpers {
	private String estado;
	private String idTicket;
	private String[] errores;
	
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public String getIdTicket() {
		return idTicket;
	}
	public void setIdTicket(String idTicket) {
		this.idTicket = idTicket;
	}
	public String[] getErrores() {
		return errores;
	}
	public void setErrores(String[] errores) {
		this.errores = errores;
	}

}
