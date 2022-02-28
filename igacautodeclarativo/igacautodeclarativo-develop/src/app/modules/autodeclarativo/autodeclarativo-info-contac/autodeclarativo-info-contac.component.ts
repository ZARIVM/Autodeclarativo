import { ModalEditarInfoContacComponent } from './../modal-editar-info-contac/modal-editar-info-contac.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AutoDeclarativoModel } from '../models/autodeclarativoModel';
import { AutodeclarativoService } from '../services/autodeclarativo.service';
import { LoadingService } from '@app/shared/services/loading/loading.service';
import { AlertasService } from '@app/shared/services/alertas/alertas.service';

@Component({
  selector: 'igac-autodeclarativo-info-contac',
  templateUrl: './autodeclarativo-info-contac.component.html',
  styleUrls: ['./autodeclarativo-info-contac.component.scss'],
})
export class AutodeclarativoInfoContacComponent implements OnInit {
  info: any;
  cp = 1;
  pageSize = 5;
  pagesSizes = ['5', '10', '20', 'Todos'];
  listaInfoContact: any[] = [];
  @Output() page: EventEmitter<any>;
  @Input() objAutodeclarativo: AutoDeclarativoModel;

  constructor(
    public autdeService: AutodeclarativoService,
    private dialog: MatDialog,
    private loadingService: LoadingService,
    private alertasService: AlertasService,
  ) {
    this.page = new EventEmitter();
   
  }

  ngOnInit(): void {
    this.info = {
      title: 'Información de contacto',
      description: '',
    };
    
    this.inicializarForm();
  }
  inicializarForm(){
    this.obtenerInfoContacto();
  }

  obtenerInfoContacto() {
    this.loadingService.loadingOn();
    this.autdeService
      .obtenerInfoContacto(this.objAutodeclarativo.predial)
      .subscribe((result) => {
        this.listaInfoContact = result;
        this.loadingService.loadingOff();
      },()=>{
        this.loadingService.loadingOff();
      });
  }

  onSelectSize(event): void {
    if (event.target.value === 'Todos') {
       this.pageSize = this.listaInfoContact.length;
    } else {
      this.pageSize = Number(event.target.value);
    }
  }

  lastPage(page): void {
    this.page.emit({ page, body: this.objAutodeclarativo });
  }

  nextPage(page): void {
    // this.objAutodeclarativo.predial = this.predialSelect;
    this.objAutodeclarativo.lastPage = this.objAutodeclarativo.lastPage < 5 ? 5 : this.objAutodeclarativo.lastPage;
    this.page.emit({ page, body: this.objAutodeclarativo });
  }

  crearContacto() {
    let dialogCrear;
    dialogCrear = this.dialog.open(ModalEditarInfoContacComponent, {
      data: { contacto: null, accion: 'crear', idPredio: this.objAutodeclarativo.predial.numeroPredial},
    });

    dialogCrear.afterClosed().subscribe(
      (result: any) => {
        // router.navigateByUrl('/');
        this.obtenerInfoContacto();
      }
    );
  }
  editarContacto(data) {
    console.log("this.objAutodeclarativo.legiSoli", this.objAutodeclarativo.legiSoli)
    if(this.objAutodeclarativo.legiSoli === "2" || this.objAutodeclarativo.legiSoli === "1"){
     let dialogEditar;
    dialogEditar = this.dialog.open(ModalEditarInfoContacComponent, {
      data: { contacto: data, accion: 'editar', idPredio: this.objAutodeclarativo.predial.numeroPredial},
    });

    dialogEditar.afterClosed().subscribe(
      (result: any) => {
        // router.navigateByUrl('/');
        this.obtenerInfoContacto();
      }
    );
    }else{
         this.alertasService.mensajeWarn(this.autdeService.getAlertInfo("Debes validar legitimidad como propietario, poseedor u ocupante", false, true)).subscribe((response) => {
      if (response.isConfirmed) {
      }
    });
    }
    
  }
}
