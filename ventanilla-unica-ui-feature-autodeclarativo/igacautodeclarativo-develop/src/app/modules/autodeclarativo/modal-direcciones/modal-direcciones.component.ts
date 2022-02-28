import { Component, Input, OnInit } from '@angular/core';
import { ConsultasService } from '@app/services/consultas.service';

@Component({
  selector: 'app-modal-direcciones',
  templateUrl: './modal-direcciones.component.html',
  styleUrls: ['./modal-direcciones.component.scss'],
})
export class ModalDireccionesComponent implements OnInit {
  @Input() address: string[];
  direcciones: string[] = [];

  constructor(private consultaService: ConsultasService) {}

  ngOnInit(): void{
    this.loadDirecciones();
  }

  loadDirecciones(): void{
    this.direcciones = this.address;
  }
}
