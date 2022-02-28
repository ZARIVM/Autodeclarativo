package com.backend.comsiontest.service;

import com.backend.comsiontest.entities.*;
import com.backend.comsiontest.repository.DireccionesPredioRepository;
import com.backend.comsiontest.repository.InfoContactoRepository;
import com.backend.comsiontest.repository.LegitimidadRepository;
import com.backend.comsiontest.repository.PredioRepository;
import com.backend.comsiontest.repository.TramiteAutodeclarativoRepository;
import com.backend.comsiontest.repository.UsoConstruccionRepository;
import com.backend.comsiontest.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Transactional(readOnly = true)
public class BackEndService {

	@Autowired
	private TramiteAutodeclarativoRepository tramiteAutodeclarativoRepository;

	@Autowired
	private LegitimidadRepository legitimidadRepository;

	@Autowired
	private PredioRepository predioRepo;

	@Autowired
	private InfoContactoRepository infoContRepo;
	
	@Autowired
	private UsoConstruccionRepository usoRepo;
	
	@Autowired
	private DireccionesPredioRepository dirRepo;

	@Transactional
	public Integer getNumberOrder() {
		/* return logisticRepository.getNumberOrder(); */
		return 0;
	}

	@Transactional
	public Long guardarTramite(TramiteAutodeclarativoLegRequestVo tramite) {
		TramiteAutodeclarativo ta = new TramiteAutodeclarativo();
		ta.setUsername(tramite.getUsername());
		ta = tramiteAutodeclarativoRepository.save(ta);
		Legitimidad leg = new Legitimidad();
		leg.setCelular(tramite.getCelular());
		leg.setDireccion(tramite.getDireccion());
		leg.setEmail(tramite.getEmail());
		leg.setVereda(tramite.getVereda());
		leg.setId(Long.valueOf(tramite.getIdLegi()));
		leg.setIdSexo(Long.valueOf(tramite.getIdSexo()));
		leg.setIdGrupoEtnico(Long.valueOf(tramite.getIdGrupoEtnico()));
		leg.setIdMunicipio(tramite.getIdMunicipio());
		leg.setIdDepartamento(tramite.getIdDepartamento());
		leg.setTelefono(tramite.getTelefono());
		leg.setUsername(tramite.getUsername());
		leg.setIdLegi(tramite.getIdLegi());
		leg = legitimidadRepository.save(leg);
		legitimidadRepository.flush();
		return ta.getId();
	}

	
	public Long editarTramite(TramiteAutodeclarativoLegRequestVo tramite) {
		TramiteAutodeclarativo ta = tramiteAutodeclarativoRepository.getById(Long.valueOf(tramite.getId()));
		Legitimidad leg = new Legitimidad();
		leg.setCelular(tramite.getCelular());
		leg.setDireccion(tramite.getDireccion());
		leg.setEmail(tramite.getEmail());
		leg.setVereda(tramite.getVereda());
		leg.setId(Long.valueOf(tramite.getIdLegi()));
		leg.setIdSexo(Long.valueOf(tramite.getIdSexo()));
		leg.setIdGrupoEtnico(Long.valueOf(tramite.getIdGrupoEtnico()));
		leg.setIdMunicipio(tramite.getIdMunicipio());
		leg.setIdDepartamento(tramite.getIdDepartamento());
		leg.setTelefono(tramite.getTelefono());
		leg.setUsername(tramite.getUsername());
		leg.setIdLegi(tramite.getIdLegi());
		leg = legitimidadRepository.save(leg);
		return ta.getId();
	}

	@Transactional
	public List<TramiteAutodeclarativoLegRequestVo> obtenerTramites(String id) {
		List<TramiteAutodeclarativoLegRequestVo> lout = new ArrayList<>();
		List<TramiteAutodeclarativo> tramites = tramiteAutodeclarativoRepository.findByUsername(id);
		lout = tramites.stream().map(x -> {
			TramiteAutodeclarativoLegRequestVo out = new TramiteAutodeclarativoLegRequestVo();
			out.setCelular(x.getLegitimidad().getCelular());
			return out;
		}).collect(Collectors.toList());

		return lout;
	}

