import { TestBed, inject } from '@angular/core/testing';

import { AproposService } from './apropos.service';

describe('AproposService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AproposService]
    });
  });

  it('should be created', inject([AproposService], (service: AproposService) => {
    expect(service).toBeTruthy();
  }));
});
