import { TestBed } from '@angular/core/testing';

import { BranchTableService } from './branch-table.service';

describe('BranchTableService', () => {
  let service: BranchTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
