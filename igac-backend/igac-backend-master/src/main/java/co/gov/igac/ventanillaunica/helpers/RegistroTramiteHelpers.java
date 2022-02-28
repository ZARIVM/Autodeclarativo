package co.gov.igac.ventanillaunica.helpers;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

/**
 * @author wbecerra
 *
 */
public class RegistroTramiteHelpers {
	private List<String> numeroPredial;
	private String nupre;
	private String codigoTramite;
	private String codigoTipoDocumental;
	private String tipoTramite;
	private String claseMutacion;
	private String subclaseMutacion;
	private String territorial;
	private Tercero tercero;
	private List<String> listRegistroAnexo;
	//Para Radicar documentos Forest 
	private String codigoDependencia;
	private String codigoDependenciaRadicadora;
	private String funRadicador;		
	
	public List<String> getListRegistroAnexo() {
		return listRegistroAnexo;
	}

	public void setListRegistroAnexo(List<String> listRegistroAnexo) {
		this.listRegistroAnexo = listRegistroAnexo;
	}

	public List<String> getNumeroPredial() {
		return numeroPredial;
	}

	public void setNumeroPredial(List<String> numeroPredial) {
		this.numeroPredial = numeroPredial;
	}

	public String getNupre() {
		return nupre;
	}

	public void setNupre(String nupre) {
		this.nupre = nupre;
	}

	

	public String getTipoTramite() {
		return tipoTramite;
	}

	public void setTipoTramite(String tipoTramite) {
		this.tipoTramite = tipoTramite;
	}

	public String getClaseMutacion() {
		return claseMutacion;
	}

	public void setClaseMutacion(String claseMutacion) {
		this.claseMutacion = claseMutacion;
	}

	public String getSubclaseMutacion() {
		return subclaseMutacion;
	}

	public void setSubclaseMutacion(String subclaseMutacion) {
		this.subclaseMutacion = subclaseMutacion;
	}

	
	

	public String getTerritorial() {
		return territorial;
	}

	public void setTerritorial(String territorial) {
		this.territorial = territorial;
	}

	
	public Tercero getTercero() {
		return tercero;
	}

	public void setTercero(Tercero tercero) {
		this.tercero = tercero;
	}

	public String getCodigoDependencia() {
		return codigoDependencia;
	}

	public void setCodigoDependencia(String codigoDependencia) {
		this.codigoDependencia = codigoDependencia;
	}

	public String getCodigoDependenciaRadicadora() {
		return codigoDependenciaRadicadora;
	}

	public void setCodigoDependenciaRadicadora(String codigoDependenciaRadicadora) {
		this.codigoDependenciaRadicadora = codigoDependenciaRadicadora;
	}

	public String getCodigoTramite() {
		return codigoTramite;
	}

	public void setCodigoTramite(String codigoTramite) {
		this.codigoTramite = codigoTramite;
	}

	public String getCodigoTipoDocumental() {
		return codigoTipoDocumental;
	}

	public String getFunRadicador() {
		return funRadicador;
	}

	public void setFunRadicador(String funRadicador) {
		this.funRadicador = funRadicador;
	}

	
	
}
