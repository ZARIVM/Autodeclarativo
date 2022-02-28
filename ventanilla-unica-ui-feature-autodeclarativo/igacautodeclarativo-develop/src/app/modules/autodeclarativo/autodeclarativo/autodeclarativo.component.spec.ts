import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutodeclarativoComponent } from './autodeclarativo.component';

describe('ServiciosComponent', () => {
  let component: AutodeclarativoComponent;
  let fixture: ComponentFixture<AutodeclarativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutodeclarativoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutodeclarativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
