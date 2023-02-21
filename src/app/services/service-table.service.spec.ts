import { TestBed } from '@angular/core/testing';

import { ServiceTableService } from './service-table.service';

describe('ServiceTable', () => {
  let service: ServiceTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