	/*
	 * @Transactional public void saveOrder(String generateOrder, Integer
	 * numberOrder) throws Exception { try { Order or=new Order();
	 * or.setAddress(generateOrder.getCheckOut().getDirection());
	 * or.setDateOrder(generateOrder.getCheckOut().getDate());
	 * or.setProductTotal(generateOrder.getSum()); or.setOrderId(numberOrder);
	 * or.setClientId(generateOrder.getCheckOut().getClientId());
	 * or.setDateGeneration(new Date()); logisticRepository.save(or); }
	 * catch(Exception e){ e.printStackTrace(); String message="Error save order:"+
	 * e.getMessage();
	 * LogManager.getLogger(this.getClass().getName()).error(message); throw new
	 * Exception(message); } }
	 * 
	 */
	/*
	 * public List<String> getOrders() { return null; }
	 * 
	 * @Transactional public void guardar(PersonaVo personaVo) throws Exception {
	 * Persona per = PersonaConverter.toPersona(personaVo); TipoDocumento td =
	 * tipoDocumentoRepository.findById(personaVo.getTipoDocumento().getId()).get();
	 * per.setTipoDocumento(td); personaRepository.save(per);
	 * personaVo.setProcessOk(true);
	 * personaVo.setMessage("Se ha guardado correctamente"); }
	 * 
	 * @Transactional public void editar(PersonaVo personaVo) throws Exception {
	 * Persona per = personaRepository.findById(personaVo.getId()).get();
	 * PersonaConverter.toPersonaEdit(personaVo, per); TipoDocumento td =
	 * tipoDocumentoRepository.findById(personaVo.getTipoDocumento().getId()).get();
	 * per.setTipoDocumento(td); personaRepository.save(per);
	 * personaVo.setProcessOk(true);
	 * personaVo.setMessage("Se ha editado correctamente"); }
	 * 
	 * @Transactional public void remover(PersonaVo personaVo) throws Exception {
	 * Persona per = personaRepository.findById(personaVo.getId()).get();
	 * personaRepository.delete(per); personaVo.setProcessOk(true);
	 * personaVo.setMessage("Se ha eliminado correctamente"); }
	 * 
	 * public List<PersonaVo> obtenerPersonas() { List<Persona> pers =
	 * personaRepository.findAll(); return pers.stream().map(p ->
	 * PersonaConverter.toPersonaVo(p)).collect(Collectors.toList()); }
	 * 
	 * public List<TipoDocumentoVo> obtenerTiposDocumento() { List<TipoDocumento>
	 * pers = tipoDocumentoRepository.findAll(); return pers.stream().map(td ->
	 * TipoDocumentoConverter.toTipoDocumentoVO(td)).collect(Collectors.toList()); }
	 */

	@Transactional
	public PredioResponse convertModel(Predio predio) {
		List<DireccionPredio> dirs = new ArrayList<>(predio.getDirecciones());
		List<String> direcciones = new ArrayList<>();
		dirs.forEach(dir -> {
			direcciones.add(dir.getDireccion());
		});

		return new PredioResponse(predio.getFolioMatricula(), predio.getIdPredio(), predio.getCodigoNupre(),
				predio.getDepartamento(), predio.getMunicipio(), predio.getDestinoEconomico(),
				predio.getArriendoVenta(), predio.getValor(), predio.getValorMinimo(), predio.getFechaOferta(),
				predio.getInfoContacto().getNumDocumento(), direcciones.stream().toArray(String[]::new),
				predio.getVereda());
	}

	@Transactional
	public List<PredioResponse> obtenerPredios(String id) {

		List<InfoContacto> contactos = infoContRepo.findAll();
		InfoContacto cont = contactos.stream().filter(resp -> resp.getNumDocumento().equalsIgnoreCase(id)).findFirst()
				.get();
		List<Predio> toList = new ArrayList<>(cont.getPredios());
		List<PredioResponse> listP = new ArrayList<>();
		listP = toList.stream().map(x -> {
			PredioResponse prueba = convertModel(x);
			return prueba;
		}).collect(Collectors.toList());

		return listP;
	}

