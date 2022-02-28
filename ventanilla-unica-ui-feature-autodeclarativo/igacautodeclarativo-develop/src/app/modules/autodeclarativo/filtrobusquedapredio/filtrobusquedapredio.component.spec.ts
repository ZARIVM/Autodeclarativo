import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrobusquedapredioComponent } from './filtrobusquedapredio.component';

describe('FiltrobusquedapredioComponent', () => {
  let component: FiltrobusquedapredioComponent;
  let fixture: ComponentFixture<FiltrobusquedapredioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrobusquedapredioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrobusquedapredioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
