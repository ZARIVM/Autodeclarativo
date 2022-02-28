import {Component, OnInit} from '@angular/core';
import {Predio} from '@shared/interfaces/predios/predio';
// import {PrediosService} from '@shared/services/predios/predios.service';
import {PredioRequest} from '@shared/interfaces/predios/predio-request';
import {ActivatedRoute} from '@angular/router';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {LoadingService} from '@shared/services/loading/loading.service';
import { StorageService } from '@shared/services/storage/storage.service';
import { TramitesService } from '@shared/services/tramites/tramites.service';
import {Router} from '@angular/router';

@Component({
  selector: 'igac-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  info: any;
  predial: string;
  predio: Predio;
  loa: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    // private prediosService: PrediosService,
    private storageService: StorageService,
    private tramitesService: TramitesService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loa = this.storageService.getLOA();

    if (this.loa === 'loa:1') {
      this.router.navigateByUrl('@inicio/inicio.module');
    } else {
      this.initValues();
      this.initParams();
    }
  }

  initValues(): void {
    this.info = {
      title: 'Detalle del Predio',
      description: 'A continuación podrá consultar el detalle del predio seleccionado.'
    };
  }

  initParams(): void {
    this.activatedRoute.params.subscribe( params => {
      this.predial = (params.id).toString();
      this.initPredio();
    });
  }

  initPredio(): void {
    this.loadingService.loadingOn();
    const request: PredioRequest = {
      idRequerimiento: '123',
      nombre: 'prueba',
      numDoc: this.storageService.getNumDoc(),
      tipoDoc: this.storageService.getTypeDoc(),
      pagina: '1',
      usuario: 'matorres'
    };

    this.tramitesService.consultarPredios(request).subscribe(response => {
      const predios = response && response.predios ? response.predios : [];
      this.predio = predios.find(obj => obj.numPredial === this.predial);
      this.loadingService.loadingOff();
    }, () =>
      this.loadingService.loadingOff());

    /*this.prediosService.getPredios(request).subscribe(response => {
      const predios = response && response.predios ? response.predios : [];
      this.predio = predios.find(obj => obj.numPredial === this.predial);
      this.loadingService.loadingOff();
    }, () => this.loadingService.loadingOff());*/
  }

  get existPredio(): boolean {
    return isNotNullOrUndefined(this.predio);
  }

  get existPropietarios(): boolean {
    return isNotNullOrUndefined(this.predio.propietarios) && this.predio.propietarios.length > 0;
  }

  get existConstrucciones(): boolean {
    return isNotNullOrUndefined(this.predio.construcciones) && this.predio.construcciones.length > 0;
  }

  get existTerrenos(): boolean {
    return isNotNullOrUndefined(this.predio.terrenos) && this.predio.terrenos.length > 0;
  }
}
