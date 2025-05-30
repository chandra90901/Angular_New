import { TestBed } from '@angular/core/testing';

import { SenderServices } from './sender.service';

describe('HooksService', () => {
  let service: SenderServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SenderServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
