import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutodeclarativolistComponent } from './autodeclarativolist.component';

describe('ServiciosComponent', () => {
  let component: AutodeclarativolistComponent;
  let fixture: ComponentFixture<AutodeclarativolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutodeclarativolistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutodeclarativolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
