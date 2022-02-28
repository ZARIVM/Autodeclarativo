import { Municipio } from './../../../shared/interfaces/general/municipio';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutodeclarativoService } from './../services/autodeclarativo.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Departamento } from '@app/shared/interfaces/general/departamento';
import depart from '@shared/data/departamentos.json';
import { AutoDeclarativoModel } from '../models/autodeclarativoModel';
import { Alerta } from '@app/shared/interfaces/alertas/alerta';
import { AlertasService } from '@app/shared/services/alertas/alertas.service';
import { Predio } from '@app/shared/interfaces/predioConsulta';
import { LoadingService } from '@app/shared/services/loading/loading.service';

@Component({
  selector: 'igac-filtrobusquedapredio',
  templateUrl: './filtrobusquedapredio.component.html',
  styleUrls: ['./filtrobusquedapredio.component.scss'],
})
export class FiltrobusquedapredioComponent implements OnInit {
  constructor(public autdeService: AutodeclarativoService, public formBuil: FormBuilder, private alertasService: AlertasService,
    private loadingService: LoadingService) {
    this.filter = new EventEmitter();
  }

  info: any;
  departamentos: Departamento[];

  @Output() filter: EventEmitter<Predio[]>;
  @Input() objAutodeclarativo: AutoDeclarativoModel;
  // selectedDepartament: Departamento = null;
  municipios: string[];
  filtroPredioForm: FormGroup;

  ngOnInit(): void {
    this.initValues();
    this.initDepartamentos();
  }

  initValues(): void {
    this.info = {
      title: 'Filtros de búsqueda',
      description: '',
    };

    this.filtroPredioForm = this.formBuil.group({
      folioMatricula: ['', []],
      numeroPredial: ['', []],
      codigoNupre: ['', []],
      departamento: ['-1', [Validators.required]],
      municipio: ['Seleccione...', []],
      direccion: ['', []]
    });
  }

  initDepartamentos(): any {
    // this.departamentos = depart;
    this.loadingService.loadingOn();
    this.autdeService.getDepartments().subscribe((result) => {
      this.loadingService.loadingOff();
      this.departamentos = result;
      this.departamentos.unshift({
        departamento: 'Seleccione...',
        id: -1,
        municipios: [],
      });
      // this.departamentos.unshift({ departamento: 'Seleccione...', id: -1, municipios: [] });
      this.municipios = ['Seleccione...'];
    }, error =>{
      this.loadingService.loadingOff();
    });
  }

  onSelect(event: any): void {

    const deparAux = this.departamentos.find(
      (depa) =>
        depa.id === Number(this.filtroPredioForm.get('departamento').value)
    );
    this.municipios = deparAux.municipios;
    this.municipios.unshift(
      'Seleccione...'
    );
  }

  buscarPredial() {
    //folioMatricula, numeroPredial, codigoNupre, departamento, municipio, direccion
    const datos = {
      folioMatricula: this.filtroPredioForm.get('folioMatricula').value,
      numeroPredial: this.filtroPredioForm.get('numeroPredial').value,
      codigoNupre: this.filtroPredioForm.get('codigoNupre').value,
      departamento: this.filtroPredioForm.get('departamento').value,
      municipio: this.filtroPredioForm.get('municipio').value,
      direccion: this.filtroPredioForm.get('direccion').value
    };
    
    if (datos.departamento !== '-1' && this.validarCamposLlenos(datos)) {
      const alert: Alerta = this.autdeService.getAlertInfo(
        'Debe acompañar de otro filtro de búsqueda', false, true
      );
      this.alertasService.mensajeWarn(alert).subscribe((response) => {});
    }else if(this.validarCamposLlenos(datos) && datos.departamento === '-1'){
      const alert: Alerta = this.autdeService.getAlertInfo(
        'Debe diligenciar algún filtro de búsqueda', false, true
      );
      this.alertasService.mensajeWarn(alert).subscribe((response) => {});
    }
    else { 
      this.loadingService.loadingOn();
      this.autdeService.buscarPredial(datos).subscribe((result) => {
        
        this.loadingService.loadingOff();
         this.filter.emit(result);
      }, error => {
        this.loadingService.loadingOff();
      });
    }
    // legiSoli
  }

  validarCamposLlenos(datos){
       return datos.folioMatricula === '' &&  datos.numeroPredial === '' && datos.codigoNupre === '' && datos.direccion === '' &&
       (datos.municipio === 'Seleccione...' || datos.municipio === '');
  }
}
