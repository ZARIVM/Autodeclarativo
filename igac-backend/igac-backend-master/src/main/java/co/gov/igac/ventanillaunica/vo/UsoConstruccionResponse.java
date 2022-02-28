package co.gov.igac.ventanillaunica.vo;


public class UsoConstruccionResponse {

	private String usoConstruccion;
	private int cantHabitaciones;
	private int cantBanios;
	private int cantLocales;
	private Double areaConst;
	private String anioConst;
	private Double totalAreaConst;
	private ModuleImages[] fotos;
	//falta lo de modulos
	private boolean estado;
	private String idPredio;
	private Long id;
	
	public UsoConstruccionResponse(String usoConstruccion, int cantHabitaciones, int cantBanios, int cantLocales,
			Double areaConst, String anioConst, Double totalAreaConst, ModuleImages[] fotos, boolean estado,
			String idPredio, Long id) {
		super();
		this.usoConstruccion = usoConstruccion;
		this.cantHabitaciones = cantHabitaciones;
		this.cantBanios = cantBanios;
		this.cantLocales = cantLocales;
		this.areaConst = areaConst;
		this.anioConst = anioConst;
		this.totalAreaConst = totalAreaConst;
		this.fotos = fotos;
		this.estado = estado;
		this.idPredio = idPredio;
		this.id = id;
	}
	
	
	
	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getUsoConstruccion() {
		return usoConstruccion;
	}
	public void setUsoConstruccion(String usoConstruccion) {
		this.usoConstruccion = usoConstruccion;
	}
	public int getCantHabitaciones() {
		return cantHabitaciones;
	}
	public void setCantHabitaciones(int cantHabitaciones) {
		this.cantHabitaciones = cantHabitaciones;
	}
	public int getCantBanios() {
		return cantBanios;
	}
	public void setCantBanios(int cantBanios) {
		this.cantBanios = cantBanios;
	}
	public int getCantLocales() {
		return cantLocales;
	}
	public void setCantLocales(int cantLocales) {
		this.cantLocales = cantLocales;
	}
	public Double getAreaConst() {
		return areaConst;
	}
	public void setAreaConst(Double areaConst) {
		this.areaConst = areaConst;
	}
	public String getAnioConst() {
		return anioConst;
	}
	public void setAnioConst(String anioConst) {
		this.anioConst = anioConst;
	}
	public Double getTotalAreaConst() {
		return totalAreaConst;
	}
	public void setTotalAreaConst(Double totalAreaConst) {
		this.totalAreaConst = totalAreaConst;
	}
	public ModuleImages[] getFotos() {
		return fotos;
	}
	public void setFotos(ModuleImages[] fotos) {
		this.fotos = fotos;
	}
	public boolean isEstado() {
		return estado;
	}
	public void setEstado(boolean estado) {
		this.estado = estado;
	}
	public String getIdPredio() {
		return idPredio;
	}
	public void setIdPredio(String idPredio) {
		this.idPredio = idPredio;
	}
	
	
}
