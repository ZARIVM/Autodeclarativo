import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from '@app/shared/services/loading/loading.service';
import { ModalUsoConstruccionComponent } from '../modal-uso-construccion/modal-uso-construccion.component';
import { AutoDeclarativoModel } from '../models/autodeclarativoModel';
import { AutodeclarativoService } from '../services/autodeclarativo.service';

@Component({
  selector: 'igac-autodeclarativo-uso-cons',
  templateUrl: './autodeclarativo-uso-cons.component.html',
  styleUrls: ['./autodeclarativo-uso-cons.component.scss'],
})
export class AutodeclarativoUsoConsComponent implements OnInit {
  info: any;
  cp = 1;
  pageSize = 5;
  pagesSizes = ['5', '10', '20', 'Todos'];
  listaInfoConst: any[] = [];
  usoCons: any[] = [];
  @Output() page: EventEmitter<any>;
  @Input() objAutodeclarativo: AutoDeclarativoModel;

  constructor(
    public autdeService: AutodeclarativoService,
    private loadingService: LoadingService,
    private dialog: MatDialog
  ) {
    this.page = new EventEmitter();
  }

  ngOnInit(): void {
    this.info = {
      title: 'Usos y construcción',
      description: '',
    };
    this.obtenerUsosConstruccion();
  }

  obtenerUsosConstruccion() {
    this.loadingService.loadingOn();
    console.log("this.objAutodeclarativo",this.objAutodeclarativo)
    this.autdeService
      .obtenerUsosConstruccion(this.objAutodeclarativo.predial.idPredio)
      .subscribe(
        (result) => {
          this.loadingService.loadingOff();
          this.listaInfoConst = result;
          console.log("listaInfo", this.listaInfoConst)
        },
        () => {
          this.loadingService.loadingOff();
        }
      );
  }

  onSelectSize(event): void {
    if (event.target.value === 'Todos') {
      this.pageSize = this.listaInfoConst.length;
    } else {
      this.pageSize = Number(event.target.value);
    }
  }

  lastPage(page): void {
    this.page.emit({ page, body: this.objAutodeclarativo });
  }

  nextPage(page): void {
    // this.objAutodeclarativo.predial = this.predialSelect;
    this.objAutodeclarativo.lastPage = this.objAutodeclarativo.lastPage < 7 ? 7 : this.objAutodeclarativo.lastPage;
    
    this.page.emit({ page, body: this.objAutodeclarativo });
  }

  crearContacto() {
    let datos = { accion: 'crear', infoCons: null, idPredio: this.objAutodeclarativo.predial.idPredio};
    this.openDialog(datos);
  }

  editarContacto(data) {
    let datos = { accion: 'editar', infoCons: data, idPredio: this.objAutodeclarativo.predial.idPredio};
    this.openDialog(datos);
  }

  openDialog(data) {
    let dialogNew = this.dialog.open(ModalUsoConstruccionComponent, {
      data,
    });

    dialogNew.afterClosed().subscribe((datosNuevos) => {
       console.log("111", datosNuevos)
       if(datosNuevos !== null && datosNuevos){
        this.obtenerUsosConstruccion();
       }
      
    });
  }
}
