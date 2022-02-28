import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutodeclarativoInfoContacComponent } from './autodeclarativo-info-contac.component';

describe('AutodeclarativoInfoContacComponent', () => {
  let component: AutodeclarativoInfoContacComponent;
  let fixture: ComponentFixture<AutodeclarativoInfoContacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutodeclarativoInfoContacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutodeclarativoInfoContacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
