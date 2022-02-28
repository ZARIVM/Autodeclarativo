import {Component, OnInit} from '@angular/core';
import {Tramite} from '@shared/interfaces/tramites/tramite';
import {LoadingService} from '@shared/services/loading/loading.service';
import {TramitesService} from '@shared/services/tramites/tramites.service';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {HandleErrorService} from '@shared/services/handle-error/handle-error.service';
import {StorageService} from '@shared/services/storage/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'igac-tramites',
  templateUrl: './tramites.component.html',
  styleUrls: ['./tramites.component.scss']
})
export class TramitesComponent implements OnInit {

  info: any;
  tramites: Tramite[];
  loa: string;

  constructor(
    private loadingService: LoadingService,
    private tramitesService: TramitesService,
    private storageService: StorageService,
    private handleErrorService: HandleErrorService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loa = this.storageService.getLOA();

    if (this.loa === 'loa:1') {
      this.router.navigateByUrl('@inicio/inicio.module');
    } else {
      this.initValues();
      this.initParameters();
    }
  }

  initValues(): void {
    this.info = {
      title: 'Consultar Trámites',
      description: 'A continuación podrá consultar los trámites que tiene asociados.'
    };
    this.tramites = [];
  }

  initParameters(): void {
    const status = ['1', '2', '3'].toString();
    const document = this.storageService.getNumDoc();
    const typeDoc = this.storageService.getTypeDoc();
    this.loadingService.loadingOn();
    this.tramitesService.getByStatusAndDocument(status, document,typeDoc).subscribe(tramites => {
      this.loadingService.loadingOff();
      this.tramites = tramites ? tramites : [];
      console.log(this.tramites);
    }, error => {
      this.loadingService.loadingOff();
      this.handleErrorService.handleError(error);
    });
  }

  get existTramites(): boolean {
    return isNotNullOrUndefined(this.tramites) && this.tramites.length > 0;
  }

  getTramite(tramite: string): string {
    if(tramite){
      return tramite.split('_').join(' ');
    }
  }
}
