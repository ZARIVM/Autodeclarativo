import { ModalDireccionesComponent } from './../modal-direcciones/modal-direcciones.component';
import { AlertasService } from './../../../shared/services/alertas/alertas.service';
import { AutodeclarativoService } from './../services/autodeclarativo.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ConsultasService } from '@app/services/consultas.service';
import { Predio } from '@app/shared/interfaces/predioConsulta';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AutoDeclarativoModel } from '../models/autodeclarativoModel';
import { LoadingService } from '@app/shared/services/loading/loading.service';

@Component({
  selector: 'igac-autodeclarativopredio',
  templateUrl: './autodeclarativopredio.component.html',
  styleUrls: ['./autodeclarativopredio.component.scss'],
})
export class AutodeclarativopredioComponent implements OnInit {
  info: any;
  cp = 1;
  pageSize = 5;
  pagesSizes = ['5', '10', '20', 'Todos'];
  closeResult: string;
  predios: Predio[] = [];
  checkAnterior = -1;
  predialSelect: Predio = null;
  pageSelect = -1;


  // @Output() esListado: EventEmitter<boolean>;
  @Output() page: EventEmitter<any>;
  @Input() objAutodeclarativo: AutoDeclarativoModel;
  alert = this.autdeService.getAlertInfo(
    'No existen predios asociados, por favor realice la búsqueda con los filtros de búsqueda',
    false,
    true
  );

  constructor(
    private modalService: NgbModal,
    public autdeService: AutodeclarativoService,
    private alertasService: AlertasService,
    private loadingService: LoadingService
  ) {
    this.page = new EventEmitter();
  }

  ngOnInit(): void {
    this.initValues();
  
    
  }

  initValues(): void {
    this.info = {
      title: 'Consultar predios',
      description: '',
    };

    this.loadingService.loadingOn();
    if (this.objAutodeclarativo.legiSoli === '2') {
      this.loadPredios();
    } else {
      this.showAlert(this.alert);
      this.loadingService.loadingOff();
    }

    if(this.objAutodeclarativo !== null){
      this.predialSelect = this.objAutodeclarativo.predial;
    }

  }

  getSNC(): void {
    if (this.objAutodeclarativo.legiSoli) {
    }
  }

  loadPredios(): void {
    this.autdeService.getPredios("1").subscribe(
      (response) => {
       
        if (response.length > 0) {
          this.predios = response.map(result=>{
              return new Predio(result.numPredial, result.folioMatricula, result.numPredial, result.codigoNupre, result.departamento, result.municipio, "10292", result.direcciones, result.numDocumento)
          })
          this.loadingService.loadingOff();
        } else {
          this.showAlert(this.alert);
          this.loadingService.loadingOff();
        }
      },
      () => {
        this.loadingService.loadingOff();
        this.showAlert(this.alert);
      }
    );
  }

  showAlert(alert): void {
    this.alertasService.mensajeWarn(alert).subscribe((response) => {
      if (response.isConfirmed) {
      }
    });
  }

  onCheckboxChange(predial, index, event): void {
    console.log(this.checkAnterior, this.predialSelect )
    if(event.target.checked === true){
      this.checkAnterior = index;
      this.predialSelect = predial;
      this.pageSelect = this.cp;
    }else{
      this.checkAnterior = -1;
      this.predialSelect = null;
      this.pageSelect = -1;
    }
 
  }

  open(content): void {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  lastPage(page): void {
    this.objAutodeclarativo.predial = this.predialSelect;
    
    this.page.emit({ page, body: this.objAutodeclarativo });
  }

  nextPage(page): void {
    this.objAutodeclarativo.predial = this.predialSelect;
      this.objAutodeclarativo.lastPage = this.objAutodeclarativo.lastPage < 4 ? 4 : this.objAutodeclarativo.lastPage;
    this.page.emit({ page, body: this.objAutodeclarativo });
  }

  showAddress(address): void {
    let currentDialog;

    currentDialog = this.modalService.open(ModalDireccionesComponent, {
      centered: true,
    });
    currentDialog.componentInstance.address = address;

    currentDialog.result.then(
      (result: any) => {
        // router.navigateByUrl('/');
      },
      (reason: any) => {
        // router.navigateByUrl('/');
      }
    );
  }

  filter(predios): void {
    if (predios.length > 0) {

       this.predios = predios.map(result=>{
              return new Predio(result.numPredial, result.folioMatricula, result.numPredial, result.codigoNupre, result.departamento, result.municipio, "10292", result.direcciones, result.numDocumento)
          })
    } else {
      this.showAlert(this.alert);
    }
  }

  onSelectSize(event): void {
    if (event.target.value === 'Todos') {
      this.pageSize = this.predios.length;
    } else {
      this.pageSize = Number(event.target.value);
    }
  }

}
