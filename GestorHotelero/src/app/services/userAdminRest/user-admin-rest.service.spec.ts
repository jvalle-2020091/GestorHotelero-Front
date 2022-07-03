import { TestBed } from '@angular/core/testing';

import { UserAdminRestService } from './user-admin-rest.service';

describe('UserAdminRestService', () => {
  let service: UserAdminRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAdminRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
