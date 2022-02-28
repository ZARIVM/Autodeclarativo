import { Component, OnInit } from '@angular/core';
import { StorageService } from '@shared/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'igac-autodeclarativo',
  templateUrl: './autodeclarativo.component.html',
  styleUrls: ['./autodeclarativo.component.scss'],
})
export class AutodeclarativoComponent implements OnInit {
  loa: string;
  info: any;
  esListado: boolean;
  constructor(private router: Router, private storageService: StorageService) {}

  onIniciarTramiteNuevo(val): void {
    this.esListado = val;
  }
  ngOnInit(): void {
    this.initValues();
    this.esListado = true;
    this.loa = this.storageService.getLOA();

    if (this.loa === 'loa:1') {
      this.router.navigateByUrl('@inicio/inicio.module');
    }
  }

  initValues(): void {
    this.info = {
      title: 'Registros método autodeclarativo',
      description: '',
    };
  }
}
