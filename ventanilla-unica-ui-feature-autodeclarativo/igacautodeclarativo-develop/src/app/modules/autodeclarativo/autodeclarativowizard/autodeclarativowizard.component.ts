import { Component, OnInit } from '@angular/core';
import { StorageService } from '@shared/services/storage/storage.service';
import { Router } from '@angular/router';
import { AutoDeclarativoModel } from '../models/autodeclarativoModel';

@Component({
  selector: 'igac-autodeclarativowizard',
  templateUrl: './autodeclarativowizard.component.html',
  styleUrls: ['./autodeclarativowizard.component.scss'],
})
export class AutodeclarativowizardComponent implements OnInit {
  loa: string;
  info: any;
  wizstep: number;
  constructor(private router: Router, private storageService: StorageService) {}

  objAutodeclarativo: AutoDeclarativoModel = null;

  nextPage({page, body}): void {
    this.wizstep = page;
    this.objAutodeclarativo = body;
  }

  nextPageLink(page): void {
    if (this.objAutodeclarativo !== null && page <= this.objAutodeclarativo.lastPage && page !== this.wizstep){
      this.wizstep = page;
    }
  }

  ngOnInit(): void {
    this.initValues();
    this.loa = this.storageService.getLOA();

    // if (this.loa === 'loa:1') {
    //   this.router.navigateByUrl('@inicio/inicio.module');
    // }
  }

  initValues(): void {
    this.wizstep = 1;
    this.info = {
      title: 'Detalle del predio',
      description: '',
    };
  }
  
}
