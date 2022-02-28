import {Component, OnInit} from '@angular/core';
import {StorageService} from '@shared/services/storage/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'igac-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {
  loa: string;
  constructor(private router: Router, private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.loa = this.storageService.getLOA();

    if (this.loa === 'loa:1') {
      this.router.navigateByUrl('@inicio/inicio.module');
    }
  }
}
