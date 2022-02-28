export class Predio {
    constructor(
        public idPredio: number,
        public folio: string,
        public numeroPredial: string,
        public codigoNupre: string,
        public departamento: string,
        public municipio: string,
        public image: string,
        public direcciones: string[],
        public numDocumento: string
    ){}

}

