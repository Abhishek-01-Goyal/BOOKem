import { TestBed } from '@angular/core/testing';

import { SingerStorageService } from './singer-storage.service';

describe('SingerStorageService', () => {
  let service: SingerStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingerStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
