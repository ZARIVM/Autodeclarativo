package co.gov.igac.ventanillaunica.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.cert.X509Certificate;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import javax.annotation.security.RolesAllowed;
import javax.net.ssl.SSLContext;

import co.gov.igac.ventanillaunica.helpers.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.TrustStrategy;
import org.keycloak.representations.AccessTokenResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import net.minidev.json.JSONObject;
import java.util.LinkedHashMap;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@RestController
@RequestMapping(path = "/VentanillaUnica")
public class VentanillaController {

	@Value("${imagenes}")
	private String UPLOADED_FOLDER;

	@Value("${uriJbpm}")
	private String URIJBPM;

	@Value("${uriForest}")
	private String URIFOREST;

	@Value("${uriToken}")
	private String URITOKEN;

	@Value("${usuarioJbpm}")
	private String USUJBPM;

	@Value("${clientsecretJbpm}")
	private String SECRETJBPM;

	@Value("${clientidJmpb}")
	private String CLIENTJBPM;

	@Value("${passwordJbpm}")
	private String PASSWORDJBPM;

	@Value("${granttype}")
	private String GRANTTYPE;

	@Value("${uriInfoPredial}")
	private String INFOPREDIAL;

	private static final String ORIGINAL = "ÁáÉéÍíÓóÚúÑñÜü";
	private static final String REPLACEMENT = "AaEeIiOoUuNnUu";

	private static final Log LOGGER = LogFactory.getLog(VentanillaController.class);
	private RestTemplate restTemplateToken;

	/**
	 * Solicitud de certificado catastral nacional - relaciona predios propiedad de
	 * un ciudadano en IGAC
	 * 
	 * @param solicitud datos básicos para solicitar un certificado
	 * @return idTicket / 0 en error
	 */
	@CrossOrigin(origins = "*")
	@Operation(summary = "Solicitud de certificado catastral nacional - relaciona predios propiedad de un ciudadano en IGAC")
	@PostMapping("/solicitarCertificadoCatastralNacional")
	@SecurityRequirement(name = "bearerAuth")
	@RolesAllowed("User")
	public Integer solicitarCertificadoCatastralNacional(@RequestBody SolCerCatastralHelpers solicitud) {
		return null;
	}

