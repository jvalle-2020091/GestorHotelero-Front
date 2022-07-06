import { TestBed } from '@angular/core/testing';

import { ServicesRestService } from './services-rest.service';

describe('ServicesRestService', () => {
  let service: ServicesRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
