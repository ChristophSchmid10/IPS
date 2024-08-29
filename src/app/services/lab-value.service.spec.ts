import { TestBed } from '@angular/core/testing';

import { LabValueService } from './lab-value.service';

describe('LabValueService', () => {
  let service: LabValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
