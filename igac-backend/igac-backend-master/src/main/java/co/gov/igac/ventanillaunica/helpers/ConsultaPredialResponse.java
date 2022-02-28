package co.gov.igac.ventanillaunica.helpers;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ConsultaPredialResponse {

    private Object message;
    private Predio[] predios;

    @JsonProperty("message")
    public Object getMessage() { return message; }
    @JsonProperty("message")
    public void setMessage(Object value) { this.message = value; }

    @JsonProperty("predios")
    public Predio[] getPredios() { return predios; }
    @JsonProperty("predios")
    public void setPredios(Predio[] value) { this.predios = value; }
}
