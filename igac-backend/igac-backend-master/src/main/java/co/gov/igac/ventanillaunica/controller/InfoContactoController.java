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

import co.gov.igac.ventanillaunica.util.JsonUtil;
import co.gov.igac.ventanillaunica.vo.InfoContactoRequest;
import co.gov.igac.ventanillaunica.vo.InfoContactoResponse;
import co.gov.igac.ventanillaunica.vo.TramiteAutodeclarativoLegRequestVo;
import co.gov.igac.ventanillaunica.vo.TramiteAutodeclarativoLegResponseVo;
import io.swagger.v3.oas.annotations.Operation;
import net.minidev.json.JSONObject;

@RestController
@RequestMapping(path = "/InfoContacto")
public class InfoContactoController {

	  private String host="http://localhost:8095/api/";
	    private static final Log LOGGER = LogFactory.getLog(InfoContactoController.class);
	
	 @CrossOrigin(origins = "*")
	    @Operation(summary = "obtenerInfoContacto")
	    @GetMapping("/obtenerInfoContacto/{id}")
//		@SecurityRequirement(name = "bearerAuth")
//		@RolesAllowed("User")
	    public ResponseEntity<List<InfoContactoResponse>> obtenerInfoContacto(@PathVariable String id) {
	    	try {
	            RestTemplate restTemplate = new RestTemplate();
	            RestTemplate restTemplateToken = new RestTemplate();
	            JSONObject response = new JSONObject();
	            HttpHeaders headersForest = new HttpHeaders();
	            headersForest.setContentType(MediaType.APPLICATION_JSON);
	            List<InfoContactoResponse> res = restTemplate.getForObject(host + "obtenerInfoContacto/" +id, List.class);

	            return new ResponseEntity<List<InfoContactoResponse>>(res, HttpStatus.OK);

	        }
	        catch(Exception e){
	        /*	List<InfoContactoResponse> mock = new ArrayList<>();
	        	mock.add(new InfoContactoResponse("Propietario","CC", "1017256755", "Indígena","Masculino", "Razon social", "Antioquia", "Medellin", "Cr 12 #55-110", "vereda", "3503768", "3503768545", "juan@hotmail.com"));
	        	mock.add(new InfoContactoResponse("Propietario","CC", "12312111", "Indígena","Masculino", "Razon social", "Antioquia", "Medellin", "Cr 12 #55-110", "vereda", "3503768", "3503768545", "juan@hotmail.com"));
	        	mock.add(new InfoContactoResponse("Propietario","CC", "1234562111", "Indígena","Masculino", "Razon social", "Antioquia", "Medellin", "Cr 12 #55-110", "vereda", "3503768", "3503768545", "juan@hotmail.com"));
	        	
	        	return new ResponseEntity<List<InfoContactoResponse>>(mock, HttpStatus.OK);
*/
	            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	 
	 
	 @CrossOrigin(origins = "*")
	    @Operation(summary = "Guardar datos contacto")
	    @PostMapping("/guardar")
//		@SecurityRequirement(name = "bearerAuth")
//		@RolesAllowed("User")
	    public ResponseEntity<HttpStatus> guardarInfoContacto(@RequestBody InfoContactoRequest request) {
		 ObjectMapper mapper = new ObjectMapper();   
		 try {
	            RestTemplate restTemplate = new RestTemplate();
	            String paramForest = mapper.writeValueAsString(request);
	            LOGGER.info("paramForest:" + paramForest);
	            HttpHeaders headersForest = new HttpHeaders();
	            headersForest.setContentType(MediaType.APPLICATION_JSON);
	            HttpEntity<String> HttpMethodForest = new HttpEntity<String>(paramForest, headersForest);
	            String res = restTemplate.postForObject(host + "guardarInfoContacto", HttpMethodForest, String.class);
	            if(res.equalsIgnoreCase("200")) {
		         	   return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		            }else {
		         	    return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);
		         	       
		            }

	        }
	        catch(Exception e){
	            //return new ResponseEntity<TramiteAutodeclarativoLegResponseVo>(HttpStatus.INTERNAL_SERVER_ERROR);
	        	 return new ResponseEntity<HttpStatus>(HttpStatus.OK);

	        }
	    }
	 
	 
	 @CrossOrigin(origins = "*")
	    @Operation(summary = "Editar datos contacto")
	    @PutMapping("/actualizar")
//		@SecurityRequirement(name = "bearerAuth")
//		@RolesAllowed("User")
	    public ResponseEntity<HttpStatus> actualizarInfoContacto(@RequestBody InfoContactoRequest request) {
		 ObjectMapper mapper = new ObjectMapper();
		 try {
	            RestTemplate restTemplate = new RestTemplate();
	            String paramForest = mapper.writeValueAsString(request);
	            LOGGER.info("paramForest:" + paramForest);
	            HttpHeaders headersForest = new HttpHeaders();
	            headersForest.setContentType(MediaType.APPLICATION_JSON);
	            HttpEntity<String> HttpMethodForest = new HttpEntity<String>(paramForest, headersForest);
	            String res = restTemplate.postForObject(host + "actualizarInfoContacto", HttpMethodForest, String.class);
	            if(res.equalsIgnoreCase("200")) {
	         	   return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	            }else {
	         	    return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);
	         	       
	            }

	        }
	        catch(Exception e){
	            //return new ResponseEntity<TramiteAutodeclarativoLegResponseVo>(HttpStatus.INTERNAL_SERVER_ERROR);
	        	 return new ResponseEntity<HttpStatus>(HttpStatus.OK);

	        }
	    }

	
}
