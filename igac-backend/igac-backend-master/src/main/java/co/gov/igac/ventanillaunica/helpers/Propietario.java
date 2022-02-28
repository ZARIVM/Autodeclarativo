package co.gov.igac.ventanillaunica.helpers;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Propietario {

    private String nombre;
    private String numDoc;
    private String tipoDoc;
    private String ecivil;

    @JsonProperty("nombre")
    public String getNombre() { return nombre; }
    @JsonProperty("nombre")
    public void setNombre(String value) { this.nombre = value; }

    @JsonProperty("numDoc")
    public String getNumDoc() { return numDoc; }
    @JsonProperty("numDoc")
    public void setNumDoc(String value) { this.numDoc = value; }

    @JsonProperty("tipoDoc")
    public String getTipoDoc() { return tipoDoc; }
    @JsonProperty("tipoDoc")
    public void setTipoDoc(String value) { this.tipoDoc = value; }

    @JsonProperty("ecivil")
    public String getEcivil() { return ecivil; }
    @JsonProperty("ecivil")
    public void setEcivil(String value) { this.ecivil = value; }
}
