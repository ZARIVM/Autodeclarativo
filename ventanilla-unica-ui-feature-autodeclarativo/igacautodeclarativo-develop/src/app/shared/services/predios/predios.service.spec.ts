import { TestBed } from '@angular/core/testing';

import { PrediosService } from './predios.service';

describe('PrediosService', () => {
  let service: PrediosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrediosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
