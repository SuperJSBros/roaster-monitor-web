import { TestBed } from '@angular/core/testing';

import { ProbeDailyService } from './probe-daily.service';

describe('ProbeDailyService', () => {
  let service: ProbeDailyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProbeDailyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
