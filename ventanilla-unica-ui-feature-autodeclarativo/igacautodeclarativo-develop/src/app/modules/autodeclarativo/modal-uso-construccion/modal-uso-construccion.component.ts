import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alerta } from '@app/shared/interfaces/alertas/alerta';
import { AlertasService } from '@app/shared/services/alertas/alertas.service';
import { LoadingService } from '@app/shared/services/loading/loading.service';
import { ModalEditinfoyecoComponent } from '../modal-editinfoyeco/modal-editinfoyeco.component';
import { AutodeclarativoService } from '../services/autodeclarativo.service';

@Component({
  selector: 'igac-modal-uso-construccion',
  templateUrl: './modal-uso-construccion.component.html',
  styleUrls: ['./modal-uso-construccion.component.scss'],
})
export class ModalUsoConstruccionComponent implements OnInit {
  mensaje = '';
  enabletotalArea = true;
  errorForm = { habitacion: false, local: false, banios: false };
  indexArchivos = 0;
  nombreArch = '';
  indexPrinci = 0;
  modules = [];
  mensajeError = "";

  usoConstruccionForm: FormGroup;
  listUsosConstruccion: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private autodeService: AutodeclarativoService,
    public dialogRef: MatDialogRef<ModalEditinfoyecoComponent>,
    private loadingService: LoadingService,
    private formBuild: FormBuilder,
    private alertasService: AlertasService,
  ) {}

  ngOnInit(): void {
    this.initValues();
  }

  initValues(): void {
    if (this.data.accion == 'editar') {
      this.usoConstruccionForm = this.formBuild.group({
        usoConstruccion: [
          this.data.infoCons.usoConstruccion,
          [Validators.required],
        ],
        cantHabitaciones: [this.data.infoCons.cantHabitaciones, []],
        cantBanios: [this.data.infoCons.cantBanios, []],
        cantLocales: [this.data.infoCons.cantLocales, []],
        areaConst: [this.data.infoCons.areaConst, [Validators.required]],
        anioConst: [this.data.infoCons.anioConst, [Validators.required]],
        totalAreaConst: [this.data.infoCons.totalAreaConst, []]
      });
    } else {
      this.usoConstruccionForm = this.formBuild.group({
        usoConstruccion: ['',[Validators.required], ],
        cantHabitaciones: ['', []],
        cantBanios: ['', []],
        cantLocales: ['', []],
        areaConst: ['', [Validators.required]],
        anioConst: ['', [Validators.required]],
        totalAreaConst: ['', []],
      });
    }


    this.getUsosConstruccion();
  }

  getUsosConstruccion() {
    this.autodeService.getUsosConstruccion().subscribe(
      (result) => {
        this.listUsosConstruccion = result;
      },
      () => {}
    );
  }

  get getUsoConst() {
    return this.usoConstruccionForm.get('usoConstruccion').value;
  }

  validarObligatoriedad(campo) {
    if (campo === 'cantHabitaciones') {
      return this.getUsoConst === 'Residencial';
    }

    if (campo === 'cantBanios') {
      return this.getUsoConst !== 'Anexos';
    }

    if (campo === 'cantLocales') {
      return this.getUsoConst === 'Comercial';
    }

    if (
      campo === 'areaConst' ||
      campo === 'anioConst' ||
      campo === 'totalAreaConst' ||
      campo === 'fotos' ||
      campo === 'usoConstruccion'
    ) {
      return true;
    }

    return false;
  }

  guardar() {
    if (this.validarForm()) {
      console.log(this.data.infoCons)
      const modeloUso = {
        usoConstruccion: this.usoConstruccionForm.get('usoConstruccion').value,
        cantHabitaciones:this.usoConstruccionForm.get('cantHabitaciones').value,
        cantBanios: this.usoConstruccionForm.get('cantBanios').value,
        cantLocales: this.usoConstruccionForm.get('cantLocales').value,
        areaConst: this.usoConstruccionForm.get('areaConst').value,
        anioConst: this.usoConstruccionForm.get('anioConst').value,
        totalAreaConst: this.usoConstruccionForm.get('totalAreaConst').value,
        fotos: this.metodoTemporalCargarArchivos(),
        estado: this.data.accion === 'editar' ? this.data.infoCons.estado: false,
        idPredio: this.data.accion === 'editar' ? this.data.infoCons.idPredio: this.data.idPredio
       }
       console.log(modeloUso)
      if (this.data.accion === 'editar') {
        this.loadingService.loadingOn();
        this.autodeService
          .actualizarUsoConstruc(modeloUso)
          .subscribe(
            () => {
              this.showAlert("Se actualizo la información correctamente")
              this.loadingService.loadingOff();
              this.dialogRef.close();
            },
            () => {
              this.mensajeError = "Error actualizando información"
              this.loadingService.loadingOff();
              this.dialogRef.close();
            }
          );
      } else {
        this.loadingService.loadingOn();
        this.autodeService
          .guardarUsoUsoConstruc(modeloUso)
          .subscribe(
            () => {
              this.showAlert("Se guardo la información correctamente")
              this.loadingService.loadingOff();
              this.dialogRef.close(true);
            },
            () => {
              this.mensajeError = "Error guardando información"
              this.loadingService.loadingOff();
              this.dialogRef.close(true);
            }
          );
      }
    }
  }

  metodoTemporalCargarArchivos(){
    let modulesTemp = [];
    // { index: this.indexPrinci, nombre: value, archivos: [], estado: false }
    this.modules.forEach(mod => {
          let files = [];
           mod.archivos.forEach(file => {
            files.push(file.name);
           });
           modulesTemp.push({index: mod.index, nombre: mod.nombre, archivo: files})
          
        });
        return modulesTemp;
  }

  noEsVacio(campo: string): boolean {
    return (
      this.usoConstruccionForm.get(campo).value !== null &&
      this.usoConstruccionForm.get(campo).value !== ''
    );
  }

  validarForm() {
    let esValido = true;
    this.errorForm = { habitacion: false, local: false, banios: false };
    if (this.usoConstruccionForm.invalid) {
      esValido = false;
      Object.values(this.usoConstruccionForm.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((c) => c.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
    if (
      this.usoConstruccionForm.get('usoConstruccion').value === 'Residencial' &&
      !this.noEsVacio('cantHabitaciones')
    ) {
      this.errorForm.habitacion = true;
      esValido = false;
    }
    if (
      this.usoConstruccionForm.get('usoConstruccion').value === 'Comercial' &&
      !this.noEsVacio('cantLocales')
    ) {
      this.errorForm.local = true;
      esValido = false;
    }
    if (
      this.usoConstruccionForm.get('usoConstruccion').value !== 'Anexos' &&
      !this.noEsVacio('cantBanios')
    ) {
      this.errorForm.banios = true;
      esValido = false;
    }


    return esValido;
  }

  cargaArchivo(event, index) {
    if (event.target.files && event.target.files.length) {
      let file = event.target.files[0];
      const ext = file.name.split('.').pop();

      if (this.validateExt(ext)) {
        if (this.validateSize(file.size)) {
          this.indexArchivos++;
          let obj = {
            file: event.target.files[0],
            name: event.target.files[0].name,
            index: this.indexArchivos,
          };
          this.modules.map((x) => {
            if (x.index === index) {
              x.archivos = [...x.archivos, obj];
            }
          });
        } else {
          // this.showAlert(
          //   this.autdeService.getAlertInfo('Tamaño no permitido', false, true)
          // );
        }
      } else {
        // this.showAlert(
        //   this.autdeService.getAlertInfo(
        //     'El archivo no tiene la extensión adecuada',
        //     false,
        //     true
        //   )
        // );
      }

      //this.reader.readAsDataURL(event.target.files[0]);
    }
  }
  validateExt(ext) {
    switch (ext) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'pdf':
        return true;
      default:
        return false;
    }
  }
  validateSize(size) {
    if (size <= 4000000) {
      return true;
    }
    return false;
  }

  agregar({ value }: HTMLInputElement) {
    if(value!==  null && value!= "" ){
      this.indexPrinci++;
      this.modules.push( { index: this.indexPrinci, nombre: value, archivos: [], estado: false })
    }

  }

  eliminar(index) {
    this.modules.map((x) => {
      if (x.index === index) {
        x.archivos = x.archivos.filter((ar) => ar.estado !== true);
      }
    });
  }

  eliminarModulo(index){
    this.modules = this.modules.filter((module)=> module.index !== index);
  }

  cambio(nombreArchivo, index, { target: { checked } }) {

    this.modules.map((x) => {
      if (x.index === index) {
        x.archivos.map((ar) => {
          if (ar.name === nombreArchivo) {
            ar.estado = checked;
          }
        });
      }
    });
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
}
