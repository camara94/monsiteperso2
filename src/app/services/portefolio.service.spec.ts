import { TestBed, inject } from '@angular/core/testing';

import { PortefolioService } from './portefolio.service';

describe('PortefolioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PortefolioService]
    });
  });

  it('should be created', inject([PortefolioService], (service: PortefolioService) => {
    expect(service).toBeTruthy();
  }));
});
