package com.backend.comsiontest.vo;

import java.util.ArrayList;
import java.util.List;

import java.util.stream.Collectors;

import com.backend.comsiontest.entities.DireccionPredio;
import com.backend.comsiontest.entities.Predio;

public class PredioResponse {

	private String folioMatricula;
	private Long numPredial;
	private String codigoNupre;
	private String departamento;
	private String municipio;
	private String destinoEconomico;
	private String arriendoVenta;
	private Double valor;
	private Double valorMinimo;
	private String fechaOferta;
	private String  numDocumento;
	private String[] direcciones;
	private String vereda;
	
	public PredioResponse(String folioMatricula, Long numPredial, String codigoNupre, String departamento,
			String municipio, String destinoEconomico, String arriendoVenta, Double valor, Double valorMinimo,
			String fechaOferta, String numDocumento, String[] direccion, String vereda) {
		super();
		this.folioMatricula = folioMatricula;
		this.numPredial = numPredial;
		this.codigoNupre = codigoNupre;
		this.departamento = departamento;
		this.municipio = municipio;
		this.destinoEconomico = destinoEconomico;
		this.arriendoVenta = arriendoVenta;
		this.valor = valor;
		this.valorMinimo = valorMinimo;
		this.fechaOferta = fechaOferta;
		this.numDocumento = numDocumento;
		this.direcciones = direccion;
		this.vereda =  vereda;
		
	}
	
	public String getVereda() {
		return vereda;
	}



	public void setVereda(String vereda) {
		this.vereda = vereda;
	}



	public String[] getDirecciones() {
		return direcciones;
	}



	public void setDirecciones(String[] direcciones) {
		this.direcciones = direcciones;
	}



	public String getFolioMatricula() {
		return folioMatricula;
	}
	public void setFolioMatricula(String folioMatricula) {
		this.folioMatricula = folioMatricula;
	}
	public Long getNumPredial() {
		return numPredial;
	}
	public void setNumPredial(Long numPredial) {
		this.numPredial = numPredial;
	}
	public String getCodigoNupre() {
		return codigoNupre;
	}
	public void setCodigoNupre(String codigoNupre) {
		this.codigoNupre = codigoNupre;
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
	public String getDestinoEconomico() {
		return destinoEconomico;
	}
	public void setDestinoEconomico(String destinoEconomico) {
		this.destinoEconomico = destinoEconomico;
	}
	public String getArriendoVenta() {
		return arriendoVenta;
	}
	public void setArriendoVenta(String arriendoVenta) {
		this.arriendoVenta = arriendoVenta;
	}
	public Double getValor() {
		return valor;
	}
	public void setValor(Double valor) {
		this.valor = valor;
	}
	public Double getValorMinimo() {
		return valorMinimo;
	}
	public void setValorMinimo(Double valorMinimo) {
		this.valorMinimo = valorMinimo;
	}
	public String getFechaOferta() {
		return fechaOferta;
	}
	public void setFechaOferta(String fechaOferta) {
		this.fechaOferta = fechaOferta;
	}
	public String getNumDocumento() {
		return numDocumento;
	}
	public void setNumDocumento(String numDocumento) {
		this.numDocumento = numDocumento;
	}
	
	
}
