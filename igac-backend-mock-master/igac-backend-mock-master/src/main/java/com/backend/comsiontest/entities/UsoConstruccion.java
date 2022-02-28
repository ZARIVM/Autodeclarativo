package com.backend.comsiontest.entities;

import com.backend.comsiontest.vo.ModuleImages;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "usoconstruccion")
public class UsoConstruccion {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "usoconstruccion")
	private String usoConstruccion;
	@Column(name = "canthabitaciones")
	private int cantHabitaciones;
	@Column(name = "cantbanios")
	private int cantBanios;
	@Column(name = "cantlocales")
	private int cantLocales;
	@Column(name = "areaconst")
	private Double areaConst;
	@Column(name = "anioconst")
	private String anioConst;
	@Column(name = "totalareaConst")
	private Double totalAreaConst;

	// private ModuleImages[] fotos;//modulo fotos
	// falta lo de modulos
	private boolean estado;

	@ManyToOne(optional = false, fetch = FetchType.EAGER)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Predio predio;

	public UsoConstruccion() {
	}

	public UsoConstruccion(Long id,String usoConstruccion, int cantHabitaciones, int cantBanios, int cantLocales,
			Double areaConst, String anioConst, Double totalAreaConst, boolean estado, Predio predio) {
		super();
		this.usoConstruccion = usoConstruccion;
		this.cantHabitaciones = cantHabitaciones;
		this.cantBanios = cantBanios;
		this.cantLocales = cantLocales;
		this.areaConst = areaConst;
		this.anioConst = anioConst;
		this.totalAreaConst = totalAreaConst;
		// this.fotos = fotos;
		this.estado = estado;
		this.id =  id;
	this.predio = predio;
	}
	
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Predio getPredio() {
		return predio;
	}

	public void setPredio(Predio predio) {
		this.predio = predio;
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

//	public ModuleImages[] getFotos() {
//		return fotos;
//	}
//	public void setFotos(ModuleImages[] fotos) {
//		this.fotos = fotos;
//	}
	public boolean isEstado() {
		return estado;
	}

	public void setEstado(boolean estado) {
		this.estado = estado;
	}
//	public String getIdPredio() {
//		return idPredio;
//	}
//	public void setIdPredio(String idPredio) {
//		this.idPredio = idPredio;
//	}

}
