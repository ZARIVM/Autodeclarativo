import { Component, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalDireccionesComponent } from '../modal-direcciones/modal-direcciones.component';

@Component({
  selector: 'app-modal-container',
  template: '',
})
export class ModalContainerComponent implements OnDestroy {
  destroy = new Subject<any>();
  currentDialog: any;

  constructor(
    private modalService: NgbModal,
    route: ActivatedRoute,
    router: Router
  ) {
    route.params.pipe(takeUntil(this.destroy)).subscribe((params) => {
      this.currentDialog = this.modalService.open(ModalDireccionesComponent, {
        centered: true,
      });
      this.currentDialog.componentInstance.idPredio = params.id;

      this.currentDialog.result.then(
        (result: any) => {
          router.navigateByUrl('/');
          console.log(result);
        },
        (reason: any) => {
          router.navigateByUrl('/');
          console.log(reason);
        }
      );
    });
  }

  ngOnDestroy() {
    this.destroy.next();
  }
}
