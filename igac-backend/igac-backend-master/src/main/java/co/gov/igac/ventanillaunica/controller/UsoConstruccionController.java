package co.gov.igac.ventanillaunica.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

import co.gov.igac.ventanillaunica.constantes.TiposEnum;
import co.gov.igac.ventanillaunica.util.JsonUtil;
import co.gov.igac.ventanillaunica.vo.InfoContactoRequest;
import co.gov.igac.ventanillaunica.vo.InfoContactoResponse;
import co.gov.igac.ventanillaunica.vo.ModuleImages;
import co.gov.igac.ventanillaunica.vo.TipoResponse;
import co.gov.igac.ventanillaunica.vo.UsoConstruccionResponse;
import io.swagger.v3.oas.annotations.Operation;
import net.minidev.json.JSONObject;

@RestController
@RequestMapping(path = "/UsoConstruccion")
public class UsoConstruccionController {

	private String host = "http://localhost:8095/api/";
	private static final Log LOGGER = LogFactory.getLog(UsoConstruccionController.class);

	@CrossOrigin(origins = "*")
	@Operation(summary = "obtenerUsoConstruccion")
	@GetMapping("/obtenerUsoConstruccion/{id}")
//		@SecurityRequirement(name = "bearerAuth")
//		@RolesAllowed("User")
	public ResponseEntity<List<UsoConstruccionResponse>> obtenerUsoConstruccion(@PathVariable String id) {
		try {
			RestTemplate restTemplate = new RestTemplate();
			RestTemplate restTemplateToken = new RestTemplate();
			JSONObject response = new JSONObject();
			HttpHeaders headersForest = new HttpHeaders();
			headersForest.setContentType(MediaType.APPLICATION_JSON);
			List<UsoConstruccionResponse> res = restTemplate.getForObject(host + "obtenerUsoConstruccion/"+id, List.class);

			return new ResponseEntity<List<UsoConstruccionResponse>>(res, HttpStatus.OK);

		} catch (Exception e) {
			List<UsoConstruccionResponse> mock = new ArrayList<>();
			mock.add(new UsoConstruccionResponse("Residencial", 1, 10, 11, (double) 111, "2021", (double) 222,
					new ModuleImages[] { new ModuleImages(1, "name1", new String[] { "foto1" }) }, true, "111",
					(long) 1));
			mock.add(new UsoConstruccionResponse("Residencial", 123, 10, 11, (double) 111, "1998", (double) 222,
					new ModuleImages[] { new ModuleImages(1, "name2", new String[] { "foto2" }) }, true, "111",
					(long) 1));
			mock.add(new UsoConstruccionResponse("Residencial", 1, 10, 11, (double) 111, "2021", (double) 222,
					new ModuleImages[] { new ModuleImages(1, "name3", new String[] { "foto3" }) }, false, "111",
					(long) 1));
			mock.add(new UsoConstruccionResponse("Residencial", 1, 10, 11, (double) 111, "2021", (double) 222,
					new ModuleImages[] { new ModuleImages(1, "name4", new String[] { "foto4" }) }, false, "111",
					(long) 1));

			//return new ResponseEntity<List<UsoConstruccionResponse>>(mock, HttpStatus.OK);

		return new	ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@CrossOrigin(origins = "*")
	@Operation(summary = "Guardar usos construccion")
	@PostMapping("/guardar")
//		@SecurityRequirement(name = "bearerAuth")
//		@RolesAllowed("User")
	public ResponseEntity<HttpStatus> guardarInfoContacto(@RequestBody UsoConstruccionResponse request) {
		 ObjectMapper mapper = new ObjectMapper();   
		try {
			RestTemplate restTemplate = new RestTemplate();

			String paramForest = mapper.writeValueAsString(request);
			LOGGER.info("paramForest:" + paramForest);
			HttpHeaders headersForest = new HttpHeaders();
			headersForest.setContentType(MediaType.APPLICATION_JSON);
			HttpEntity<String> HttpMethodForest = new HttpEntity<String>(paramForest, headersForest);
			String res = restTemplate.postForObject(host + "guardarUsoConstruccion", HttpMethodForest, String.class);
			if (res.equalsIgnoreCase("200")) {
				return new ResponseEntity<HttpStatus>(HttpStatus.OK);
			} else {
				return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);

			}

		} catch (Exception e) {
			// return new
			// ResponseEntity<TramiteAutodeclarativoLegResponseVo>(HttpStatus.INTERNAL_SERVER_ERROR);
			return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}

	@CrossOrigin(origins = "*")
	@Operation(summary = "Editar usos construccion")
	@PutMapping("/actualizar")
//		@SecurityRequirement(name = "bearerAuth")
//		@RolesAllowed("User")
	public ResponseEntity<HttpStatus> actualizarUsoConstruccion(@RequestBody UsoConstruccionResponse request) {
		 ObjectMapper mapper = new ObjectMapper();   
		try {
			RestTemplate restTemplate = new RestTemplate();

			String paramForest = mapper.writeValueAsString(request);
			LOGGER.info("paramForest:" + paramForest);
			HttpHeaders headersForest = new HttpHeaders();
			headersForest.setContentType(MediaType.APPLICATION_JSON);
			HttpEntity<String> HttpMethodForest = new HttpEntity<String>(paramForest, headersForest);
			String res = restTemplate.postForObject(host + "actualizarUsoConstruccion", HttpMethodForest, String.class);
			if (res.equalsIgnoreCase("200")) {
				return new ResponseEntity<HttpStatus>(HttpStatus.OK);
			} else {
				return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);

			}

		} catch (Exception e) {
			return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}

	@CrossOrigin(origins = "*")
	@Operation(summary = "obtenerListUsoConstruccion")
	@GetMapping("/obtenerListUsoConstruccion")
//		@SecurityRequirement(name = "bearerAuth")
//		@RolesAllowed("User")
	public ResponseEntity<List<TipoResponse>> obtenerListUsoConstruccion() {

		List<TipoResponse> tipos = new ArrayList<>();
		tipos.add(new TipoResponse("1", "Residencial"));
		tipos.add(new TipoResponse("2", "Comercial"));
		tipos.add(new TipoResponse("3", "Industrial"));
		tipos.add(new TipoResponse("4", "Anexos"));
		return new ResponseEntity<List<TipoResponse>>(tipos, HttpStatus.OK);

	}

}
