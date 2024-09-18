import { TestBed } from '@angular/core/testing';

import { AllSingersService } from './all-singers.service';

describe('AllSingersService', () => {
  let service: AllSingersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllSingersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
