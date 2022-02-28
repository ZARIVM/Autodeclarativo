import { AutodeclarativoService } from './../services/autodeclarativo.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StorageService } from '@shared/services/storage/storage.service';
import { Router } from '@angular/router';
import { AlertasService } from '@app/shared/services/alertas/alertas.service';
import { Alerta } from '@app/shared/interfaces/alertas/alerta';
import { AutoDeclarativoModel } from '../models/autodeclarativoModel';
import { LoadingService } from '@app/shared/services/loading/loading.service';

@Component({
  selector: 'igac-declyaut',
  templateUrl: './declyaut.component.html',
  styleUrls: ['./declyaut.component.scss'],
})
export class DeclyautComponent implements OnInit {
  loa: string;
  info: any;
  @Output() esListado: EventEmitter<boolean>;
  @Output() page: EventEmitter<any>;
  @Input() objAutodeclarativo: any;

  opAuth = null;
  opAuthComElec = null;
  opAuthNotElec = null;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private alertasService: AlertasService,
    private autodeService: AutodeclarativoService,
    private loadingService: LoadingService
  ) {
    this.esListado = new EventEmitter();
    this.page = new EventEmitter();
  }

  onIniciarTramiteNuevo(): void {
    this.esListado.emit(false);
  }

  nextPage(): void {
    let object;

    if (
      this.objAutodeclarativo !== null &&
      this.objAutodeclarativo.page !== 1
    ) {
      object = this.objAutodeclarativo;
      object.opAuth = this.opAuth === 'true' ? true : false;
      object.opAuthComElec = this.opAuthComElec === 'true' ? true : false;
      object.opAuthNotElec = this.opAuthNotElec === 'true' ? true : false;
      object.page = 1;
    } else {
        object = new AutoDeclarativoModel(
        this.opAuth === null ? null: this.opAuth === 'true' ? true :  false,
        this.opAuthComElec === null ? null: this.opAuthComElec === 'true' ? true : false,
        this.opAuthNotElec === null ? null: this.opAuthNotElec === 'true' ? true : false,
        '',
        '',
        '',
        '-1',
        'Seleccione...',
        '',
        '',
        '',
        '',
        '',
        1,
        this.objAutodeclarativo !== null  ? this.objAutodeclarativo.lastPage : 1,
        null, [], 0
      );
      // object = new AutoDeclarativoModel(
      //   this.opAuth === 'true' ? true : false,
      //   this.opAuthComElec === 'true' ? true : false,
      //   this.opAuthNotElec === 'true' ? true : false,
      //   '2',
      //   '2',
      //   '2',
      //   '1',
      //   'Leticia',
      //   'Cr 13 #55- 110',
      //   '2222',
      //   '2222',
      //   'juanpmont07@hotmail.com',
      //   'juanpmont07@hotmail.com',
      //   1,
      //   2,
      //   null,
      //   [],
      //   0
      // );
    }

    this.page.emit({ page: 2, body: object });
  }
  ngOnInit(): void {
    this.initValues();
    this.loa = this.storageService.getLOA();

    if (this.loa === 'loa:1') {
      this.router.navigateByUrl('@inicio/inicio.module');
    }

    if (this.objAutodeclarativo !== null) {
      this.opAuth = this.objAutodeclarativo.opAuth.toString();
      this.opAuthComElec = this.objAutodeclarativo.opAuthComElec.toString();
      this.opAuthNotElec = this.objAutodeclarativo.opAuthNotElec.toString();
    }
  }

  initValues(): void {
    this.info = {
      title: 'Declaraciones y autorizaciones',
      description:
        'Uno de los métodos para realizar el reconocimiento predial que puede utilizar el gestor para la actualización catastral con enfoque multipropósito, corresponde a los métodos declarativo, los cuales derivan de la participación de la comunidad en el suministro de la información que sirva como insumo para el desarrollo de los procesos catastrales. “Decreto 1148 de 2020”.',
    };
  }

  showAlertNoAuth(): void {
    const alert: Alerta = this.autodeService.getAlert(
      'Señor usuario, no puede continuar con el proceso'
    );
    this.showAlert(alert, 1);
  }

  showAlertReConfirm(): void {
    const alert: Alerta = this.autodeService.getAlert(
      '¿Está seguro de finalizar proceso?'
    );
    this.showAlert(alert, 2);
  }

  showAlert(alerta: Alerta, tipoAlerta: number): void {
    if (tipoAlerta === 1) {
      this.alertasService.mensajeWarn(alerta).subscribe((response) => {
        if (response.isConfirmed) {
          this.showAlertReConfirm();
        }
      });
    }
    if (tipoAlerta === 2) {
      this.alertasService.mensajeWarn(alerta).subscribe((response) => {
        if (response.isConfirmed) {
          this.router.navigateByUrl('inicio');
        } else if (response.isDismissed) {
          this.showAlertNoAuth();
        }
      });
    }
  }

  backMenu(): void {
    this.router.navigateByUrl('inicio');
  }

  get validFields(): boolean {
    return (
      this.opAuth === '' ||
      this.opAuthComElec === '' ||
      this.opAuthNotElec === ''
    );
  }
}