	@Transactional
	public List<PredioResponse> filtrarPredios(FiltroPredioRequest filtro) {

		List<Predio> predios = predioRepo.findAll();
		List<Predio> cont =  predios.stream()
				.filter(pre -> filtro.getCodigoNupre().equalsIgnoreCase(pre.getCodigoNupre())
						|| filtro.getDepartamento().equalsIgnoreCase(pre.getDepartamento())
						|| filtro.getMunicipio().equalsIgnoreCase(pre.getMunicipio())
						|| filtro.getFolioMatricula().equalsIgnoreCase(pre.getFolioMatricula())
						|| filtro.getNumeroPredial().equalsIgnoreCase(pre.getCodigoNupre())).collect(Collectors.toList());

		List<PredioResponse> listP = new ArrayList<>();
		listP = cont.stream().map(x -> {
			PredioResponse prueba = convertModel(x);
			return prueba;
		}).collect(Collectors.toList());

		return listP;
	}
	
	@Transactional
	public Long editarPredio(PredioResponse predio) {
		
		List<Predio> prds = predioRepo.findAll();
		Predio pred = prds.stream().filter(resp -> resp.getIdPredio() == predio.getNumPredial()).findFirst()
				.get();
		
		
		List<InfoContacto> contactos = infoContRepo.findAll();
		InfoContacto cont = contactos.stream().filter(resp -> resp.getNumDocumento().equalsIgnoreCase(predio.getNumDocumento())).findFirst()
				.get();
		
		Predio pre = new Predio();
		List<DireccionPredio> dir = new ArrayList<DireccionPredio>();
		
		String[] dire = predio.getDirecciones();
		for(int i=0; i<predio.getDirecciones().length;  i++) {
			dir.add(new DireccionPredio(dire[i], pred));
		}
		
		
		pred.setArriendoVenta(predio.getArriendoVenta());
		pred.setCodigoNupre(predio.getCodigoNupre());
		pred.setDepartamento(predio.getDepartamento());
		pred.setDestinoEconomico(predio.getDestinoEconomico());
		//pre.setDirecciones(dir);
		pred.setFechaOferta(predio.getFechaOferta());
		pred.setFolioMatricula(predio.getFolioMatricula());
		pred.setIdPredio(predio.getNumPredial());
		pred.setMunicipio(predio.getMunicipio());
		pred.setNumPredial(""+predio.getNumPredial());
		pred.setValor(predio.getValor());
		pred.setValorMinimo(predio.getValorMinimo());
		pred.setVereda(predio.getVereda());
		pred.setInfoContacto(cont);
		
		pre = predioRepo.save(pred);
		//dir = dirRepo.saveAll(dir);
		return pred.getIdPredio();
	}

	
	
	@Transactional
	public List<InfoContactoResponse> obtenerInfoContacto(String idPredial) {

		List<InfoContacto> contactos = infoContRepo.findAll();
		List<InfoContactoResponse> incon = contactos.stream().map(resp ->{
			return new InfoContactoResponse(resp.getIdTipo(), resp.getTipoDocumento(),
					resp.getNumDocumento(), resp.getIdGrupoEtnico(), resp.getIdSexo(),
					resp.getNombreRazon(), resp.getIdDepartamento(), resp.getIdMunicipio(),
					resp.getDireccion(), resp.getVereda(), resp.getTelefono(),
					resp.getCelular(), resp.getEmail());
		}).collect(Collectors.toList());
				

		return incon;
	}
	
