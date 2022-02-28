import { LoadingService } from '@shared/services/loading/loading.service';
import { AutodeclarativoService } from './../services/autodeclarativo.service';
import { Alerta } from './../../../shared/interfaces/alertas/alerta';
import { AlertasService } from './../../../shared/services/alertas/alertas.service';
import { filter } from 'rxjs/operators';
import { Input, OnInit } from '@angular/core';
import { Component, Inject, Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'igac-modal-editinfoyeco',
  templateUrl: './modal-editinfoyeco.component.html',
  styleUrls: ['./modal-editinfoyeco.component.scss'],
})
export class ModalEditinfoyecoComponent implements OnInit {
  mensaje = '';
  seeInfo: any;
  nuevaDir: string = '';
  departamentos: [] = [];
  tomaDeTiempo: any;
  hoy: any;
  listaDestinoEco: any[] = [];
  infoyEcoForm: FormGroup;
  mensajeError: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private autodeService: AutodeclarativoService,
    public dialogRef: MatDialogRef<ModalEditinfoyecoComponent>,
    private loadingService: LoadingService,
    private alertasService: AlertasService,
  ) {}

  ngOnInit(): void {
    this.getInfo();

  }

initForm(){
  this.infoyEcoForm = new FormGroup({
    destinoEconomico: new FormControl(this.seeInfo.destinoEconomico, [Validators.required]),
    valor: new FormControl(this.seeInfo.valor, []),
    arriendoVenta: new FormControl(this.seeInfo.arriendoVenta, []),
    valorMinimo: new FormControl(this.seeInfo.valorMinimo, []),
    fechaOferta: new FormControl(this.seeInfo.fechaOferta, [Validators.required]),
  });
}

  getInfo() {
    this.seeInfo = this.data;
    this.agregarFecha();
    this.getDestinoEconomico();
    this.initForm();
  }

  agregarFecha() {
    let { dia, mes, anio } = this.diaActual();
    this.seeInfo.fechaOferta = `${dia()}/${mes()}/${anio}`;
  }

  agregarDirec() {
    this.mensaje = '';
    if (!this.existe(this.nuevaDir)) {
      this.seeInfo.direcciones = [...this.seeInfo.direcciones, this.nuevaDir];
    }
  }

  existe(valor) {
    return this.seeInfo.direcciones.filter((x) => x === valor).length !== 0
      ? true
      : false;
  }

  diaActual() {
    this.tomaDeTiempo = Date.now();
    this.hoy = new Date(this.tomaDeTiempo);
    return {
      dia: () => {
        return this.hoy.getDate() < 10
          ? `0${this.hoy.getDate()}`
          : this.hoy.getDate();
      },
      mes: () => {
        return this.hoy.getMonth() + 1 < 10
          ? `0${this.hoy.getMonth() + 1}`
          : this.hoy.getMonth() + 1;
      },
      anio: this.hoy.getFullYear(),
    };
  }
  eliminarDirec(direc) {
    this.seeInfo.direcciones = this.seeInfo.direcciones.filter(
      (value) => value !== direc
    );
  }
  guardar() {
    if (this.validaciones()) {
      this.loadingService.loadingOn();
     
      const infoYEco = {
         folioMatricula: this.seeInfo.folioMatricula,
	 numPredial: this.seeInfo.numPredial,
	 codigoNupre: this.seeInfo.codigoNupre,
	 departamento: this.seeInfo.departamento,
	 municipio: this.seeInfo.municipio,
	 destinoEconomico: this.infoyEcoForm.get('destinoEconomico').value,
	 arriendoVenta: this.infoyEcoForm.get('arriendoVenta').value,
	 valor: this.infoyEcoForm.get('valor').value,
	 valorMinimo: this.infoyEcoForm.get('valorMinimo').value,
	 fechaOferta: this.seeInfo.fechaOferta,
	  numDocumento: this.seeInfo.numDocumento,
	 direcciones: this.seeInfo.direcciones,
	 vereda: this.seeInfo.vereda,
      }

      this.autodeService.editarInfoYEconomica(infoYEco).subscribe(
        () => {
          this.dialogRef.close();
          this.loadingService.loadingOff();
          this.showAlert("Se actualizo la información correctamente")
        },
        (e) => {
          this.loadingService.loadingOff();
          this.mensajeError = "Error actualizando información"
        }
      );
    }
  }

  validaciones() {
    let esta = true;
    if (this.seeInfo.direcciones.length === 0) {
      this.mensaje = 'Por favor, Ingrese una Dirección';
      esta = false;
    }

    if (
      this.infoyEcoForm.invalid 
    ) {
      esta = false;
       this.mensajeError = 'Por favor, Ingrese todos los datos';
      Object.values(this.infoyEcoForm.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((c) => c.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
  }

  if(this.infoyEcoForm.get('arriendoVenta').value !== '' && (this.infoyEcoForm.get('valor').value === null || this.infoyEcoForm.get('valorMinimo').value === null)){
    this.mensajeError = 'Por favor, Ingrese todos los datos';
    esta = false;
  }

    return esta;
  }


  getDestinoEconomico(){
    
    this.autodeService.getDestinoEconomico().subscribe((resp)=>{
         this.listaDestinoEco = resp;
    },error=>{

    })
  }


  showAlert(message): void {

    const alert: Alerta = {
      textHtml: message,
      btnText: 'ACEPTAR',
      btnClose: 'CERRAR',
      text: '',
      title: 'SOLICITUD EXITOSA',
      showCancelButton: true,
      showConfirmButton: true
    };
    this.alertasService.mensajeSuccess(alert).subscribe((response) => {
      if (response.isConfirmed) {
      }
    });
  }

  // validaciones() {
  //   let estado = true;
  //   if (this.seeInfo.Direccion.length === 0) {
  //     const alert: Alerta = this.autodeService.getAlertInfo(
  //       'Debe ingresar una dirección por lo menos',
  //       false,
  //       true
  //     );
  //     estado = false;
  //     this.showAlert(alert, 2);
  //   }
  //   return estado;
  // }

  // showAlert(alerta: Alerta, tipoAlerta: number): void {
  //   this.alertasService.mensajeWarn(alerta);
  // }
}
