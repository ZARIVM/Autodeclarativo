import { Departamento } from './../../../shared/interfaces/general/departamento';
import { AutodeclarativoService } from './../services/autodeclarativo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { AlertasService } from '@app/shared/services/alertas/alertas.service';
import { Alerta } from '@app/shared/interfaces/alertas/alerta';

@Component({
  selector: 'igac-modal-editar-info-contac',
  templateUrl: './modal-editar-info-contac.component.html',
  styleUrls: ['./modal-editar-info-contac.component.scss'],
})
export class ModalEditarInfoContacComponent implements OnInit {
  infoContacPre: FormGroup;
  listGroupEtni: any[] = [];
  listSexo: any[] = [];
  listDepartamentos: Departamento[] = [];
  municipios: string[] = [];
  tipoLEgi: any[] = [];
  tipoDocu: string;
  listTipoDocumentos: any[] = [];
  mensajeError: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceAutoDecla: AutodeclarativoService,
    public dialogRef: MatDialogRef<ModalEditarInfoContacComponent>,
    private alertasService: AlertasService,
  ) {}

  ngOnInit(): void {
    this.inicializarValores();
    this.getListaGrupoEtnico();
    this.getListSexo();
    this.getListaDepartamentos();
    this.getTipoLegi();
    this.getTipoDocumentos();
  }
  inicializarValores() {
    if (this.data.accion == 'editar') {
     
      this.infoContacPre = new FormGroup({
        proPoseeOcu: new FormControl(this.data.contacto.proPoseeOcu, [Validators.required]),
        grupoEtnico: new FormControl(this.data.contacto.grupoEtnico, [Validators.required]),
        sexo: new FormControl(this.data.contacto.sexo, [Validators.required]),
        tipoDoc: new FormControl(this.data.contacto.tipoDoc, [Validators.required]),
        numDoc: new FormControl(this.data.contacto.numDoc, [Validators.required]),
        nomRazonSocial: new FormControl(this.data.contacto.nomRazonSocial, [Validators.required]),
        departamento: new FormControl(this.data.contacto.departamento, [Validators.required]),
        municipio: new FormControl(this.data.contacto.municipio, [Validators.required]),
        direccion: new FormControl(this.data.contacto.direccion, [Validators.required]),
        vereda: new FormControl(this.data.contacto.vereda, [Validators.required]),
        telefono: new FormControl(this.data.contacto.telefono, [Validators.required]),
        celular: new FormControl(this.data.contacto.celular, [
          Validators.required,
        ]),
        correo: new FormControl(this.data.contacto.correo, [Validators.required]),
      });
    } else {
      this.infoContacPre = new FormGroup({
        proPoseeOcu: new FormControl('', [Validators.required]),
        grupoEtnico: new FormControl('', [Validators.required]),
        sexo: new FormControl('', [Validators.required]),
        tipoDoc: new FormControl('', [Validators.required]),
        numDoc: new FormControl('', [Validators.required]),
        nomRazonSocial: new FormControl('', [Validators.required]),
        departamento: new FormControl('', [Validators.required]),
        municipio: new FormControl('', [Validators.required]),
        direccion: new FormControl('', [Validators.required]),
        vereda: new FormControl('', [Validators.required]),
        telefono: new FormControl('', [Validators.required]),
        celular: new FormControl('', [Validators.required]),
        correo: new FormControl('', [Validators.required]),
      });
    }
  }

  getListaGrupoEtnico() {
    this.serviceAutoDecla.getDataGrupoEt().subscribe((result) => {
      this.listGroupEtni = result;
    });
  }
  getListSexo() {
    this.serviceAutoDecla.getDataSex().subscribe((result) => {
      this.listSexo = result;
    });
  }
  getListaDepartamentos() {
    this.serviceAutoDecla.getDepartments().subscribe((result) => {
      this.listDepartamentos = result;
      if (this.data.accion === 'editar') {
        result.filter((depa) => {
          if (depa.departamento === this.data.contacto.departamento) {
            this.municipios = depa.municipios;
          }
        });
      } else {
        this.municipios.unshift('Seleccione...');
      }
    });
  }

  getTipoDocumentos(){
    this.serviceAutoDecla.getTipoDocumentos().subscribe((result) => {
      this.listTipoDocumentos = result;
    });
  }

  getTipoLegi() {
    this.serviceAutoDecla.getDataSol().subscribe((result) => {
      this.tipoLEgi = result;
      this.tipoLEgi = this.tipoLEgi.filter((result)=> result.text !== "Propietario");
    });
  }

  onSelect(evento) {
    this.listDepartamentos.filter((depa) => {
      if (depa.departamento === evento.target.value) {
        this.municipios = depa.municipios;
        this.municipios.unshift('Seleccione...');
      }
    });
  }

  guardar() {
    if (this.infoContacPre.invalid) {
      Object.values(this.infoContacPre.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((c) => c.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    } else {
      const datos = {
        idTipo: this.infoContacPre.get('proPoseeOcu').value,
        idGrupoEtnico: this.infoContacPre.get('grupoEtnico').value,
        idSexo: this.infoContacPre.get('sexo').value,
        tipoDocumento: this.infoContacPre.get('tipoDoc').value,
        numDocumento: this.infoContacPre.get('numDoc').value,
        nombreRazon: this.infoContacPre.get('nomRazonSocial').value,
        idDepartamento: this.infoContacPre.get('departamento').value,
        idMunicipio: this.infoContacPre.get('municipio').value,
        idDireccion: this.infoContacPre.get('direccion').value,
        vereda: this.infoContacPre.get('vereda').value,
        telefono: this.infoContacPre.get('telefono').value,
        celular: this.infoContacPre.get('celular').value,
        email: this.infoContacPre.get('correo').value,
        idPredio: this.data.idPredio
      };
      if (this.data.accion == 'editar') {
        this.serviceAutoDecla.editarContacto(datos).subscribe(
          () => {
            this.showAlert("Se actualizo la información correctamente")
            this.dialogRef.close();
           
          },
          (e) => {
            this.mensajeError = "Error actualizando información"
          }
        );
      } else {
        this.serviceAutoDecla.crearContacto(datos).subscribe(
          () => {
            
            this.showAlert("Se guardo la información correctamente")
            this.dialogRef.close();
          },
          (e) => {
            this.mensajeError = "Error guardando información"
          }
        );
      }
    }
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
