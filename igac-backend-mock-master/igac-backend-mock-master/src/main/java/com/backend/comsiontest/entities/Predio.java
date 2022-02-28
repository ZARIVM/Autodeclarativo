package com.backend.comsiontest.entities;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "PREDIO")
public class Predio {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idPredio;
    @Column(name = "foliomatricula")
    private String folioMatricula;
    @Column(name = "numpredial")
    private String numPredial;
    @Column(name = "codigonupre")
    private String codigoNupre;
    @Column
    private String departamento;
    @Column
    private String municipio;
    @Column(name = "destinoeconomico")
    private String destinoEconomico;
    @Column(name = "arriendoventa")
    private String arriendoVenta;
    @Column
    private Double valor;
    @Column(name = "valorminimo")
    private Double valorMinimo;
    @Column(name = "fechaoferta")
    private String fechaOferta;
    @Column
    private String vereda;
    
    
    @OneToMany(mappedBy = "predio", fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private Set<DireccionPredio> direcciones; //tabla de lista de direcciones

    public Predio() {
    }

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private InfoContacto infoContacto;

    @OneToMany(mappedBy = "predio", fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private Set<UsoConstruccion> usoConstrucciones;

    //private String  numDocumento; //relacion tabla info contacto

    public String getVereda() {
        return vereda;
    }


    public Long getIdPredio() {
		return idPredio;
	}


	public void setIdPredio(Long idPredio) {
		this.idPredio = idPredio;
	}


	public Set<DireccionPredio> getDirecciones() {
		return direcciones;
	}


	public void setDirecciones(Set<DireccionPredio> direcciones) {
		this.direcciones = direcciones;
	}


	public InfoContacto getInfoContacto() {
		return infoContacto;
	}


	public void setInfoContacto(InfoContacto infoContacto) {
		this.infoContacto = infoContacto;
	}


	public Set<UsoConstruccion> getUsoConstrucciones() {
		return usoConstrucciones;
	}


	public void setUsoConstrucciones(Set<UsoConstruccion> usoConstrucciones) {
		this.usoConstrucciones = usoConstrucciones;
	}


	public void setVereda(String vereda) {
        this.vereda = vereda;
    }


//    public String[] getDirecciones() {
//        return direcciones;
//    }
//
//
//    public void setDirecciones(String[] direcciones) {
//        this.direcciones = direcciones;
//    }


    public String getFolioMatricula() {
        return folioMatricula;
    }

    public void setFolioMatricula(String folioMatricula) {
        this.folioMatricula = folioMatricula;
    }

    public String getNumPredial() {
        return numPredial;
    }

    public void setNumPredial(String numPredial) {
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

//    public String getNumDocumento() {
//        return numDocumento;
//    }
//
//    public void setNumDocumento(String numDocumento) {
//        this.numDocumento = numDocumento;
//    }


}
