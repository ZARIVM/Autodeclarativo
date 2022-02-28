import {Construccion} from '@shared/interfaces/predios/construccion';
import {Propietario} from '@shared/interfaces/predios/propietario';
import {Terreno} from '@shared/interfaces/predios/terreno';

export interface Predio {
  areaConstruccion: number;
  areaTerreno: number;
  avaluo: number;
  codDestino: string;
  codDpto: string;
  codMpio: string;
  direccion: string;
  matricula: string;
  numPredial: string;
  numPredialAnterior: string;
  propietarios: Propietario[];
  construcciones: Construccion[];
  terrenos: Terreno[];
}
