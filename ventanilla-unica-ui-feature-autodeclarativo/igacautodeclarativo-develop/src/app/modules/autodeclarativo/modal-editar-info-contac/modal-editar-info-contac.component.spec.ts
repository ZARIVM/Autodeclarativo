import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarInfoContacComponent } from './modal-editar-info-contac.component';

describe('ModalEditarInfoContacComponent', () => {
  let component: ModalEditarInfoContacComponent;
  let fixture: ComponentFixture<ModalEditarInfoContacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarInfoContacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarInfoContacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