	@Transactional
	public void guardarInfoContacto(InfoContactoRequest re) {
		List<Predio> prds = predioRepo.findAll();
		prds = prds.stream().filter(resp -> resp.getIdPredio() == Long.parseLong(re.getIdPredio())).collect(Collectors.toList());
		Set<Predio> predioSet = new HashSet<>(prds);
		//List<InfoContacto> contactos = infoContRepo.findAll();
		//InfoContacto incon = contactos.stream().filter(resp -> resp.getNumDocumento().equalsIgnoreCase(request.getNumDocumento())).findFirst().get();
		InfoContacto info = new InfoContacto(re.getIdTipo(),re.getTipoDocumento(), re.getNumDocumento(), re.getIdSexo(),
				re.getIdGrupoEtnico(), re.getNombreRazon(), re.getIdDepartamento(), re.getIdMunicipio(), re.getIdDireccion(),
				re.getVereda(), re.getTelefono(), re.getEmail(), re.getCelular(), re.getIdDireccion(), predioSet);
		info = 	infoContRepo.save(info);
		System.out.print(info.getCelular());
	}

	@Transactional
	public void actualizarInfoContacto(InfoContactoRequest re) {
		List<InfoContacto> contactos = infoContRepo.findAll();
		InfoContacto incon = contactos.stream().filter(resp -> resp.getNumDocumento().equalsIgnoreCase(re.getNumDocumento())).findFirst().get();
		InfoContacto info = new InfoContacto(re.getIdTipo(),re.getTipoDocumento(), re.getNumDocumento(), re.getIdSexo(),
				re.getIdGrupoEtnico(), re.getNombreRazon(), re.getIdDepartamento(), re.getIdMunicipio(), re.getIdDireccion(),
				re.getVereda(), re.getTelefono(), re.getEmail(), re.getCelular(), re.getIdDireccion(), incon.getPredios());
		info = 	infoContRepo.save(info);
	}
	
	@Transactional
	public void guardarUsoConstruccion(UsoConstruccionResponse re) {
		List<Predio> prds = predioRepo.findAll();
		Predio prd = prds.stream().filter(resp -> resp.getIdPredio() == Long.parseLong(re.getIdPredio())).findFirst().get();
		
		UsoConstruccion uso = new UsoConstruccion((long) 1, re.getUsoConstruccion(),re.getCantHabitaciones(), re.getCantBanios(), re.getCantLocales(),
				re.getAreaConst(), re.getAnioConst(), re.getTotalAreaConst(), re.isEstado(), prd);
		try {
			
		uso = usoRepo.save(uso);
		usoRepo.flush();

		}catch(Exception e) {
			prds.add(null);
			e.printStackTrace();
		}
		System.out.print(uso.getAnioConst());
	}

	@Transactional
	public void actualizarUsoConstruccion(UsoConstruccionResponse re) {
		List<UsoConstruccion> usoModel = usoRepo.findAll();
		UsoConstruccion usoBd = usoModel.stream().filter(resp -> resp.getId()== re.getId()).findFirst().get();
		
		UsoConstruccion uso = new UsoConstruccion(re.getId(), re.getUsoConstruccion(),re.getCantHabitaciones(), re.getCantBanios(), re.getCantLocales(),
				re.getAreaConst(), re.getAnioConst(), re.getTotalAreaConst(), re.isEstado(), usoBd.getPredio());
		
		uso = usoRepo.save(uso);
		System.out.print(uso.getAnioConst());
	}
	
	@Transactional
	public List<UsoConstruccionResponse> obtenerUsosConstruccion(String id) {

		List<UsoConstruccion> usos = usoRepo.findAll().stream().filter(resp -> resp.getPredio().getIdPredio().toString().equalsIgnoreCase(id)).collect(Collectors.toList());;
		List<UsoConstruccionResponse> incon = usos.stream().map(resp ->{
			
				return new UsoConstruccionResponse(resp.getUsoConstruccion(),resp.getCantHabitaciones(),resp.getCantBanios(),resp.getCantLocales(),
						resp.getAreaConst(), resp.getAnioConst(), resp.getTotalAreaConst(), null, resp.isEstado(), resp.getPredio().getIdPredio().toString(), resp.getId());

			
						
		}).collect(Collectors.toList());
				

		return incon;
	}
	
}
