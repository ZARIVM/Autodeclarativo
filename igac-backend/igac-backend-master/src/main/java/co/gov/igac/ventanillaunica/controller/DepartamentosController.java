package co.gov.igac.ventanillaunica.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.gov.igac.ventanillaunica.vo.Departamento;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping(path = "/Departamentos")
public class DepartamentosController {

	     @CrossOrigin(origins = "*")
	    @Operation(summary = "Listado departamentos")
	    @GetMapping("/listaDepartamentos")
//		@SecurityRequirement(name = "bearerAuth")
//		@RolesAllowed("User")
	    public ResponseEntity<List<Departamento>> listarDepartamentos(HttpServletRequest request) {
	    
	        return new ResponseEntity<List<Departamento>>(getDepartamento(), HttpStatus.OK);
	    }
	     
	     
	     
	     public List<Departamento> getDepartamento() {
	    	 List<Departamento> depar =  new ArrayList<>();
	    	 
	    	 depar.add(new Departamento(0, "Amazonas", new String[]{"Leticia", "Puerto Nari\\u00f1o"}));
	    	 depar.add(new Departamento(1, "Antioquia", new String[]{"Abejorral",
	    	            "Abriaqu\u00ed",
	    	            "Alejandr\u00eda",
	    	            "Amag\u00e1",
	    	            "Amalfi",
	    	            "Andes",
	    	            "Angel\u00f3polis",
	    	            "Angostura",
	    	            "Anor\u00ed",
	    	            "Anz\u00e1",
	    	            "Apartad\u00f3",
	    	            "Arboletes",
	    	            "Argelia",
	    	            "Armenia",
	    	            "Barbosa",
	    	            "Bello",
	    	            "Belmira",
	    	            "Betania",
	    	            "Betulia",
	    	            "Brice\u00f1o",
	    	            "Buritic\u00e1",
	    	            "C\u00e1ceres",
	    	            "Caicedo",
	    	            "Caldas",
	    	            "Campamento",
	    	            "Ca\u00f1asgordas",
	    	            "Caracol\u00ed",
	    	            "Caramanta",
	    	            "Carepa",
	    	            "Carolina del Pr\u00edncipe",
	    	            "Caucasia",
	    	            "Chigorod\u00f3",
	    	            "Cisneros",
	    	            "Ciudad Bol\u00edvar",
	    	            "Cocorn\u00e1",
	    	            "Concepci\u00f3n",
	    	            "Concordia",
	    	            "Copacabana",
	    	            "Dabeiba",
	    	            "Donmat\u00edas",
	    	            "Eb\u00e9jico",
	    	            "El Bagre",
	    	            "El Carmen de Viboral",
	    	            "El Pe\u00f1ol",
	    	            "El Retiro",
	    	            "El Santuario",
	    	            "Entrerr\u00edos",
	    	            "Envigado",
	    	            "Fredonia",
	    	            "Frontino",
	    	            "Giraldo",
	    	            "Girardota",
	    	            "G\u00f3mez Plata",
	    	            "Granada",
	    	            "Guadalupe",
	    	            "Guarne",
	    	            "Guatap\u00e9",
	    	            "Heliconia",
	    	            "Hispania",
	    	            "Itag\u00fc\u00ed",
	    	            "Ituango",
	    	            "Jard\u00edn",
	    	            "Jeric\u00f3",
	    	            "La Ceja",
	    	            "La Estrella",
	    	            "La Pintada",
	    	            "La Uni\u00f3n",
	    	            "Liborina",
	    	            "Maceo",
	    	            "Marinilla",
	    	            "Medell\u00edn",
	    	            "Montebello",
	    	            "Murind\u00f3",
	    	            "Mutat\u00e1",
	    	            "Nari\u00f1o",
	    	            "Nech\u00ed",
	    	            "Necocl\u00ed",
	    	            "Olaya",
	    	            "Peque",
	    	            "Pueblorrico",
	    	            "Puerto Berr\u00edo",
	    	            "Puerto Nare",
	    	            "Puerto Triunfo",
	    	            "Remedios",
	    	            "Rionegro",
	    	            "Sabanalarga",
	    	            "Sabaneta",
	    	            "Salgar",
	    	            "San Andr\u00e9s de Cuerquia",
	    	            "San Carlos",
	    	            "San Francisco",
	    	            "San Jer\u00f3nimo",
	    	            "San Jos\u00e9 de la Monta\u00f1a",
	    	            "San Juan de Urab\u00e1",
	    	            "San Luis",
	    	            "San Pedro de Urab\u00e1",
	    	            "San Pedro de los Milagros",
	    	            "San Rafael",
	    	            "San Roque",
	    	            "San Vicente",
	    	            "Santa B\u00e1rbara",
	    	            "Santa Fe de Antioquia",
	    	            "Santa Rosa de Osos",
	    	            "Santo Domingo",
	    	            "Segovia",
	    	            "Sons\u00f3n",
	    	            "Sopetr\u00e1n",
	    	            "T\u00e1mesis",
	    	            "Taraz\u00e1",
	    	            "Tarso",
	    	            "Titirib\u00ed",
	    	            "Toledo",
	    	            "Turbo",
	    	            "Uramita",
	    	            "Urrao",
	    	            "Valdivia",
	    	            "Valpara\u00edso",
	    	            "Vegach\u00ed",
	    	            "Venecia",
	    	            "Vig\u00eda del Fuerte",
	    	            "Yal\u00ed",
	    	            "Yarumal",
	    	            "Yolomb\u00f3",
	    	            "Yond\u00f3",
	    	            "Zaragoza"}));
	    	 
	    	 depar.add(new Departamento(2, "Arauca", new String[]{ "Arauca",
	    	            "Arauquita",
	    	            "Cravo Norte",
	    	            "Fortul",
	    	            "Puerto Rond\u00f3n",
	    	            "Saravena",
	    	            "Tame"}));
	    	 depar.add(new Departamento(3, "Atl\\u00e1ntico", new String[]{ "Baranoa",
	    	            "Barranquilla",
	    	            "Campo de la Cruz",
	    	            "Candelaria",
	    	            "Galapa",
	    	            "Juan de Acosta",
	    	            "Luruaco",
	    	            "Malambo",
	    	            "Manat\u00ed",
	    	            "Palmar de Varela",
	    	            "Pioj\u00f3",
	    	            "Polonuevo",
	    	            "Ponedera",
	    	            "Puerto Colombia",
	    	            "Repel\u00f3n",
	    	            "Sabanagrande",
	    	            "Sabanalarga",
	    	            "Santa Luc\u00eda",
	    	            "Santo Tom\u00e1s",
	    	            "Soledad",
	    	            "Su\u00e1n",
	    	            "Tubar\u00e1",
	    	            "Usiacur\u00ed"}));
	    	 depar.add(new Departamento(4, "Bol\\u00edvar", new String[]{ "Ach\u00ed",
	    	            "Altos del Rosario",
	    	            "Arenal",
	    	            "Arjona",
	    	            "Arroyohondo",
	    	            "Barranco de Loba",
	    	            "Brazuelo de Papayal",
	    	            "Calamar",
	    	            "Cantagallo",
	    	            "Cartagena de Indias",
	    	            "Cicuco",
	    	            "Clemencia",
	    	            "C\u00f3rdoba",
	    	            "El Carmen de Bol\u00edvar",
	    	            "El Guamo",
	    	            "El Pe\u00f1\u00f3n",
	    	            "Hatillo de Loba",
	    	            "Magangu\u00e9",
	    	            "Mahates",
	    	            "Margarita",
	    	            "Mar\u00eda la Baja",
	    	            "Momp\u00f3s",
	    	            "Montecristo",
	    	            "Morales",
	    	            "Noros\u00ed",
	    	            "Pinillos",
	    	            "Regidor",
	    	            "R\u00edo Viejo",
	    	            "San Crist\u00f3bal",
	    	            "San Estanislao",
	    	            "San Fernando",
	    	            "San Jacinto del Cauca",
	    	            "San Jacinto",
	    	            "San Juan Nepomuceno",
	    	            "San Mart\u00edn de Loba",
	    	            "San Pablo",
	    	            "Santa Catalina",
	    	            "Santa Rosa",
	    	            "Santa Rosa del Sur",
	    	            "Simit\u00ed",
	    	            "Soplaviento",
	    	            "Talaigua Nuevo",
	    	            "Tiquisio",
	    	            "Turbaco",
	    	            "Turban\u00e1",
	    	            "Villanueva",
	    	            "Zambrano"}));
		    	
	   	  return depar;
	     }
	
}
