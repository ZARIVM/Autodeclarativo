import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@shared/services/loading/loading.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';
import { Predio } from '@shared/interfaces/predios/predio';
import { PrediosService } from '@shared/services/predios/predios.service';
import { PredioRequest } from '@shared/interfaces/predios/predio-request';
import { TramitesService } from '@shared/services/tramites/tramites.service';
import { StorageService } from '@shared/services/storage/storage.service';
import { TipoTramite } from '@app/shared/interfaces/tramites/tipo-tramite';
import { TipoDocumento } from '@app/shared/interfaces/tramites/tipo-documento';
import { AlertasService } from 'src/app/shared/services/alertas/alertas.service';
import { Alerta } from 'src/app/shared/interfaces/alertas/alerta';
import { Router } from '@angular/router';
// import { on } from 'process';

@Component({
  selector: 'igac-tramite',
  templateUrl: './tramite.component.html',
  styleUrls: ['./tramite.component.scss']
})
export class TramiteComponent implements OnInit {

  info: any;
  predial: string;
  depMun: string;
  tramiteId: string;
  numeroRadicado: string;
  formGroup: FormGroup;
  documentGroup: FormGroup;
  tipoTramites: TipoTramite[];
  municipios: TipoTramite[];
  usuarioSigac: TipoTramite[];
  tipoTramitesHijos: TipoTramite[];
  tramite: TipoTramite;
  tipoTramite: TipoTramite;
  territorial: TipoTramite;
  tipoDocumentoDetalle: TipoDocumento[];
  tipoDocumento: TipoDocumento[];
  departamento: string;
  municipio: string;

  tramites: string[];
  mutaciones: string[];
  subclases: string[];
  predios: Predio[];
  documentos: any[];

  showMutaciones: boolean;
  showSubclases: boolean;
  showPredios: boolean;
  showDocumentation: boolean;
  showObservation: boolean;
  showAuto: boolean;

  loa: string;
  observaciones: string;
  numeroPredial: string;
  matricula: string;
  numerosPredios: String[][];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private prediosService: PrediosService,
    private tramitesService: TramitesService,
    private storageService: StorageService,
    private alertasService: AlertasService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loa = this.storageService.getLOA();

    if (this.loa === 'loa:1') {
      this.router.navigateByUrl('@inicio/inicio.module');
    } else {
      this.initTipoTramite();
      this.initValues();
      this.initPredios();
      this.initForm();
      this.initDocumentForm();
      this.initParams();
      this.initTerritorial();
      this.initUsuarioSigac();
    }

