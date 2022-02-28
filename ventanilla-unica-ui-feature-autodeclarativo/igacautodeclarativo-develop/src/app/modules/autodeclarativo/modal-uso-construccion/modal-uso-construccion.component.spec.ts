import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUsoConstruccionComponent } from './modal-uso-construccion.component';

describe('ModalUsoConstruccionComponent', () => {
  let component: ModalUsoConstruccionComponent;
  let fixture: ComponentFixture<ModalUsoConstruccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUsoConstruccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUsoConstruccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
