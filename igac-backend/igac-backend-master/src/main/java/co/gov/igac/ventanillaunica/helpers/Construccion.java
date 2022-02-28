package co.gov.igac.ventanillaunica.helpers;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Construccion {
    private long area;
    private long numBanos;
    private long numHabitaciones;
    private long numLocales;
    private long numPisos;
    private long puntaje;
    private long uso;

    @JsonProperty("area")
    public long getArea() { return area; }
    @JsonProperty("area")
    public void setArea(long value) { this.area = value; }

    @JsonProperty("numBanos")
    public long getNumBanos() { return numBanos; }
    @JsonProperty("numBanos")
    public void setNumBanos(long value) { this.numBanos = value; }

    @JsonProperty("numHabitaciones")
    public long getNumHabitaciones() { return numHabitaciones; }
    @JsonProperty("numHabitaciones")
    public void setNumHabitaciones(long value) { this.numHabitaciones = value; }

    @JsonProperty("numLocales")
    public long getNumLocales() { return numLocales; }
    @JsonProperty("numLocales")
    public void setNumLocales(long value) { this.numLocales = value; }

    @JsonProperty("numPisos")
    public long getNumPisos() { return numPisos; }
    @JsonProperty("numPisos")
    public void setNumPisos(long value) { this.numPisos = value; }

    @JsonProperty("puntaje")
    public long getPuntaje() { return puntaje; }
    @JsonProperty("puntaje")
    public void setPuntaje(long value) { this.puntaje = value; }

    @JsonProperty("uso")
    public long getUso() { return uso; }
    @JsonProperty("uso")
    public void setUso(long value) { this.uso = value; }
}
