import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutodeclarativopredioComponent } from './autodeclarativopredio.component';

describe('AutodeclarativopredioComponent', () => {
  let component: AutodeclarativopredioComponent;
  let fixture: ComponentFixture<AutodeclarativopredioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutodeclarativopredioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutodeclarativopredioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
