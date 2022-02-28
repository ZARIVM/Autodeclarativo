import { Injectable } from '@angular/core';
import { Predio } from '@app/shared/interfaces/predioConsulta';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultasService {
  resultDirecciones: string[] = [];
  resultPredios: Predio[] = [];
  tPredio: any;
  predios$: Observable<any> | undefined;
  direcciones$!: Observable<any>;

  constructor() {}
}
