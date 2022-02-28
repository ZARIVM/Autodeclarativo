package co.gov.igac.ventanillaunica.helpers;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Predio {

    private long areaConstruccion;
    private long areaTerreno;
    private long avaluo;
    private String codDestino;
    private String codDpto;
    private String codMpio;
    private Construccion[] construcciones;
    private String direccion;
    private String matricula;
    private String numPredial;
    private String numPredialAnterior;
    private Propietario[] propietarios;
    private Terreno[] terrenos;

    @JsonProperty("areaConstruccion")
    public long getAreaConstruccion() { return areaConstruccion; }
    @JsonProperty("areaConstruccion")
    public void setAreaConstruccion(long value) { this.areaConstruccion = value; }

    @JsonProperty("areaTerreno")
    public long getAreaTerreno() { return areaTerreno; }
    @JsonProperty("areaTerreno")
    public void setAreaTerreno(long value) { this.areaTerreno = value; }

    @JsonProperty("avaluo")
    public long getAvaluo() { return avaluo; }
    @JsonProperty("avaluo")
    public void setAvaluo(long value) { this.avaluo = value; }

    @JsonProperty("codDestino")
    public String getCodDestino() { return codDestino; }
    @JsonProperty("codDestino")
    public void setCodDestino(String value) { this.codDestino = value; }

    @JsonProperty("codDpto")
    public String getCodDpto() { return codDpto; }
    @JsonProperty("codDpto")
    public void setCodDpto(String value) { this.codDpto = value; }

    @JsonProperty("codMpio")
    public String getCodMpio() { return codMpio; }
    @JsonProperty("codMpio")
    public void setCodMpio(String value) { this.codMpio = value; }

    @JsonProperty("construcciones")
    public Construccion[] getConstrucciones() { return construcciones; }
    @JsonProperty("construcciones")
    public void setConstrucciones(Construccion[] value) { this.construcciones = value; }

    @JsonProperty("direccion")
    public String getDireccion() { return direccion; }
    @JsonProperty("direccion")
    public void setDireccion(String value) { this.direccion = value; }

    @JsonProperty("matricula")
    public String getMatricula() { return matricula; }
    @JsonProperty("matricula")
    public void setMatricula(String value) { this.matricula = value; }

    @JsonProperty("numPredial")
    public String getNumPredial() { return numPredial; }
    @JsonProperty("numPredial")
    public void setNumPredial(String value) { this.numPredial = value; }

    @JsonProperty("numPredialAnterior")
    public String getNumPredialAnterior() { return numPredialAnterior; }
    @JsonProperty("numPredialAnterior")
    public void setNumPredialAnterior(String value) { this.numPredialAnterior = value; }

    @JsonProperty("propietarios")
    public Propietario[] getPropietarios() { return propietarios; }
    @JsonProperty("propietarios")
    public void setPropietarios(Propietario[] value) { this.propietarios = value; }

    @JsonProperty("terrenos")
    public Terreno[] getTerrenos() { return terrenos; }
    @JsonProperty("terrenos")
    public void setTerrenos(Terreno[] value) { this.terrenos = value; }
}
