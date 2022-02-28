import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AutodeclarativoService } from './../services/autodeclarativo.service';
import { HttpClient } from '@angular/common/http';
import { Departamento } from './../../../shared/interfaces/general/departamento';
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { StorageService } from '@shared/services/storage/storage.service';
import { Router } from '@angular/router';
import { AutoDeclarativoModel } from '../models/autodeclarativoModel';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { AlertasService } from '@app/shared/services/alertas/alertas.service';
import { LoadingService } from '@app/shared/services/loading/loading.service';

@Component({
  selector: 'igac-autodeclarativoleg',
  templateUrl: './autodeclarativoleg.component.html',
  styleUrls: ['./autodeclarativoleg.component.scss'],
})
export class AutodeclarativolegComponent implements OnInit {
  loa: string;
  info: any;
  legSol: any;
  legGEt: any;
  legSex: any;
  fileName: any;
  fileToUpload: any;
  departments: Departamento[];
  municips: string[];
  selectionLeGSol: FormGroup;
  contactInformation: FormGroup;
  formSubmit = false;
  listArchivos: any[] = [];
  indexArchivos = 0;

  @Output() esListado: EventEmitter<boolean>;
  @Output() page: EventEmitter<any>;
  @Input() objAutodeclarativo: AutoDeclarativoModel;

