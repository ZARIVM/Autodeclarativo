import { TestBed } from '@angular/core/testing';

import { AutodeclarativoService } from './autodeclarativo.service';

describe('AutodeclarativoService', () => {
  let service: AutodeclarativoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutodeclarativoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
