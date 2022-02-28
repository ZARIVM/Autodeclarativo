import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutodeclarativolegComponent } from './autodeclarativoleg.component';

describe('ServiciosComponent', () => {
  let component: AutodeclarativolegComponent;
  let fixture: ComponentFixture<AutodeclarativolegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutodeclarativolegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutodeclarativolegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