  @ViewChild('myInput')
  myInputVariable: ElementRef;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private autdeService: AutodeclarativoService,
    private alertasService: AlertasService,
    private loadingService: LoadingService
  ) {
    this.esListado = new EventEmitter();
    this.page = new EventEmitter();
  }

  onIniciarTramiteNuevo(): void {
    this.esListado.emit(false);
  }

  initSex(): any {
    this.loadingService.loadingOn();
    return this.autdeService.getDataSex().subscribe(
      (value) => {
        this.legSex = value;
        this.legSex.unshift({
          text: 'Seleccione...',
          value: '',
        });
        this.loadingService.loadingOff();
      },
      () => {
        this.loadingService.loadingOff();
      }
    );
  }
  initGEt(): any {
    this.loadingService.loadingOn();
    return this.autdeService.getDataGrupoEt().subscribe(
      (value) => {
        this.legGEt = value;
        this.legGEt.unshift({
          text: 'Seleccione...',
          value: '',
        });
        this.loadingService.loadingOff();
      },
      () => {
        this.loadingService.loadingOff();
      }
    );
  }
  initLegSol(): any {
    this.loadingService.loadingOn();
    return this.autdeService.getDataSol().subscribe(
      (value) => {
        this.legSol = value;
        this.legSol.unshift({
          text: 'Seleccione...',
          value: '',
        });
        this.loadingService.loadingOff();
      },
      () => {
        this.loadingService.loadingOff();
      }
    );
  }

  onFileTouch(): void {}
  onFileChange(event): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      const ext = file.name.split('.').pop();

      if (this.validateExt(ext)) {
        if (this.validateSize(file.size)) {
          this.indexArchivos++;
          this.listArchivos.push({
            file: event.target.files[0],
            name: event.target.files[0].name,
            index: this.indexArchivos,
          });
        } else {
          this.showAlert(
            this.autdeService.getAlertInfo('Tamaño no permitido', false, true)
          );
        }
      } else {
        this.showAlert(
          this.autdeService.getAlertInfo(
            'El archivo no tiene la extensión adecuada',
            false,
            true
          )
        );
      }
    }
  }
  ngOnInit(): void {
    this.initValues();
    this.loa = this.storageService.getLOA();
    // this.legSol = this.initLegSol();
    if (this.loa === 'loa:1') {
      this.router.navigateByUrl('@inicio/inicio.module');
    }
  console.log("legi",this.objAutodeclarativo)
    if (this.objAutodeclarativo !== null) {
      if (
        this.objAutodeclarativo.department !== undefined &&
        this.objAutodeclarativo.department !== null
      ) {
        this.initFormData();
      } else {
        this.initFormEmpty();
      }
    }
  }

  initFormEmpty(): void {
    this.selectionLeGSol = new FormGroup({
      legiSoli: new FormControl('', [Validators.required]),
      grupoEtni: new FormControl('', [Validators.required]),
      sex: new FormControl('', [Validators.required]),
    });
    this.contactInformation = new FormGroup({
      departamento: new FormControl('', [Validators.required]),
      municipio: new FormControl('', [Validators.required]),
      direc: new FormControl('', [Validators.required]),
      vereda: new FormControl('', [Validators.required]),
      tel: new FormControl(''),
      cel: new FormControl(''),
      email: new FormControl(''),
    });
    this.initDepartments();
    this.initLegSol();
    this.initSex();
    this.initGEt();
  }

  initFormData(): void {
    this.selectionLeGSol = new FormGroup({
      legiSoli: new FormControl(this.objAutodeclarativo.legiSoli, [
        Validators.required,
      ]),
      grupoEtni: new FormControl(this.objAutodeclarativo.groupEthnic, [
        Validators.required,
      ]),
      sex: new FormControl(this.objAutodeclarativo.sex, [Validators.required]),
    });

    this.contactInformation = new FormGroup({
      departamento: new FormControl(this.objAutodeclarativo.department, [
        Validators.required,
      ]),
      municipio: new FormControl(this.objAutodeclarativo.municip, [
        Validators.required,
      ]),
      direc: new FormControl(this.objAutodeclarativo.address, [
        Validators.required,
      ]),
      vereda: new FormControl(this.objAutodeclarativo.vereda, [
        Validators.required,
      ]),
      tel: new FormControl(this.objAutodeclarativo.phone),
      cel: new FormControl(this.objAutodeclarativo.mobile),
    });

    this.validEmailRequired();
    this.initDepartments();

    this.initLegSol();
    this.initSex();
    this.initGEt();
    this.listArchivos = this.objAutodeclarativo.listArchivos;
    this.indexArchivos = this.objAutodeclarativo.indexArchivo;
  }

  validEmailRequired(): void {
    const isValidEmail =
      this.objAutodeclarativo.opAuthComElec ||
      this.objAutodeclarativo.opAuthNotElec;
    if (isValidEmail) {
      this.contactInformation.addControl(
        'email',
        new FormControl(this.objAutodeclarativo.email, [
          Validators.required,
          Validators.email,
          Validators.maxLength(30),
          Validators.pattern(
            '^[_a-zA-Z0-9-]+(.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*(.[a-zA-Z]{2,4})$'
          ),
        ])
      );
    } else {
      this.contactInformation.addControl(
        'email',
        new FormControl(this.objAutodeclarativo.email, [
          Validators.email,
          Validators.maxLength(30),
          Validators.pattern(
            '^[_a-zA-Z0-9-]+(.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*(.[a-zA-Z]{2,4})$'
          ),
        ])
      );
    }
  }

  initValues(): void {
    this.info = {
      title: 'Legitimidad del solicitante',
      description: '',
    };
  }

  nextPage(page): void {
    this.formSubmit = true;
    if (
      this.validLists() ||
      this.selectionLeGSol.invalid ||
      this.contactInformation.invalid
    ) {
      Object.values(this.selectionLeGSol.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((c) => c.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });

      Object.values(this.contactInformation.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((c) => c.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    } else if (this.listArchivos.length < 1) {
      this.showAlert(
        this.autdeService.getAlertInfo(
          'Debes de seleccionar al menos un archivo',
          false,
          true
        )
      );
    } else {
      const { legiSoli, grupoEtni, sex } = this.selectionLeGSol.value;
      const { departamento, municipio, direc, vereda, tel, cel, email } =
        this.contactInformation.value;

      const datos = {
        id: null,
        username: "user",
        idSexo: sex,
        idLegi: legiSoli,
        idGrupoEtnico: grupoEtni,
        direccion: direc,
        vereda,
        telefono: tel,
        celular: cel,
        email: email,
        idDepartamento: departamento,
        idMunicipio: municipio,
      };


      
      this.loadingService.loadingOn();
      this.autdeService.guardarLegitimidadsolicitante(datos).subscribe(
        (result) => {
          const object = new AutoDeclarativoModel(
            this.objAutodeclarativo.opAuth,
            this.objAutodeclarativo.opAuthComElec,
            this.objAutodeclarativo.opAuthNotElec,
            legiSoli, grupoEtni, sex,
            departamento, municipio, direc,
            vereda, tel, cel, email,
            2,
            this.objAutodeclarativo.lastPage = this.objAutodeclarativo.lastPage < 3 ? 3 : this.objAutodeclarativo.lastPage
              ,  this.objAutodeclarativo.predial, 
            this.listArchivos, this.indexArchivos
          );
          this.alertasService.mensajeSuccess(this.autdeService.getAlertSuccess(
            'Se guardo correctamente la legitimidad'
          )).subscribe((response) => {
            this.page.emit({ page, body: object });
          });
          
          this.loadingService.loadingOff();
         
          
        },
        () => {
          this.alertasService.mensajeError(this.autdeService.getAlertError(
            'No se guardó con éxito'
          )).subscribe((response) => {
          });
          this.loadingService.loadingOff();
        }
      );
    }
  }

  lastPage(page): void {
    const { legiSoli, grupoEtni, sex } = this.selectionLeGSol.value;
    const { departamento, municipio, direc, vereda, tel, cel, email } =
      this.contactInformation.value;

    const object = new AutoDeclarativoModel(
      this.objAutodeclarativo.opAuth,
      this.objAutodeclarativo.opAuthComElec,
      this.objAutodeclarativo.opAuthNotElec,
      legiSoli,
      grupoEtni,
      sex,
      departamento,
      municipio,
      direc,
      vereda,
      tel,
      cel,
      email,
      2,
      this.objAutodeclarativo.lastPage,
      this.objAutodeclarativo.predial,
      this.listArchivos,
      this.indexArchivos
    );

    this.page.emit({ page, body: object });
  }

  onSelect(event: any): void {
    const deparAux = this.departments.find(
      (depa) =>
        depa.id === Number(this.contactInformation.get('departamento').value)
    );
    this.objAutodeclarativo.department =
      this.contactInformation.get('departamento').value;

    this.municips = deparAux.municipios;
    this.municips.unshift(
      this.objAutodeclarativo.municip !== 'Seleccione...'
        ? this.objAutodeclarativo.municip
        : 'Seleccione...'
    );
  }

  initDepartments(): any {
    // this.departamentos = depart;
    this.loadingService.loadingOn();
    this.autdeService.getDepartments().subscribe(
      (result) => {
        this.departments = result;
        this.departments.unshift({
          departamento: 'Seleccione...',
          id: -1,
          municipios: [],
        });
       
        console.log(this.objAutodeclarativo.department)
        const deparAux = this.departments.find(
          (depa) => depa.id === Number(this.objAutodeclarativo.department)
        );
        this.municips = deparAux.municipios;
        /*this.municips.unshift(
          this.objAutodeclarativo.municip !== 'Seleccione...'
            ? this.objAutodeclarativo.municip
            : 'Seleccione...'
        );*/
        this.loadingService.loadingOff();
      },
      () => {
        this.loadingService.loadingOff();
      }
    );
  }

  validLists(): boolean {
    const { departamento, municipio } = this.contactInformation.value;
    if (
      departamento === '-1' ||
      municipio === '-1' ||
      departamento === 'Seleccione...' ||
      municipio === 'Seleccione...'
    ) {
      return true;
    }

    return false;
  }

  eliminarArchivo(index): void {
    this.listArchivos = this.listArchivos.filter((file) => {
      return file.index !== index;
    });
  }

  validateExt(ext): boolean{
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

  validateSize(size): boolean {
    if (size <= 4000000) {
      return true;
    }
    return false;
  }

  showAlert(alert): void {
    this.alertasService.mensajeWarn(alert).subscribe((response) => {
      if (response.isConfirmed) {
      }
    });
  }

}
