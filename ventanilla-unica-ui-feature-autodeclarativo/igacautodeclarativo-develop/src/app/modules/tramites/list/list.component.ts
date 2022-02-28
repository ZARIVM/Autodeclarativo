import { Component, OnInit } from '@angular/core';
import {StorageService} from '@shared/services/storage/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'igac-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
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
