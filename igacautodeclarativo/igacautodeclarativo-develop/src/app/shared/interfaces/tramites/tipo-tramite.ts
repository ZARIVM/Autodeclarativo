export interface TipoTramite {
  id:          number;
  detalle:     string;
  descripcion: string;
  parametro:   Parametro;
  padre:       Padre;
  activo:      boolean;
}

export interface Parametro {
  id:          number;
  nombre:      string;
  descripcion: string;
}

export interface Padre {
  id:          number;
  detalle:     string;
  descripcion: string;
  parametro:   Parametro;
  padre?:       Padre;
  activo:      boolean;
}