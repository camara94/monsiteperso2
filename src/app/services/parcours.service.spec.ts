import { TestBed, inject } from '@angular/core/testing';

import { ParcoursService } from './parcours.service';

describe('ParcoursService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParcoursService]
    });
  });

  it('should be created', inject([ParcoursService], (service: ParcoursService) => {
    expect(service).toBeTruthy();
  }));
});
