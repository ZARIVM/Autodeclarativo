import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertasService } from '@app/shared/services/alertas/alertas.service';
import { AutoDeclarativoModel } from '../models/autodeclarativoModel';
import { AutodeclarativoService } from '../services/autodeclarativo.service';

@Component({
  selector: 'igac-ubicacion-geografica',
  templateUrl: './ubicacion-geografica.component.html',
  styleUrls: ['./ubicacion-geografica.component.scss']
})
export class UbicacionGeograficaComponent implements OnInit {

  @Output() page: EventEmitter<any>;
  @Input() objAutodeclarativo: AutoDeclarativoModel;
  listArchivos: any[] = [];
  indexArchivos = 0;

  constructor(  private autdeService: AutodeclarativoService,
    private alertasService: AlertasService,) {
      this.page = new EventEmitter();
     }

  ngOnInit(): void {
  }


  lastPage(page): void {
    this.page.emit({ page, body: this.objAutodeclarativo });
  }

  nextPage(page): void {
    // this.objAutodeclarativo.predial = this.predialSelect;
    this.objAutodeclarativo.lastPage = this.objAutodeclarativo.lastPage < 8 ? 8 : this.objAutodeclarativo.lastPage;
    this.page.emit({ page, body: this.objAutodeclarativo });
  }



}
