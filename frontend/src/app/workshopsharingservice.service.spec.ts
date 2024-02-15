import { TestBed } from '@angular/core/testing';

import { WorkshopsharingserviceService } from './services/workshopsharingservice.service';

describe('WorkshopsharingserviceService', () => {
  let service: WorkshopsharingserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkshopsharingserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
