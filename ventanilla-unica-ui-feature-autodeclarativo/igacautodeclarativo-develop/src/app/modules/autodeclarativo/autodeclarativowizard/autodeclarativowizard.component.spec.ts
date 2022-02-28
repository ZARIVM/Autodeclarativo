import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutodeclarativowizardComponent } from './autodeclarativowizard.component';

describe('ServiciosComponent', () => {
  let component: AutodeclarativowizardComponent;
  let fixture: ComponentFixture<AutodeclarativowizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutodeclarativowizardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutodeclarativowizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
