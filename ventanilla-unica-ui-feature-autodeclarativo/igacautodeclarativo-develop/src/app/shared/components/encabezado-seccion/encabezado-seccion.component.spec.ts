import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoSeccionComponent } from './encabezado-seccion.component';

describe('EncabezadoSeccionComponent', () => {
  let component: EncabezadoSeccionComponent;
  let fixture: ComponentFixture<EncabezadoSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncabezadoSeccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncabezadoSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
