package com.backend.comsiontest.resource;

import com.backend.comsiontest.service.BackEndService;
import com.backend.comsiontest.vo.TramiteAutodeclarativoLegRequestVo;
import com.backend.comsiontest.vo.TramiteAutodeclarativoLegResponseVo;

import com.backend.comsiontest.vo.*;

import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Service of BackEnd
 *
 * @author mario
 */
@RestController
@RequestMapping("/api/")
public class BackEndResource {

	@Autowired
	private BackEndService BackEndService;

	/*
	 * @GetMapping(value = "/obtenerPersonas") public
	 * ResponseEntity<List<PersonaVo>> obtenerPersonas() { try { List<PersonaVo> ou
	 * = BackEndService.obtenerPersonas(); return new ResponseEntity<>(ou,
	 * HttpStatus.OK); } catch (Exception e) { List<PersonaVo> ou = new
	 * ArrayList<>();
	 * LogManager.getLogger(this.getClass().getName()).error("BackEnd process fail:"
	 * + e.getMessage()); return new ResponseEntity<>(ou, HttpStatus.BAD_REQUEST); }
	 * 
	 * }
	 * 
	 * @GetMapping(value = "/obtenerTiposDocumento") public
	 * ResponseEntity<List<TipoDocumentoVo>> obtenerTiposDocumento() { try {
	 * List<TipoDocumentoVo> ou = BackEndService.obtenerTiposDocumento(); return new
	 * ResponseEntity<>(ou, HttpStatus.OK); } catch (Exception e) {
	 * List<TipoDocumentoVo> ou = new ArrayList<>();
	 * LogManager.getLogger(this.getClass().getName()).error("BackEnd process fail:"
	 * + e.getMessage()); return new ResponseEntity<>(ou, HttpStatus.BAD_REQUEST); }
	 * 
	 * }
	 * 
	 * 
	 * @PostMapping(value = "/guardarPersona") public ResponseEntity<PersonaVo>
	 * guardarPersona(@RequestBody PersonaVo personaVo) {
	 * personaVo.setProcessOk(false); try { BackEndService.guardar(personaVo);
	 * return new ResponseEntity<>(personaVo, HttpStatus.OK); } catch (Exception e)
	 * { personaVo.setMessage("BackEnd process fail:" + e.getMessage());
	 * personaVo.setProcessOk(false);
	 * LogManager.getLogger(this.getClass().getName()).error("BackEnd process fail:"
	 * + e.getMessage()); return new ResponseEntity<>(personaVo,
	 * HttpStatus.BAD_REQUEST); } }
	 * 
	 * @PostMapping(value = "/borrarPersona") public ResponseEntity<PersonaVo>
	 * borrarPersona(@RequestBody PersonaVo personaVo) {
	 * personaVo.setProcessOk(false); try { BackEndService.remover(personaVo);
	 * return new ResponseEntity<>(personaVo, HttpStatus.OK); } catch (Exception e)
	 * { personaVo.setMessage("BackEnd process fail:" + e.getMessage());
	 * personaVo.setProcessOk(false);
	 * LogManager.getLogger(this.getClass().getName()).error("BackEnd process fail:"
	 * + e.getMessage()); return new ResponseEntity<>(personaVo,
	 * HttpStatus.BAD_REQUEST); } }
	 * 
	 * @PostMapping(value = "/editarPersona") public ResponseEntity<PersonaVo>
	 * editarPersona(@RequestBody PersonaVo personaVo) {
	 * personaVo.setProcessOk(false); try { BackEndService.editar(personaVo); return
	 * new ResponseEntity<>(personaVo, HttpStatus.OK); } catch (Exception e) {
	 * personaVo.setMessage("BackEnd process fail:" + e.getMessage());
	 * personaVo.setProcessOk(false);
	 * LogManager.getLogger(this.getClass().getName()).error("BackEnd process fail:"
	 * + e.getMessage()); return new ResponseEntity<>(personaVo,
	 * HttpStatus.BAD_REQUEST); } }
	 */

