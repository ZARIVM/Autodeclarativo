import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoviewerComponent } from './geoviewer.component';

describe('GeoviewerComponent', () => {
  let component: GeoviewerComponent;
  let fixture: ComponentFixture<GeoviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoviewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
