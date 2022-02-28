import { Predio } from "@app/shared/interfaces/predioConsulta";

export class AutoDeclarativoModel{

    constructor(
       public opAuth: boolean,
       public opAuthComElec: boolean,
       public opAuthNotElec: boolean,
       public legiSoli: string,
       public groupEthnic: string,
       public sex: string,
       public department: string,
       public municip: string,
       public address: string,
       public vereda: string,
       public phone: string,
       public mobile: string,
       public email: string,
       public page: number,
       public lastPage: number,
       public predial: Predio,
       public listArchivos: any[],
       public indexArchivo: number
    ){}
}

