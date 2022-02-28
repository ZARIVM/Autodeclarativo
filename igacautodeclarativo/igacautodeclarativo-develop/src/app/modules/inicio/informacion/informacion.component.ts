import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {StorageService} from '@shared/services/storage/storage.service';

@Component({
  selector: 'igac-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {
  loa: string;
  
  constructor(private router: Router, private storageService: StorageService) {
    
  }

  ngOnInit(): void {
    this.loa = this.storageService.getLOA();
  }

  irTramites(){
    this.router.navigateByUrl('@tramites/tramites.module');
  }

  irPredios(){
    this.router.navigateByUrl('@predios/predios.module');
  }

}
