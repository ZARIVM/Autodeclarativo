package co.gov.igac.ventanillaunica.helpers;

public class SolCerCatastralHelpers {
	private DocumentoHelpers doc;
	private NombreCompletoHelpers nombreCompleto;
	private String numeroPredial; // depto + municipio + numpredial corto(15 / 25 dígitos) = 20 / 30 dígitos
	private Integer numeroPropietariosPredio;
	private Integer numeroPrediosPropietario;


	public DocumentoHelpers getDoc() {
		return doc;
	}

	public void setDoc(DocumentoHelpers doc) {
		this.doc = doc;
	}

	public NombreCompletoHelpers getNombreCompleto() {
		return nombreCompleto;
	}

	public void setNombreCompleto(NombreCompletoHelpers nombreCompleto) {
		this.nombreCompleto = nombreCompleto;
	}

	public String getNumeroPredial() {
		return numeroPredial;
	}

	public void setNumeroPredial(String numeroPredial) {
		this.numeroPredial = numeroPredial;
	}

	public Integer getNumeroPropietariosPredio() {
		return numeroPropietariosPredio;
	}

	public void setNumeroPropietariosPredio(Integer numeroPropietariosPredio) {
		this.numeroPropietariosPredio = numeroPropietariosPredio;
	}

	public Integer getNumeroPrediosPropietario() {
		return numeroPrediosPropietario;
	}

	public void setNumeroPrediosPropietario(Integer numeroPrediosPropietario) {
		this.numeroPrediosPropietario = numeroPrediosPropietario;
	}

}