	/**
	 * Mutaciones de primera clase: Las que ocurran respecto del cambio de
	 * propietario o poseedor
	 * 
	 * Mutaciones de segunda clase: Las que ocurran en los linderos de los predios,
	 * por agregación o segregación con o sin cambio de propietario o poseedor
	 * 
	 *
	 * @return respuesta del registro exitoso o con fallos
	 */
	@CrossOrigin(origins = "*")
	@Operation(summary = "Registro de tramites a predios propiedad de un ciudadano en IGAC.")
	//@SecurityRequirement(name = "bearerAuth")
	@PostMapping("/registrarTramite")
	@RolesAllowed("User")
	public ResponseEntity<JSONObject> registrarTramite(@RequestBody RegistroTramiteHelpers registroTramite) {
		RestTemplate restTemplate = new RestTemplate();
		RestTemplate restTemplateToken = new RestTemplate();
		JSONObject response = new JSONObject();
		String numeroRadicado = null;
		String tipoTramite = null;

		// se crea tipo tramite para jbpm
		/*if (registroTramite.getClaseMutacion() != null && registroTramite.getSubclaseMutacion() != null) {
			tipoTramite = stripAccents(tipoTramite);
			tipoTramite = (registroTramite.getTipoTramite() + "_" + registroTramite.getClaseMutacion() + "_"
					+ registroTramite.getSubclaseMutacion());
		} else
		*//* if (registroTramite.getClaseMutacion() != null) {
			tipoTramite = stripAccents(tipoTramite);
			tipoTramite = (registroTramite.getTipoTramite() + "_" + registroTramite.getClaseMutacion());
		} else if (registroTramite.getTipoTramite() != null) {
			tipoTramite = stripAccents(tipoTramite);
			tipoTramite = (registroTramite.getTipoTramite());
		} else {
			throw new co.gov.igac.ventanillaunica.util.BadRequestException("tipoTramite: input not found");
		}
		LOGGER.info("tipoTramite:" + tipoTramite);*/
		
		tipoTramite = stripAccents(registroTramite.getTipoTramite());
		

		// carga imagenes para envio a forest
		List<DocumentoRequeridosRad> documentoRequeridosRad = new ArrayList<DocumentoRequeridosRad>();
		if (!registroTramite.getListRegistroAnexo().isEmpty()) {
			for (String unRegistro : registroTramite.getListRegistroAnexo()) {
				DocumentoRequeridosRad unDocumentoRequeridosRad = new DocumentoRequeridosRad();
				unDocumentoRequeridosRad.setCodigoDocReq(unRegistro);
				unDocumentoRequeridosRad.setDocRecibido("1");
				documentoRequeridosRad.add(unDocumentoRequeridosRad);
				LOGGER.info("Un documento :" + unDocumentoRequeridosRad);
			}
		}
		/*
		 * DocumentoRequeridosRad unDocumentoRequeridosRad = new
		 * DocumentoRequeridosRad();
		 * unDocumentoRequeridosRad.setCodigoDocReq(registroTramite.getCodigoDocReq());
		 * unDocumentoRequeridosRad.setDocRecibido("1");
		 * documentoRequeridosRad.add(unDocumentoRequeridosRad);
		 * LOGGER.info("Un documento :" + unDocumentoRequeridosRad);
		 */

		// envia a forest y devuelve numero radicado
		if(registroTramite.getTercero().getCodigoTipoDocumento()!= null && registroTramite.getTercero().getCodigoTipoDocumento().equals("CC")) {
			registroTramite.getTercero().setCodigoTipoDocumento("CED");
		}
		
		JSONObject paramForest = mapeoForest(registroTramite, tipoTramite, documentoRequeridosRad);
		LOGGER.info("paramForest:" + paramForest);
		HttpHeaders headersForest = new HttpHeaders();
		headersForest.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<String> HttpMethodForest = new HttpEntity<String>(paramForest.toJSONString(), headersForest);
		ResponseHelpers responseF = restTemplate.postForObject("https://sgd-api.igac.gov.co/radicar", HttpMethodForest, ResponseHelpers.class);
		numeroRadicado = responseF.getData().numeroRadicado;
		LOGGER.info("numeroRadicado:" + numeroRadicado);

		if(numeroRadicado != null){

		// envio a jbpm
		HttpHeaders headers = new HttpHeaders();
		JSONObject paramInObj = new JSONObject();
		// paramInObj.put("numRadicado", numberRandonDoc());
		paramInObj.put("numRadicado", numeroRadicado);
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		String fechaRadicado = sdf.format(new Date());
		LOGGER.info("fechaRadicado:" + fechaRadicado);
		paramInObj.put("fechaRadicado", fechaRadicado);
		// LOGGER.info("Ramdom:" + numberRandonDoc());
		paramInObj.put("numeroPredial", registroTramite.getNumeroPredial());
		paramInObj.put("tipoDocumento", registroTramite.getTercero().getCodigoTipoDocumento());
		paramInObj.put("numDocumento", registroTramite.getTercero().getNumDocumento());
		//se agregan campos del solicitante
		paramInObj.put("nombres", registroTramite.getTercero().getPrimerNombre() + " " + registroTramite.getTercero().getSegundoNombre());
		paramInObj.put("apellidos", registroTramite.getTercero().getPrimerApellido() + " " + registroTramite.getTercero().getSegundoApellido());
		paramInObj.put("correo", registroTramite.getTercero().getCorreoElectronico());
		paramInObj.put("direccion", registroTramite.getTercero().getDireccion());
		paramInObj.put("telefono", registroTramite.getTercero().getTelefonoMovil());
		
		paramInObj.put("tipoTramite", tipoTramite);
		paramInObj.put("territorial", registroTramite.getTerritorial());

		if (registroTramite.getTerritorial() == null) {
		}
		paramInObj.put("territorial", registroTramite.getTerritorial());
		if (registroTramite.getTercero().getUserName() == null) {
			throw new co.gov.igac.ventanillaunica.util.BadRequestException("userName: input not found");
		}
		paramInObj.put("usernameSolicitante", registroTramite.getTercero().getUserName());

		// busca toquen usuario jbpm
		MultiValueMap<String, String> requestParams = new LinkedMultiValueMap<>();
		this.restTemplateToken = new RestTemplate();
		requestParams.add("grant_type", "password");
		requestParams.add("client_id", "procesos-api");
		requestParams.add("client_secret", "adc65708-c41b-4542-932d-0963476c0aaf");
		requestParams.add("username", "igacusuario");
		requestParams.add("password", "QxEt9ThZ6w9k");

		AccessTokenResponse keycloakAccessToken;
		try {
			keycloakAccessToken = queryKeycloakByParams(requestParams);

			LOGGER.info("Token:" + keycloakAccessToken.getToken());

			// envia al jbpm
			headers.setContentType(MediaType.APPLICATION_JSON);
			headers.set("Authorization", "Bearer " + keycloakAccessToken.getToken());

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		LOGGER.info("paramForest:" + paramInObj.toJSONString());
		HttpEntity<String> HttpMethod = new HttpEntity<String>(paramInObj.toJSONString(), headers);
		String processId = restTemplate.postForObject(URIJBPM, HttpMethod, String.class);

		LOGGER.info("result:" + processId);

		/*
		 * if (!registroTramite.getListRegistroAnexo().isEmpty()) { for
		 * (RegistroAnexoHelpers unRegistro : registroTramite.getListRegistroAnexo()) {
		 * if (unRegistro.getUnArchivoFile() != null)
		 * registrarAnexoVentanilla(unRegistro.getUnArchivoFile(), processId); } }
		 */
			response.put("data", processId);
			response.put("output", "success");
			response.put("numRadicado", numeroRadicado);
		}else{
			response.put("data", null);
			response.put("output", "failed");
			response.put("numRadicado", numeroRadicado);
		}
		return new ResponseEntity<JSONObject>(response, HttpStatus.OK);

	}

	@CrossOrigin(origins = "*")
	@Operation(summary = "Listado de anexos por id de tramite ")
	// @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	@GetMapping("/listaAnexosTramite")
	@SecurityRequirement(name = "bearerAuth")
	@RolesAllowed("User")
	public List<AnexoTramiteHelpers> listaAnexosTramite(@RequestParam String idtramite) {
		List<AnexoTramiteHelpers> listAnexo = new ArrayList();
		return listAnexo;
	}

	@CrossOrigin(origins = "*")
	@Operation(summary = "Registro de anexos para tramite")
	@ResponseStatus
	@PostMapping("/registrarAnexo")
	@SecurityRequirement(name = "bearerAuth")
	@RolesAllowed("User")
	public ResponseEntity<JSONObject> registrarAnexo(@RequestParam("File") MultipartFile file, String processId,
			RedirectAttributes attributes) {
		JSONObject response = new JSONObject();
		if (file.isEmpty()) {
			attributes.addFlashAttribute("message ", "Por favor seleccionar archivo");
		}
		try {
			// crear directorio
			File directorio = new File(UPLOADED_FOLDER + File.separator + processId);
			if (!directorio.exists()) {
				directorio.mkdirs();
			}

			byte[] bytes = file.getBytes();
			Path path = Paths
					.get(UPLOADED_FOLDER + File.separator + processId + File.separator + file.getOriginalFilename());
			Files.write(path, bytes);
			attributes.addFlashAttribute("message ", "Archivo cargado correctamente:" + file.getOriginalFilename());
			LOGGER.info("imagen paso 1 :" + file.getOriginalFilename() + " en " + UPLOADED_FOLDER + File.separator
					+ processId + "-" + file.getOriginalFilename());
		} catch (IOException ex) {
			throw new RuntimeException(ex);
		}

		response.put("output", "success");
		response.put("data", processId);
		return new ResponseEntity<JSONObject>(response, HttpStatus.OK);
	}

	public void registrarAnexoVentanilla(MultipartFile file, String processId) {
		try {

			// crear directorio
			File directorio = new File(UPLOADED_FOLDER + File.separator + processId);
			if (!directorio.exists()) {
				directorio.mkdirs();
			}

			byte[] bytes = file.getBytes();
			Path path = Paths
					.get(UPLOADED_FOLDER + File.separator + processId + File.separator + file.getOriginalFilename());
			Files.write(path, bytes);
			LOGGER.info("imagen cargada :" + file.getOriginalFilename() + " en " + UPLOADED_FOLDER + File.separator
					+ processId + "-" + file.getOriginalFilename());
		} catch (IOException ex) {
			throw new RuntimeException(ex);
		}
	}

	private AccessTokenResponse queryKeycloakByParams(MultiValueMap<String, String> requestParams) throws Exception {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(requestParams, headers);
		AccessTokenResponse keycloakAccessToken = getAccessTokenResponse(request, "https://sso.igac.gov.co/auth/realms/IGAC/protocol/openid-connect/token");

		return keycloakAccessToken;
	}

	private AccessTokenResponse getAccessTokenResponse(HttpEntity<MultiValueMap<String, String>> request, String url)
			throws Exception {
		try {

			TrustStrategy acceptingTrustStrategy = (X509Certificate[] chain, String authType) -> true;

			SSLContext sslContext = org.apache.http.ssl.SSLContexts.custom()
					.loadTrustMaterial(null, acceptingTrustStrategy).build();

			SSLConnectionSocketFactory csf = new SSLConnectionSocketFactory(sslContext);

			CloseableHttpClient httpClient = HttpClients.custom().setSSLSocketFactory(csf).build();

			HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();

			requestFactory.setHttpClient(httpClient);

			RestTemplate restTemplateToken = new RestTemplate(requestFactory);

			ResponseEntity<AccessTokenResponse> response = restTemplateToken.postForEntity(url, request,
					AccessTokenResponse.class);
			return response.getBody();
		} catch (ResourceAccessException e) {
			/* log.error("KeyCloak getAccessTokenResponse: " + e.getMessage()); */
			System.out.println("KeyCloak getAccessTokenResponse: " + e.getMessage());
			try {
				ResponseEntity<AccessTokenResponse> response = restTemplateToken.postForEntity(url, request,
						AccessTokenResponse.class);
				return response.getBody();
			} catch (Exception ex) {
				throw ex;
			}
		} catch (Exception e) {
			throw e;
		}
	}

	public String numberRandonDoc() {
		Random aleatorio = new Random(System.currentTimeMillis());
		int numeroDocumento = aleatorio.nextInt(99999999);
		return String.valueOf(numeroDocumento);
	}

	public JSONObject mapeoForest(RegistroTramiteHelpers registroTramite, String tipoTramite,
			List<DocumentoRequeridosRad> documentoRequeridosRad) {
		JSONObject paramForest = new JSONObject();
		paramForest.put("codigoTipoDocumental", registroTramite.getCodigoTipoDocumental());
		paramForest.put("numeroFolios", 1);
		paramForest.put("codigoCanalEnvio", "PR");
		paramForest.put("codigoSistema", "SNC");//pendiente por entregar
		paramForest.put("codigoClaseDocumental", "ER");//Únicamente se van a realizar radicaciones de entrada.
		paramForest.put("codigoEjeTematico", "4");
		paramForest.put("codigoMedioEnvio", 4);// pendiente por definir
		paramForest.put("tipoRadicado", "006");
		paramForest.put("clasificacionInfo", "PUB");
		paramForest.put("codigoPaisNotificacion", "170");
		paramForest.put("codigoDependencia", registroTramite.getCodigoDependencia());

		paramForest.put("emailRespuesta", registroTramite.getTercero().getCorreoElectronico());
		paramForest.put("codigoTipoDocumental", registroTramite.getCodigoTipoDocumental());
		paramForest.put("acuseRecibo", "false");
		paramForest.put("observacionPQRS", "NA");
		paramForest.put("direccionNotificacion", "NA");
		paramForest.put("accionDocumento", null);
		paramForest.put("codigoDptoNotificacion", registroTramite.getTercero().getCodigoDepartamento());
		paramForest.put("telefonoRespuesta", registroTramite.getTercero().getTelefonoFijo());
		paramForest.put("asunto", tipoTramite);
		paramForest.put("codigoMunicipioNotificacion", registroTramite.getTercero().getCodigoCiudad());
		paramForest.put("celularRespuesta", registroTramite.getTercero().getTelefonoMovil());
		paramForest.put("funRadicador", registroTramite.getFunRadicador());
		String codigo = registroTramite.getCodigoDependenciaRadicadora();
		codigo = codigo.replace(".7", "");
		codigo = codigo.replace(".8", "");
		paramForest.put("codigoDependenciaRadicadora", codigo);
		paramForest.put("codigoTramite", registroTramite.getCodigoTramite());
		if (registroTramite.getTercero().getNotificarPorCorreoE())
			paramForest.put("respuestaElectronica", "1");
		else
			paramForest.put("respuestaElectronica", "0");
		registroTramite.getTercero().setCodigoPais("170");
		paramForest.put("tercero", registroTramite.getTercero());
		paramForest.put("documentosRequeridosRad", documentoRequeridosRad);

		return paramForest;

	}

	public static String stripAccents(String str) {
		if (str == null) {
			return null;
		}
		char[] array = str.toCharArray();
		for (int index = 0; index < array.length; index++) {
			int pos = ORIGINAL.indexOf(array[index]);
			if (pos > -1) {
				array[index] = REPLACEMENT.charAt(pos);
			}
		}
		return new String(array);
	}

	@CrossOrigin(origins = "*")
	@Operation(summary = "Consulta predial")
	@ResponseStatus
	@PostMapping("/consulta/predial")
	@SecurityRequirement(name = "bearerAuth")
	@RolesAllowed("User")
	public ResponseEntity<ConsultaPredialResponse> consulta(@RequestBody ConsultaPredialRequest consultaPredialRequest) throws JsonProcessingException {
		RestTemplate restTemplate = new RestTemplate();
		ObjectMapper objectMapper =  new ObjectMapper();
		String consultaPredialInfoRequest = objectMapper.writeValueAsString(consultaPredialRequest);
		LOGGER.info("consultaPredialInfoRequest:" + consultaPredialInfoRequest);
		HttpHeaders headersInfoPredial = new HttpHeaders();
		headersInfoPredial.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<String> HttpMethodInfoPredial = new HttpEntity<String>(consultaPredialInfoRequest, headersInfoPredial);
		ConsultaPredialResponse consultaPredialResponse = restTemplate.postForObject(INFOPREDIAL, HttpMethodInfoPredial, ConsultaPredialResponse.class);
		LOGGER.info("consultaPredialResponse:" + consultaPredialResponse.getPredios().length);
		return  new ResponseEntity<ConsultaPredialResponse>(consultaPredialResponse, HttpStatus.OK);
	}

}
