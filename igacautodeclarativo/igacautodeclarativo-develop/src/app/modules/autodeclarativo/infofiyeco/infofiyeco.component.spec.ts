import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfofiyecoComponent } from './infofiyeco.component';

describe('InfofiyecoComponent', () => {
  let component: InfofiyecoComponent;
  let fixture: ComponentFixture<InfofiyecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfofiyecoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfofiyecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
