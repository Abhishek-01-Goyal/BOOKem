import { TestBed } from '@angular/core/testing';

import { SingerProfileService } from './singer-profile.service';

describe('SingerProfileService', () => {
  let service: SingerProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingerProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
