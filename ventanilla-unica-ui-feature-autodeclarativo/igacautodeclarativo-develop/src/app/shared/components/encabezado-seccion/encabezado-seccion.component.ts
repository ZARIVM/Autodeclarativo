import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'igac-encabezado-seccion',
  templateUrl: './encabezado-seccion.component.html',
  styleUrls: ['./encabezado-seccion.component.scss']
})
export class EncabezadoSeccionComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() description2: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
