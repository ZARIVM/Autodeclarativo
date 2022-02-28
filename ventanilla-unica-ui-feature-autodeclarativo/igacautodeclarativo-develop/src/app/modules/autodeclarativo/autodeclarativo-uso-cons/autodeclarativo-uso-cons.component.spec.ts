import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutodeclarativoUsoConsComponent } from './autodeclarativo-uso-cons.component';

describe('AutodeclarativoUsoConsComponent', () => {
  let component: AutodeclarativoUsoConsComponent;
  let fixture: ComponentFixture<AutodeclarativoUsoConsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutodeclarativoUsoConsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutodeclarativoUsoConsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
