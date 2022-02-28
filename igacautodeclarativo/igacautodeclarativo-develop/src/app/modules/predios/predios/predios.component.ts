import {Component, OnInit} from '@angular/core';
// import {PrediosService} from '@shared/services/predios/predios.service';
import {PredioRequest} from '@shared/interfaces/predios/predio-request';
import {Predio} from '@shared/interfaces/predios/predio';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingService} from '@shared/services/loading/loading.service';
import {StorageService} from '@shared/services/storage/storage.service';
import { TramitesService } from '@shared/services/tramites/tramites.service';

@Component({
  selector: 'igac-predios',
  templateUrl: './predios.component.html',
  styleUrls: ['./predios.component.scss']
})
export class PrediosComponent implements OnInit {

  info: any;
  predios: Predio[];
  loa: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    // private prediosService: PrediosService,
    private storageService: StorageService,
    private tramitesService: TramitesService
  ) {
  }

  ngOnInit(): void {
    this.loa = this.storageService.getLOA();

    if (this.loa === 'loa:1') {
      this.router.navigateByUrl('@inicio/inicio.module');
      
    } else {
      this.initValues();
      this.initPredios();
    }
  }

  initValues(): void {
    this.info = {
      title: 'Consultar Predios',
      description: 'A continuación podrá consultar los predios que tiene asociados.'
    };
    this.predios = [];
  }

  initPredios(): void {
    this.loadingService.loadingOn();
    const request: PredioRequest = {
      idRequerimiento: '123',
      nombre: 'prueba',
      numDoc: this.storageService.getNumDoc(),
      tipoDoc: this.storageService.getTypeDoc(),
      pagina: '1',
      usuario: this.storageService.getUsername()
    };
    this.tramitesService.consultarPredios(request).subscribe(response => {
      this.predios = response && response.predios ? response.predios : [];
      this.loadingService.loadingOff();
    }, () =>
      this.loadingService.loadingOff());
  }

  onViewDetail(predio: Predio): void {
    this.router.navigate([predio.numPredial, 'detalle'], {relativeTo: this.activatedRoute}).then();
  }

  onNewProcedure(predio: Predio): void {
    this.router.navigate([predio.numPredial, 'tramite'], {relativeTo: this.activatedRoute}).then();
  }

  get existPredios(): boolean {
    return isNotNullOrUndefined(this.predios) && this.predios.length > 0;
  }
}
