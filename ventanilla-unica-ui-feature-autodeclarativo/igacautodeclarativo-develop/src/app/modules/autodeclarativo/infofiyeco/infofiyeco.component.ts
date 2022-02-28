import { MatDialog } from '@angular/material/dialog';
import { ModalEditinfoyecoComponent } from './../modal-editinfoyeco/modal-editinfoyeco.component';
import { ModalDireccionesComponent } from './../modal-direcciones/modal-direcciones.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AutodeclarativoService } from './../services/autodeclarativo.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AutoDeclarativoModel } from '../models/autodeclarativoModel';
import { LoadingService } from '@app/shared/services/loading/loading.service';

@Component({
  selector: 'igac-infofiyeco',
  templateUrl: './infofiyeco.component.html',
  styleUrls: ['./infofiyeco.component.scss'],
})
export class InfofiyecoComponent implements OnInit {
  listFisicaPredio: any[] = [];
  cp = 1;
  pageSize = 5;
  pagesSizes = ['5', '10', '20', 'Todos'];

  @Output() page: EventEmitter<any>;
  @Input() objAutodeclarativo: AutoDeclarativoModel;

  constructor(
    private data: AutodeclarativoService,
    private modalService: NgbModal,
    private dialog: MatDialog,
    private loadingService: LoadingService
  ) {
    this.page = new EventEmitter();
  }

  getData() {
    this.loadingService.loadingOn();
    this.data.getPredios("1").subscribe((value) => {
      this.listFisicaPredio = value;
      this.loadingService.loadingOff();
    }, error=>{
      this.loadingService.loadingOff();
    });
  }
  showAddress(address): void {
    let currentDialog;

    currentDialog = this.modalService.open(ModalDireccionesComponent, {
      centered: true,
    });

    currentDialog.componentInstance.address = address;
  }
  getAction(info): void {
    // let currentDialog;

    // currentDialog = this.modalService.open(ModalEditinfoyecoComponent, {
    //   centered: true,
    //   size: 'lg',
    //   windowClass: 'myCustomModalClass',
    // });
    // currentDialog.componentInstance.info = info;

    this.openDialog(info);
  }

  openDialog(data) {
    let dialogNew = this.dialog.open(ModalEditinfoyecoComponent, {
      height: '40%',
      width: '60%',
      data,
    });

    dialogNew.afterClosed().subscribe(() => {
        this.getData();
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  lastPage(page): void {
    this.page.emit({ page, body: this.objAutodeclarativo });
  }

  nextPage(page): void {
    // this.objAutodeclarativo.predial = this.predialSelect;
    this.objAutodeclarativo.lastPage = this.objAutodeclarativo.lastPage < 6 ? 6 : this.objAutodeclarativo.lastPage;
    this.page.emit({ page, body: this.objAutodeclarativo });
  }

  onSelectSize(event): void {
    if (event.target.value === 'Todos') {
      this.pageSize = this.listFisicaPredio.length;
    } else {
      this.pageSize = Number(event.target.value);
    }
  }

  initForm(){
    this.getData();
  }
}
