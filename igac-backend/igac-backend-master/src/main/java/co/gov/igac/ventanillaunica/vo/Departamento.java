package co.gov.igac.ventanillaunica.vo;

public class Departamento {

	  private int id;
	   private String departamento;
	   private String[] municipios;
	   
	   
	   
	public Departamento(int i, String departamento, String[] municipios) {
		super();
		this.id = i;
		this.departamento = departamento;
		this.municipios = municipios;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDepartamento() {
		return departamento;
	}
	public void setDepartamento(String departamento) {
		this.departamento = departamento;
	}
	public String[] getMunicipios() {
		return municipios;
	}
	public void setMunicipios(String[] municipios) {
		this.municipios = municipios;
	}
	   
	   
	 
}
