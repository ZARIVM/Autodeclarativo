import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import {StorageService} from '@shared/services/storage/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'igac-autodeclarativolist',
  templateUrl: './autodeclarativolist.component.html',
  styleUrls: ['./autodeclarativolist.component.scss']
})
export class AutodeclarativolistComponent implements OnInit {
  loa: string;
  info: any;
  @Output() esListado:EventEmitter<boolean>;
  constructor(private router: Router, private storageService: StorageService) {
    this.esListado= new EventEmitter();
  }

  onIniciarTramiteNuevo(): void{
  this.esListado.emit(false);
  }

  ngOnInit(): void {
    this.initValues();
    this.loa = this.storageService.getLOA();

    if (this.loa === 'loa:1') {
      this.router.navigateByUrl('@inicio/inicio.module');
    }
  }

  
  initValues(): void {
    this.info = {
      title: 'Registros método autodeclarativo',
      description: '' 
    };

  }
}
