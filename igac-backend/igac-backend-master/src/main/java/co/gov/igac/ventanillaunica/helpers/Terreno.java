package co.gov.igac.ventanillaunica.helpers;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Terreno {
    private long area;
    private String zonaFisica;
    private String zonaGeoEconomica;

    @JsonProperty("area")
    public long getArea() { return area; }
    @JsonProperty("area")
    public void setArea(long value) { this.area = value; }

    @JsonProperty("zonaFisica")
    public String getZonaFisica() { return zonaFisica; }
    @JsonProperty("zonaFisica")
    public void setZonaFisica(String value) { this.zonaFisica = value; }

    @JsonProperty("zonaGeoEconomica")
    public String getZonaGeoEconomica() { return zonaGeoEconomica; }
    @JsonProperty("zonaGeoEconomica")
    public void setZonaGeoEconomica(String value) { this.zonaGeoEconomica = value; }

}