	@PostMapping(value = "/guardarLegitimidad")
	public ResponseEntity<TramiteAutodeclarativoLegResponseVo> guardarLegitimidad(
			@RequestBody TramiteAutodeclarativoLegRequestVo request) {
		// personaVo.setProcessOk(false);
		TramiteAutodeclarativoLegResponseVo response = new TramiteAutodeclarativoLegResponseVo();
		try {
			Long id = BackEndService.guardarTramite(request);
			response.setId(String.valueOf(id));
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			LogManager.getLogger(this.getClass().getName()).error("BackEnd process fail:" + e.getMessage());
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping(value = "/editarLegitimidad")
	public ResponseEntity<TramiteAutodeclarativoLegResponseVo> editarLegitimidad(
			@RequestBody TramiteAutodeclarativoLegRequestVo request) {
		// personaVo.setProcessOk(false);
		TramiteAutodeclarativoLegResponseVo response = new TramiteAutodeclarativoLegResponseVo();
		try {
			Long id = BackEndService.editarTramite(request);
			response.setId(String.valueOf(id));
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			LogManager.getLogger(this.getClass().getName()).error("BackEnd process fail:" + e.getMessage());
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping(value = "/obtenerTramites")
	public ResponseEntity<List<TramiteAutodeclarativoLegRequestVo>> obtenerTramites(@RequestParam String id) {
		// personaVo.setProcessOk(false);
		TramiteAutodeclarativoLegResponseVo response = new TramiteAutodeclarativoLegResponseVo();
		try {
			List<TramiteAutodeclarativoLegRequestVo> tramites = BackEndService.obtenerTramites(id);
			return new ResponseEntity<>(tramites, HttpStatus.OK);
		} catch (Exception e) {
			LogManager.getLogger(this.getClass().getName()).error("BackEnd process fail:" + e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/obtenerPredios/{id}")
	public ResponseEntity<List<PredioResponse>> obtenerPredios(@PathVariable String id) {
		try {
			List<PredioResponse> predios = BackEndService.obtenerPredios(id);
			return new ResponseEntity<>(predios, HttpStatus.OK);
		} catch (Exception e) {
			LogManager.getLogger(this.getClass().getName()).error("BackEnd process fail:" + e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/filtroPredio")
	public ResponseEntity<List<PredioResponse>> filtrarPredios(@RequestBody FiltroPredioRequest filtro) {
		try {
			List<PredioResponse> predios = BackEndService.filtrarPredios(filtro);
			return new ResponseEntity<>(predios, HttpStatus.OK);
		} catch (Exception e) {
			LogManager.getLogger(this.getClass().getName()).error("BackEnd process fail:" + e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/editarInfoFisiEcono")
	public ResponseEntity<String> editarInfoFisiEcono(@RequestBody PredioResponse predio) {
		try {
			BackEndService.editarPredio(predio);
			return new ResponseEntity<>("200",HttpStatus.OK);
		} catch (Exception e) {
			LogManager.getLogger(this.getClass().getName()).error("BackEnd process fail:" + e.getMessage());
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/obtenerInfoContacto/{id}")
	public ResponseEntity<List<InfoContactoResponse>> obtenerInfoContacto(@PathVariable String id) {
		try {
			List<InfoContactoResponse> predios = BackEndService.obtenerInfoContacto(id);
			return new ResponseEntity<>(predios, HttpStatus.OK);
		} catch (Exception e) {
			LogManager.getLogger(this.getClass().getName()).error("BackEnd process fail:" + e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/guardarInfoContacto")
	public ResponseEntity<String> guardarInfoContacto(@RequestBody InfoContactoRequest request) {
		try {
			BackEndService.guardarInfoContacto(request);
			return new ResponseEntity<>("200",HttpStatus.OK);
		} catch (Exception e) {
			LogManager.getLogger(this.getClass().getName()).error("BackEnd process fail:" + e.getMessage());
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/actualizarInfoContacto")
	public ResponseEntity<String> actualizarInfoContacto(@RequestBody InfoContactoRequest request) {
		try {
			BackEndService.actualizarInfoContacto(request);
			return new ResponseEntity<>("200",HttpStatus.OK);
		} catch (Exception e) {
			LogManager.getLogger(this.getClass().getName()).error("BackEnd process fail:" + e.getMessage());
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/obtenerUsoConstruccion/{id}")
	public ResponseEntity<List<UsoConstruccionResponse>> obtenerUsoConstruccion(@PathVariable String id) {
	    
		return new ResponseEntity<>(BackEndService.obtenerUsosConstruccion(id), HttpStatus.OK);
	}

	@PostMapping("/guardarUsoConstruccion")
	public ResponseEntity<String> guardarUsoConstruccion(@RequestBody UsoConstruccionResponse request) {

		try {
			BackEndService.guardarUsoConstruccion(request);
			return new ResponseEntity<>("200",HttpStatus.OK);
		} catch (Exception e) {
			LogManager.getLogger(this.getClass().getName()).error("BackEnd process fail:" + e.getMessage());
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/actualizarUsoConstruccion")
	public ResponseEntity<String> actualizarUsoConstruccion(@RequestBody UsoConstruccionResponse request) {

		try {
			BackEndService.actualizarUsoConstruccion(request);
			return new ResponseEntity<>("200",HttpStatus.OK);
		} catch (Exception e) {
			LogManager.getLogger(this.getClass().getName()).error("BackEnd process fail:" + e.getMessage());
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

}
