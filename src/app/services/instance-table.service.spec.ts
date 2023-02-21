import { TestBed } from '@angular/core/testing';

import { InstanceTableService } from './instance-table.service';

describe('BranchTableService', () => {
  let service: InstanceTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstanceTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
