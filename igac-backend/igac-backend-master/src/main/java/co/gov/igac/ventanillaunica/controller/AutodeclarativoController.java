package co.gov.igac.ventanillaunica.controller;

import co.gov.igac.ventanillaunica.constantes.TiposEnum;
import co.gov.igac.ventanillaunica.helpers.DocumentoRequeridosRad;
import co.gov.igac.ventanillaunica.helpers.RegistroTramiteHelpers;
import co.gov.igac.ventanillaunica.helpers.ResponseDataHelpers;
import co.gov.igac.ventanillaunica.helpers.ResponseHelpers;
import co.gov.igac.ventanillaunica.util.JsonUtil;
import co.gov.igac.ventanillaunica.vo.*;
import io.swagger.v3.oas.annotations.Operation;
import net.minidev.json.JSONObject;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.*;

@RestController
@RequestMapping(path = "/VentanillaUnica")
public class AutodeclarativoController {

    private String host="http://localhost:8095/api/";
    private static final Log LOGGER = LogFactory.getLog(AutodeclarativoController.class);

    @CrossOrigin(origins = "*")
    @Operation(summary = "Listado tramites autodeclarativo ")
    @PostMapping("/listaTramitesAutodeclarativo")
//	@SecurityRequirement(name = "bearerAuth")
//	@RolesAllowed("User")
    public ResponseEntity<List<TramiteAutodeclarativoResponseVo>> listaTramitesAutodeclarativo(@RequestBody  TramiteAutodeclarativoRequestVo req) {
        List<TramiteAutodeclarativoResponseVo> response=new ArrayList<>();
        for(int i=0;i<10;i++) {
            TramiteAutodeclarativoResponseVo tramite = new TramiteAutodeclarativoResponseVo();
            tramite.setDepartamento("Nariño");
            tramite.setMunicipio("Pasto");
            tramite.setNumeroAuto("0001");
            tramite.setNumeroRadicado("000666");
            tramite.setNumeroPredial("50N45634543");
            if(i%2==0){tramite.setEstado("EN_CURSO");}
            else{tramite.setEstado("FINALIZADO");};
            response.add(tramite);
        }
        return new ResponseEntity<List<TramiteAutodeclarativoResponseVo>>(response, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @Operation(summary = "Listado tipos")
    @PostMapping("/listarTipos")
//	@SecurityRequirement(name = "bearerAuth")
//	@RolesAllowed("User")
    public ResponseEntity<List<TipoResponse>> listarTipos(@RequestBody TipoRequest req) {
        List<TipoResponse> response=new ArrayList<>();

        String[] vals=null;

        if(req.getIdTipo().equals(TiposEnum.TLEGS.name())){
            vals= new String[]{"Propietario",
                    "Poseedor u Ocupante" ,
                    "Heredero" ,
                    "Apoderado" ,
                    "Cónyuge o compañero(a) permanente"};
        }
        else if(req.getIdTipo().equals(TiposEnum.GRUPO_ETNICO.name())){
            vals= new String[]{"Indígena", "Rrom", "Raizal" ,"Palenquero", "Negro", "Afrocolombiano", "Ninguno"};
        }
        else if(req.getIdTipo().equals(TiposEnum.SEXO.name())){
            vals= new String[]{"Femenino","Masculino"};
        }
        else if(req.getIdTipo().equals(TiposEnum.TIPO_DOCUMENTOS.name())) {
        	vals= new String[]{"CC-CÉDULA DE CIUDADANÍA","CE-CÉDULA DE EXTRANJERÍA", " TI-TARJETA DE IDENTIDAD", "TARJETA DE EXTRANJERÍA", "NIT", "RC-REGISTRO CIVIL", "PASAPORTE"};
        }
        int i = 0;

        Arrays.asList(vals).stream().forEach(v->{
            TipoResponse tr=new TipoResponse();
            tr.setValue((response.size()+1)+"");
            tr.setText(v);
            response.add(tr);
        });
        return new ResponseEntity<List<TipoResponse>>(response, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @Operation(summary = "Guardar datos contacto")
    @PostMapping("/guardarLegitimidad1")
//	@SecurityRequirement(name = "bearerAuth")
//	@RolesAllowed("User")
    public ResponseEntity<TramiteAutodeclarativoLegResponseVo> guardarLegitimidad(@RequestBody TramiteAutodeclarativoLegRequestVo request) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            RestTemplate restTemplateToken = new RestTemplate();
            JSONObject response = new JSONObject();

            JSONObject paramForest = JsonUtil.converterJson(TramiteAutodeclarativoLegRequestVo.class, request);
            LOGGER.info("paramForest:" + paramForest);
            HttpHeaders headersForest = new HttpHeaders();
            headersForest.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> HttpMethodForest = new HttpEntity<String>(paramForest.toJSONString(), headersForest);
            TramiteAutodeclarativoLegResponseVo res = restTemplate.postForObject(host + "guardarLegitimidad", HttpMethodForest, TramiteAutodeclarativoLegResponseVo.class);
            return new ResponseEntity<TramiteAutodeclarativoLegResponseVo>(res, HttpStatus.OK);

        }
        catch(Exception e){
            //return new ResponseEntity<TramiteAutodeclarativoLegResponseVo>(HttpStatus.INTERNAL_SERVER_ERROR);
        	 return new ResponseEntity<TramiteAutodeclarativoLegResponseVo>(new TramiteAutodeclarativoLegResponseVo(), HttpStatus.OK);

        }
    }

    @CrossOrigin(origins = "*")
    @Operation(summary = "editarr datos contacto")
    @PostMapping("/editarLegitimidad1")
//	@SecurityRequirement(name = "bearerAuth")
//	@RolesAllowed("User")
    public ResponseEntity<TramiteAutodeclarativoLegResponseVo> editarLegitimidad(@RequestBody TramiteAutodeclarativoLegRequestVo request) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            RestTemplate restTemplateToken = new RestTemplate();
            JSONObject response = new JSONObject();

            JSONObject paramForest = JsonUtil.converterJson(TramiteAutodeclarativoLegRequestVo.class, request);
            LOGGER.info("paramForest:" + paramForest);
            HttpHeaders headersForest = new HttpHeaders();
            headersForest.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> HttpMethodForest = new HttpEntity<String>(paramForest.toJSONString(), headersForest);
            TramiteAutodeclarativoLegResponseVo res = restTemplate.postForObject(host + "editarLegitimidad", HttpMethodForest, TramiteAutodeclarativoLegResponseVo.class);
            return new ResponseEntity<TramiteAutodeclarativoLegResponseVo>(res, HttpStatus.OK);

        }
        catch(Exception e){
            return new ResponseEntity<TramiteAutodeclarativoLegResponseVo>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "*")
    @Operation(summary = "obtener Tramites")
    @PostMapping("/obtenerTramites")
//	@SecurityRequirement(name = "bearerAuth")
//	@RolesAllowed("User")
    public ResponseEntity<List<TramiteAutodeclarativoLegRequestVo>> obtenerTramites(@RequestParam String id) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            RestTemplate restTemplateToken = new RestTemplate();
            JSONObject response = new JSONObject();
            HttpHeaders headersForest = new HttpHeaders();
            headersForest.setContentType(MediaType.APPLICATION_JSON);
            List<TramiteAutodeclarativoLegRequestVo> res = restTemplate.getForObject(host + "obtenerTramites", List.class,id);

            return new ResponseEntity<List<TramiteAutodeclarativoLegRequestVo>>(res, HttpStatus.OK);

        }
        catch(Exception e){
            return new ResponseEntity<List<TramiteAutodeclarativoLegRequestVo>>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    @CrossOrigin(origins = "*")
    @Operation(summary = "obtener Predios")
    @GetMapping("/obtenerPredios/{id}")
//	@SecurityRequirement(name = "bearerAuth")
//	@RolesAllowed("User")
    public ResponseEntity<List<PredioResponse>> obtenerPredios(@PathVariable Long id) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            RestTemplate restTemplateToken = new RestTemplate();
            JSONObject response = new JSONObject();
            HttpHeaders headersForest = new HttpHeaders();
            headersForest.setContentType(MediaType.APPLICATION_JSON);
            List<PredioResponse> res = restTemplate.getForObject(host + "obtenerPredios/"+id, List.class);

            return new ResponseEntity<List<PredioResponse>>(res, HttpStatus.OK);

        }
        catch(Exception e){
        	/*List<PredioResponse> mock = new ArrayList<>();
        	mock.add(new PredioResponse("123","1","123","Antioquia","Medellin", "Agropecuario",
        		"Arriendo",(double) 300000,(double) 100000, "01/01/2020", "101822772", new String[] {"Carrera 7 # 84- 72",
        	            "Av. Ciudad de Cali No. 6C-09",
        	            "Avenida Cra. 60 No. 57-60",
        	            "Calle 11 No. 4-21 / 93",
        	            "Av. Calle 19 N° 2-49 Centro",
        	            "Calle 109a N° 17-10 Sede Norte",
        	            "Carrera 1 Este No. 17 01",
        	            "Carrera 13 # 26- 81"}, "vereda"));
        	mock.add(new PredioResponse("223","2","223","Antioquia","Medellin", "Minero",
            		"Venta",(double) 300000,(double) 100000, "01/01/2020", "101822772", new String[] {"Carrera 7 # 84- 72",
            	            "Av. Ciudad de Cali No. 6C-09",
            	            "Avenida Cra. 60 No. 57-60",
            	            "Calle 11 No. 4-21 / 93",
            	            "Av. Calle 19 N° 2-49 Centro",
            	            "Calle 109a N° 17-10 Sede Norte",
            	            "Carrera 1 Este No. 17 01",
            	            "Carrera 13 # 26- 81"}, "vereda"));
        	 return new ResponseEntity<List<PredioResponse>>(mock, HttpStatus.OK);
*/
            return new ResponseEntity<List<PredioResponse>>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    
    @CrossOrigin(origins = "*")
    @Operation(summary = "filtrar Predios")
    @PostMapping("/filtrarPredios")
//	@SecurityRequirement(name = "bearerAuth")
//	@RolesAllowed("User")
    public ResponseEntity<List<PredioResponse>> filtrarPredios(@RequestBody FiltroPredioRequest filtro) {
        try {
        	RestTemplate restTemplate = new RestTemplate();
            JSONObject paramForest = JsonUtil.converterJson(FiltroPredioRequest.class, filtro);
            LOGGER.info("paramForest:" + paramForest);
            HttpHeaders headersForest = new HttpHeaders();
            headersForest.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> HttpMethodForest = new HttpEntity<String>(paramForest.toJSONString(), headersForest);
            List<PredioResponse> res = restTemplate.postForObject(host + "filtroPredio", HttpMethodForest, List.class);
            return new ResponseEntity<List<PredioResponse>>(res, HttpStatus.OK);


        }
        catch(Exception e){
        	List<PredioResponse> mock = new ArrayList<>();
        	mock.add(new PredioResponse("222222",(long) 1,"123","Antioquia","Medellin", "Industrial",
        		"arriendo",(double) 300000,(double) 100000, "01/01/2020", "101822772", new String[] {"Carrera 7 # 84- 72",
        	            "Av. Ciudad de Cali No. 6C-09",
        	            "Avenida Cra. 60 No. 57-60",
        	            "Calle 11 No. 4-21 / 93",
        	            "Av. Calle 19 N° 2-49 Centro",
        	            "Calle 109a N° 17-10 Sede Norte",
        	            "Carrera 1 Este No. 17 01",
        	            "Carrera 13 # 26- 81"}, "vereda"));
        	mock.add(new PredioResponse("33333",(long) 1,"223","Antioquia","Medellin", "Industrial",
        			"arriendo",(double) 300000,(double) 100000, "01/01/2020", "101822772", new String[] {"Carrera 7 # 84- 72",
            	            "Av. Ciudad de Cali No. 6C-09",
            	            "Avenida Cra. 60 No. 57-60",
            	            "Calle 11 No. 4-21 / 93",
            	            "Av. Calle 19 N° 2-49 Centro",
            	            "Calle 109a N° 17-10 Sede Norte",
            	            "Carrera 1 Este No. 17 01",
            	            "Carrera 13 # 26- 81"}, "vereda"));
        	
            return new ResponseEntity<List<PredioResponse>>(HttpStatus.INTERNAL_SERVER_ERROR);
            
        	// return new ResponseEntity<List<PredioResponse>>(mock, HttpStatus.OK);

             }
    }
    
    @CrossOrigin(origins = "*")
    @Operation(summary = "obtener Destino Economico")
    @GetMapping("/obtenerDestinoEconomico")
//	@SecurityRequirement(name = "bearerAuth")
//	@RolesAllowed("User")
    
    public ResponseEntity<List<TipoResponse>> obtenerDestinoEconomico() {
    	 
    	List<TipoResponse> tipos = new ArrayList<>();
    	tipos.add(new TipoResponse("A", "Habitacional"));
    	tipos.add(new TipoResponse("B", "Industrial"));
    	tipos.add(new TipoResponse("C", "Comercial"));
    	tipos.add(new TipoResponse("D", "Agropecuario"));
    	tipos.add(new TipoResponse("E", "Minero"));
    	tipos.add(new TipoResponse("F", "Cultural"));
    	tipos.add(new TipoResponse("G", "Recreacional"));
    	tipos.add(new TipoResponse("H", "Salubridad"));
    	tipos.add(new TipoResponse("I", "Institucionales"));
    	tipos.add(new TipoResponse("J", "Educativo"));
    	tipos.add(new TipoResponse("K", "Religioso"));
    	tipos.add(new TipoResponse("L", "Agrícola"));
    	tipos.add(new TipoResponse("M", "Pecuario"));
    	tipos.add(new TipoResponse("N", "Agroindustrial"));
    	tipos.add(new TipoResponse("O", "Forestal"));
    	tipos.add(new TipoResponse("P", "Uso Público"));
    	tipos.add(new TipoResponse("Q", "Servicios Especiales"));
    	tipos.add(new TipoResponse("R", "Lote urbanizable no urbanizado"));
    	tipos.add(new TipoResponse("S", "Lote urbanizado no construido"));
    	
    	tipos.add(new TipoResponse("T", "Lote no urbanizable"));
    	 return new ResponseEntity<List<TipoResponse>>(tipos, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @Operation(summary = "Editar información física y económica del predio")
    @PutMapping("/editarInfoFisiEcono")
//	@SecurityRequirement(name = "bearerAuth")
//	@RolesAllowed("User")
    public ResponseEntity<HttpStatus> editarInfoFisiEcono(@RequestBody PredioResponse predio) {
    	ObjectMapper mapper = new ObjectMapper();
    	try {
        	RestTemplate restTemplate = new RestTemplate();
            String paramForest = mapper.writeValueAsString(predio);
            LOGGER.info("paramForest:" + paramForest);
            HttpHeaders headersForest = new HttpHeaders();
            headersForest.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> HttpMethodForest = new HttpEntity<String>(paramForest, headersForest);
            String res = restTemplate.postForObject(host + "editarInfoFisiEcono", HttpMethodForest, String.class);
           if(res.equalsIgnoreCase("200")) {
        	   return new ResponseEntity<HttpStatus>(HttpStatus.OK);
           }else {
        	    return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);
        	       
           }
        }
        catch(Exception e){

            return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}
