import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditinfoyecoComponent } from './modal-editinfoyeco.component';

describe('ModalEditinfoyecoComponent', () => {
  let component: ModalEditinfoyecoComponent;
  let fixture: ComponentFixture<ModalEditinfoyecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditinfoyecoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditinfoyecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
