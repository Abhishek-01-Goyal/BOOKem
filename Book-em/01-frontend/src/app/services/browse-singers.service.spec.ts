import { TestBed } from '@angular/core/testing';

import { BrowseSingersService } from './browse-singers.service';

describe('BrowseSingersService', () => {
  let service: BrowseSingersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowseSingersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
