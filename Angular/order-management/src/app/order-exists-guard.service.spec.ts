import { TestBed } from '@angular/core/testing';

import { OrderExistsGuardService } from './order-exists-guard.service';

describe('OrderExistsGuardService', () => {
  let service: OrderExistsGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderExistsGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