    this.numerosPredios = [];
  }

  initTipoTramite() {
    this.loadingService.loadingOn();
    const body = {
      id_parametro: '',
      nombre_parametro: 'TRAMITE',
    };
    this.tramitesService.getTipoTramite(body).subscribe(response => {
      this.loadingService.loadingOff();
      this.tipoTramites = response;
      console.log('TipoTramites: ' + this.tipoTramites);
    }, () =>
      this.loadingService.loadingOff());
  }

  initTipoTramitaHijo(idValor: number) {
    this.loadingService.loadingOn();
    const body = {
      id_valor: idValor
    };
    this.tramitesService.getTipoTramiteHijo(body).subscribe(response => {
      this.tipoTramitesHijos = response;
      this.loadingService.loadingOff();
    }, () =>
      this.loadingService.loadingOff());
  }

  initTipoDocumento(idValor: number ) {
    this.loadingService.loadingOn();
    console.log("idValor", idValor);
    const body = {
      id_valor: idValor
    };
      this.tramitesService.getTipoTramiteHijo(body).subscribe(response => {
        this.loadingService.loadingOff();
        this.tipoDocumento = response;
        if (this.tipoDocumento[0]) {
          this.initTipoDocumentoHijo(this.tipoDocumento);
          console.log('TipoDocumentoHjios: ' + this.tipoDocumento.length);
        }
  
      }, () =>
        this.loadingService.loadingOff());
  }

  initTipoDocumentoHijo(tipoDocumento: TipoDocumento[]) {
    this.loadingService.loadingOn();
    for (let documeno of tipoDocumento) {
      const body = {
        id_valor: documeno.id
      };
      this.tramitesService.getTipoTramiteHijo(body).subscribe(response => {
        this.loadingService.loadingOff();
        this.tipoDocumentoDetalle = response;
        if (this.tipoDocumentoDetalle[0]) {
          this.initAgregarDocumentos(this.tipoDocumentoDetalle);
        }
        this.initDocumentForm();
      }, () =>
        this.loadingService.loadingOff());
    }
  }

  initAgregarDocumentos(tipoDocumentoDetalle: TipoDocumento[]) {
    const documento = {
      control: 'cedula',
      required: true,
      file: 'image/jpeg',
      size: 10000000,
      title: 'Adjuntar la foto del documento para la radicación del trámite',
      label: 'Se permiten archivos JPG. Tamaño máximo: 10 MB.',
      visible: false,
      type: ['Mutación']
    }
    for (let documentoDetalle of tipoDocumentoDetalle) {
      
      if (documentoDetalle.detalle.toUpperCase() === 'control'.toUpperCase()) {
        documento.control = documentoDetalle.descripcion;
      }
      if (documentoDetalle.detalle.toUpperCase() === 'required'.toUpperCase()) {
        documento.required = documentoDetalle.descripcion === 'true';
      }
      if (documentoDetalle.detalle.toUpperCase() === 'file'.toUpperCase()) {
        documento.file = documentoDetalle.descripcion;
      }
      if (documentoDetalle.detalle.toUpperCase() === 'size'.toUpperCase()) {
        documento.size = Number(documentoDetalle.descripcion);
      }
      if (documentoDetalle.detalle.toUpperCase() === 'title'.toUpperCase()) {
        documento.title = documentoDetalle.descripcion;
      }
      if (documentoDetalle.detalle.toUpperCase() === 'label'.toUpperCase()) {
        documento.label = documentoDetalle.descripcion;
      }
      if (documentoDetalle.detalle.toUpperCase() === 'visible'.toUpperCase()) {
        documento.visible = documentoDetalle.descripcion === 'true';
      }
    }
    this.documentos.push(documento);
    this.showDocumentation = true;
  }

  initTerritorial(): void {
    this.loadingService.loadingOn();
    const body = {
      id_parametro: '',
      nombre_parametro: 'Municipios',
    };
    this.tramitesService.getTipoTramite(body).subscribe(response => {
      this.loadingService.loadingOff();
      this.municipios = response;
    }, () =>
      this.loadingService.loadingOff());
  }

  initUsuarioSigac(){
    this.loadingService.loadingOn();
    const body = {
      id_parametro: '',
      nombre_parametro: 'usuario-sigac',
    };
    this.tramitesService.getTipoTramite(body).subscribe(response => {
      this.loadingService.loadingOff();
      this.usuarioSigac = response;
    }, () =>
      this.loadingService.loadingOff());
  }

  initValues(): void {
    this.info = {
      title: 'Crear Trámite',
      description: 'A continuación podrá crear un tramite para el predio seleccionado.' ,
      description2: 'Recuerde que debe diligenciar todos los campos obligatorios (*) para poder enviar su solicitud.'
    };

    this.tramites = ['Mutacion', 'Rectificación', 'Complementación', 'Cancelación de Predio', 'Modificación Inscripción Catastral'];
    this.mutaciones = ['Primera', 'Segunda', 'Tercera', 'Cuarta', 'Quinta'];
    this.subclases = ['Englobe', 'Desenglobe'];
    this.predios = [];
    this.documentos = [];

  }

  initParams(): void {
    this.activatedRoute.params.subscribe(params => {
      this.predial = (params.id).toString();
      this.depMun = this.predial.substring(0, 5);
      this.departamento = this.depMun.substring(0, 2);
      this.municipio = this.depMun.substring(2, 5);
    });
  }

  initForm(): void {
    this.formGroup = this.formBuilder.group({
      tramite: [{ value: null, disabled: !this.existTramites }, Validators.required],
      mutacion: [{ value: null, disabled: !this.existMutaciones }],
      observaciones: ['', Validators.required],
      numeroPredial: [''],
      matricula: [''],
      predios: [null],
      areaConstruccion: [''],
	    areaTerreno:  [''],
	    autoConstruccion: [''],
	    autoTerreno:  [''],
	    direccion:  ['']
    });
    this.initControls();
    this.initListeners();
  }

  initDocumentForm(): void {
    const form = {};
    this.documentos.forEach(documento => {
      form[documento.control] = documento.required ?
        [null, Validators.required] : [null];
    });
    this.documentGroup = this.formBuilder.group(form);
  }

  initControls(): void {
    this.showMutaciones = false;
    this.showSubclases = false;
    this.showDocumentation = false;
    this.showPredios = false;
    this.showAuto= false;
    this.showObservation = false;
  }

  onChange(event){
      const value = event.target.value;
      this.documentos = [];
      this.showDocumentation = false;
      this.showPredios = false;
      this.showMutaciones = isNotNullOrUndefined(value);
      this.showObservation = false;
      this.showAuto = false;

      if(this.documentGroup){
        this.documentos = [];
        this.showDocumentation = false;
        this.documentGroup.reset();
      }
      if (this.showMutaciones) {
        this.formGroup.controls.mutacion.clearValidators();
        this.formGroup.controls.mutacion.updateValueAndValidity();
        this.formGroup.controls.mutacion.reset();
        this.tramite = this.tipoTramites.find(obj => obj.detalle === value);
        this.initTipoTramitaHijo(this.tramite.id);
        this.formGroup.controls.mutacion.setValidators(Validators.required);
      } 
  }

  onChangeMutacion(event){
    const value = event.target.value;
    this.documentos = [];
      this.showDocumentation = false;
      this.showPredios = false;
      this.showAuto= false;
      this.showSubclases = isNotNullOrUndefined(value);

      if (this.showSubclases) {
        this.tipoTramite = this.tipoTramitesHijos.find(obj => obj.detalle === value);
        this.initTipoDocumento(this.tipoTramite.id);
      }
      if(this.documentGroup){
        this.documentos = [];
        this.showDocumentation = false;
        this.onResetFormDoc();
      }
      console.log('value: ' + value);

      if (value === 'Agregación / Englobe') {
        this.showPredios = true;
        this.formGroup.controls.predios.setValidators(Validators.required)

      } else if (value === 'Auto estimación de avalúos') {
        this.showObservation = true;
        this.showAuto= true;

      } else if (value === 'Revisión de avalúo Catastral') {
        this.showObservation = true;

      }else{
        this.formGroup.controls.predios.clearValidators();
        this.formGroup.controls.predios.updateValueAndValidity();
        this.formGroup.controls.predios.reset();
        this.showObservation = false;
        this.showAuto= false;
      }
  }

  initListeners(): void {
  
    /*this.formGroup.controls.tramite.valueChanges.subscribe(value => {
      this.documentos = [];
      this.showDocumentation = false;
      this.showPredios = false;
      this.cargarDocumentos = false;
      this.showMutaciones = isNotNullOrUndefined(value);
      console.log('this.documentGroup' , this.documentGroup);
      console.log('this.showMutaciones' , this.showMutaciones);
      console.log('valueTramite ' , value);

      if(this.documentGroup){
        this.documentos = [];
        this.showDocumentation = false;
        this.documentGroup.reset();
      }
      if (this.showMutaciones) {
        this.formGroup.controls.mutacion.clearValidators();
        this.formGroup.controls.mutacion.updateValueAndValidity();
        this.formGroup.controls.mutacion.reset();
        this.tramite = this.tipoTramites.find(obj => obj.detalle === value);
        this.initTipoTramitaHijo(this.tramite.id);
        this.formGroup.controls.mutacion.setValidators(Validators.required);
      } 
    });*/

    /*this.formGroup.controls.mutacion.valueChanges.subscribe(value => {
      
    });*/
  }

  initPredios(): void {
    this.loadingService.loadingOn();
    const request: PredioRequest = {
      idRequerimiento: '123',
      nombre: 'prueba',
      numDoc: this.storageService.getNumDoc(),
      //numDoc: '10237169',
      tipoDoc: this.storageService.getTypeDoc(),
      pagina: '1',
      usuario: this.storageService.getUsername()
    };
    this.prediosService.getPredios(request).subscribe(response => {
      this.predios = response && response.predios ? response.predios : [];
      this.loadingService.loadingOff();
    }, () => this.loadingService.loadingOff());
  }

  onResetForm(): void {
    this.formGroup.reset();
    this.documentGroup.reset();
    this.showDocumentation = false;
    this.onResetFormDoc();
    this.tramite = null;
    this.tipoTramite = null;
  }

  onResetFormDoc(): void {
    this.documentGroup.reset();
    this.showDocumentation = false;
  }

  onSetProcedure(): void {

    if (!this.validDocumentation()) {
      return;
    }
    this.depMun = this.predial.substring(0, 5);
    const territorial = this.municipios.find(municipio => municipio.detalle === this.depMun);
    console.log('this.depMun: ', this.depMun);
    console.log('terrotorial: ', territorial);
    console.log('codigoDep: ', this.depMun.substring(0, 2));

    const funRadicador = this.usuarioSigac.find(usuario => usuario.detalle === territorial.padre.detalle);
    console.log('funRadicador: ', funRadicador);


    const documentosCodigo = [];
    let documentoAdd = {
      codigoDocReq: '15'
    }
    this.documentos.forEach(documento => {
      if (documento.visible) {
        documentoAdd.codigoDocReq = documento.control;
        documentosCodigo.push(documentoAdd.codigoDocReq);
      }
    });

    let prediosString = '[';

    for (let item of this.numerosPredios) {
      prediosString += item[0];
      prediosString += ',';
    }
    prediosString = prediosString.slice(0, -1);
    prediosString += ']';

    const body = {
      numeroPredial: [this.predial],
      nupre: null,
      codigoTramite: this.tipoTramite.descripcion,
      codigoTipoDocumental: '960',
      tipoTramite: this.tramite.detalle,
      claseMutacion: this.tipoTramite.detalle,
      subclaseMutacion: 'string',
      territorial: territorial.padre.descripcion,
      funRadicador: funRadicador.descripcion,
      tercero: {
        direccion: this.storageService.getDireccion(),
        razonSocial: '',
        codigoCiudad: this.depMun,
        codigoTipoDocumento: this.storageService.getTypeDoc(),
        codigoTipoPersona: 'NAT',
        telefonoFijo: '',
        primerApellido: this.storageService.getPrimerApellido(),
        primerNombre: this.storageService.getPrimerNombre(),
        segundoApellido: this.storageService.getSegundoApellido(),
        segundoNombre: this.storageService.getSegundoNombre(),
        correoElectronico: this.storageService.getEmail(),
        tipoDireccion: 'UR',
        codigoDepartamento: this.depMun.substring(0, 2),
        numDocumento: this.storageService.getNumDoc(),
        telefonoMovil: this.storageService.getTelefono(),
        userName: this.storageService.getUsername(),
        notificarPorCorreoE: true,
        codigoPais: '170'
      },
      listRegistroAnexo: documentosCodigo,
      codigoDependencia: territorial.padre.detalle,
      codigoDependenciaRadicadora: territorial.padre.detalle,
      observaciones: this.formGroup.controls.observaciones.value,
      listaPredios: prediosString,
      areaConstruccion: this.formGroup.controls.areaConstruccion.value.toString(),
	    areaTerreno: this.formGroup.controls.areaTerreno.value.toString(),
	    autoConstruccion: this.formGroup.controls.autoConstruccion.value.toString(),
	    autoTerreno: this.formGroup.controls.autoTerreno.value.toString(),
	    direccion: this.formGroup.controls.direccion.value
    };
    console.log('body:', body);
    this.loadingService.loadingOn();
    this.tramitesService.registrarTramite(body).subscribe(response => {
      this.loadingService.loadingOff();
      this.tramiteId = response.data;
      this.numeroRadicado = response.numRadicado;
      console.log('response: ', this.numeroRadicado);
      this.onUploadFile();
      
    }, () =>
      this.loadingService.loadingOff());
  }

  onUploadFile(): void {
    if(this.numeroRadicado != null){
      this.documentos.forEach(documento => {
        if (documento.visible && this.documentGroup.controls[documento.control].value) {
          const formData: FormData = new FormData();
          formData.append(
            'File',
            this.documentGroup.controls[documento.control].value.file,
            this.documentGroup.controls[documento.control].value.name
          );
  
          formData.append('processId', this.tramiteId);
          this.loadingService.loadingOn();
          this.tramitesService.registrarAnexo(formData).subscribe(() => {
            this.loadingService.loadingOff();
          }, () =>
            this.loadingService.loadingOff());
        }
      });
      const alert: Alerta = {
        textHtml: 'Recuerde que su solicitud sera validada por el IGAC, <br> su número de radicado es: ' + this.numeroRadicado,
        btnText: 'ACEPTAR',
        btnClose: 'CERRAR',
        text: '',
        title: 'SOLICITUD INICIADA',
        showCancelButton: true,
        showConfirmButton: true
      };
      this.showAlert(alert, 1);
    }else{
      const alert: Alerta = {
        textHtml: 'En este momento no se encuntra disponible el servicio de radicación',
        btnText: 'ACEPTAR',
        btnClose: 'CERRAR',
        text: '',
        title: 'SOLICITUD',
        showCancelButton: true,
        showConfirmButton: true
      };
      this.showAlert(alert, 3);
    }

   
  }

  get existTramites(): boolean {
    return isNotNullOrUndefined(this.tramites) && this.tramites.length > 0;
  }

  get existMutaciones(): boolean {
    return isNotNullOrUndefined(this.mutaciones) && this.mutaciones.length > 0;
  }

  /*get existSubclases(): boolean {
    return isNotNullOrUndefined(this.subclases) && this.subclases.length > 0;
  }*/

  get existPredios(): boolean {
    return isNotNullOrUndefined(this.predios) && this.predios.length > 0;
  }

  /*get showDocumentation(): boolean {
    return !!this.documentos.find(obj => !!obj.visible) && isNotNullOrUndefined(this.tramiteId);
  }*/

  validDocumentation(): boolean {
    for (const doc of this.documentos) {
      if (doc.visible && doc.required && !this.documentGroup.controls[doc.control].value) {
        return false;
      }
    }
    return true;
  }

  validTipoMutacion(): boolean{
    if(this.tramite && this.tipoTramite){
      return false;
    }
    return true;
  }

  showAlert(alerta: Alerta, tipoAlerta: number): void {
    if (tipoAlerta == 1) {
      this.alertasService.mensajeSuccess(alerta).subscribe(response => {
        if (response.isConfirmed == true) {
          this.router.navigateByUrl('@inicio/inicio.module');
        }
      });
    }
    if (tipoAlerta == 2) {
      this.alertasService.mensajeWarn(alerta).subscribe(() => {
      });
    }
    if (tipoAlerta == 3) {
      this.alertasService.mensajeError(alerta).subscribe(() => {
      });
    }
  }

  validObservaciones(): boolean{
    if (this.showObservation) {
      if (this.formGroup.controls.observaciones.value !== '') {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  validarNumeroIncluidos(): boolean{
    if (this.showPredios) {
      if (this.numerosPredios.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  validarNumeroPredial(): boolean {
    this.numeroPredial = this.formGroup.controls.numeroPredial.value;
    if (this.numeroPredial !== '') {
      if (this.numeroPredial.length >= 15 && this.numeroPredial.length <= 25) {
        return true
      }
    }
    return false;
  }

  validarNumeroMatricula(): boolean {
    this.matricula = this.formGroup.controls.matricula.value;
    if (this.matricula !== '') {
      if (this.matricula.length >= 9 && this.matricula.length <= 10) {
        let primeraParte = this.matricula.substr(0,3);
        let segundaParte = this.matricula[3];
        let terceraParte = this.matricula.substr(4);

        console.log(isNaN(Number(primeraParte)));
        console.log(segundaParte === '-');
        console.log(isNaN(Number(terceraParte)));

        if (!isNaN(Number(primeraParte)) && !isNaN(Number(terceraParte)) && segundaParte === '-') {
          return true
        } else {
          return false;
        }
      }
    }
    return false;
  }

  consultarPredial(opcion: string): void {
    if (opcion === 'predial') {
      const body = {
        idRequerimiento: '1',
        numPredial: this.depMun + this.numeroPredial,
        usuario: "test"
      }
      this.loadingService.loadingOn();
      this.tramitesService.consultarPredio(body).subscribe(response => {
        let predio = response && response.predios ? response.predios : [];
        console.log(predio[0].direccion);
        console.log('consulta predios: ' , this.predios.length)
        this.loadingService.loadingOff();
        const alert: Alerta = {
          textHtml: 'No se ha encontrado este predio.<br> Número de predial: ' + this.depMun + this.numeroPredial,
          btnText: 'ACEPTAR',
          btnClose: 'CERRAR',
          text: '',
          title: 'PREDIO NO ENCONTRADO',
          showCancelButton: true,
          showConfirmButton: true
        };
        
        if (predio.length == 0) {
          this.showAlert(alert, 3);
        } else if (this.numerosPredios.length == 0) {
          this.numerosPredios.push([predio[0].numPredial, predio[0].matricula, predio[0].direccion]);
        } else {
          let existePredio = false;
          for (let item of this.numerosPredios) {
            if (item[0] === predio[0].numPredial) {
              existePredio = true;
              break;
            }
          }
          if (!existePredio) {
            this.numerosPredios.push([predio[0].numPredial, predio[0].matricula, predio[0].direccion]);
          } else {
            const alert: Alerta = {
              textHtml: 'Este número predial ya fue incluido.<br> Número de predial: ' + this.depMun + this.numeroPredial,
              btnText: 'ACEPTAR',
              btnClose: 'CERRAR',
              text: '',
              title: 'PREDIO INCLUIDO',
              showCancelButton: true,
              showConfirmButton: true
            };
            this.showAlert(alert, 2);
          }
        }
      }, () =>
        this.loadingService.loadingOff());
    } else if (opcion === 'matricula') {
      const body = {
        direccion: '',
        idRequerimiento: '1',
        matricula: this.matricula.substr(4),
        nroPredial: this.depMun,
        numDoc: this.storageService.getNumDoc(),
        pagina: '1',
        primerApellido: '',
        primerNombre: '',
        razonSocial: '',
        segundoApellido: '',
        segundoNombre: '',
        tipoDoc: this.storageService.getTypeDoc(),
        usuario: 'test'
      }
      console.log('11111111');
      this.loadingService.loadingOn();
      this.tramitesService.consultarPredioMatricula(body).subscribe(response => {
        let predio = response && response.predios ? response.predios : [];
        this.loadingService.loadingOff();
        const alert: Alerta = {
          textHtml: 'No se ha encontrado este predio.<br> Número de matricula: ' + this.matricula,
          btnText: 'ACEPTAR',
          btnClose: 'CERRAR',
          text: '',
          title: 'PREDIO NO ENCONTRADO',
          showCancelButton: true,
          showConfirmButton: true
        };
        
        if (predio.length == 0) {
          this.showAlert(alert, 3);
        } else if (this.numerosPredios.length == 0) {
          this.numerosPredios.push([predio[0].numPredial, predio[0].matricula, predio[0].direccion]);
        } else {
          let existePredio = false;
          for (let item of this.numerosPredios) {
            if (item[0] === predio[0].numPredial) {
              existePredio = true;
              break;
            }
          }
          if (!existePredio) {
            this.numerosPredios.push([predio[0].numPredial, predio[0].matricula, predio[0].direccion]);
          } else {
            const alert: Alerta = {
              textHtml: 'Este número predial ya fue incluido.<br> Número de matricula: ' + this.matricula,
              btnText: 'ACEPTAR',
              btnClose: 'CERRAR',
              text: '',
              title: 'PREDIO INCLUIDO',
              showCancelButton: true,
              showConfirmButton: true
            };
            this.showAlert(alert, 2);
          }
        }
        console.log('22222222222');
      }, () =>
        this.loadingService.loadingOff());
    }
  }

  eliminarPredio(item: string[]){
    let indice = this.numerosPredios.indexOf(item);
    this.numerosPredios.splice(indice, 1);
  }
}
