package com.backend.comsiontest.vo;

public class ModuleImages {

	private int index;
	private String nombre;
	private String[] archivos;
	
	
	public ModuleImages(int index, String nombre, String[] archivos) {
		super();
		this.index = index;
		this.nombre = nombre;
		this.archivos = archivos;
	}
	public int getIndex() {
		return index;
	}
	public void setIndex(int index) {
		this.index = index;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String[] getArchivos() {
		return archivos;
	}
	public void setArchivos(String[] archivos) {
		this.archivos = archivos;
	}

	
	
}
