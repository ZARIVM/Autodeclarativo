import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclyautComponent } from './declyaut.component';

describe('ServiciosComponent', () => {
  let component: DeclyautComponent;
  let fixture: ComponentFixture<DeclyautComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclyautComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclyautComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
