import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjuntarDocumentacionComponent } from './adjuntar-documentacion.component';

describe('AdjuntarDocumentacionComponent', () => {
  let component: AdjuntarDocumentacionComponent;
  let fixture: ComponentFixture<AdjuntarDocumentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdjuntarDocumentacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjuntarDocumentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
