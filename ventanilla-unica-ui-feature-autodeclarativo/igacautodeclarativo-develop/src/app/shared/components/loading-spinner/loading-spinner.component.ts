import {Component, OnInit} from '@angular/core';
import {LoadingService} from '@shared/services/loading/loading.service';

@Component({
  selector: 'igac-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

  show: boolean;

  constructor(
    private loadingService: LoadingService
  ) {
  }

  ngOnInit(): void {
    this.initValues();
  }

  initValues(): void {
    this.loadingService.loading$.subscribe(value => {
      this.show = value;
    });
  }
}
