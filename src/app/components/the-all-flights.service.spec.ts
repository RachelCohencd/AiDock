import { TestBed, inject } from '@angular/core/testing';

import { TheAllFlightsService } from './the-all-flights.service';

describe('TheAllFlightsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TheAllFlightsService]
    });
  });

  it('should be created', inject([TheAllFlightsService], (service: TheAllFlightsService) => {
    expect(service).toBeTruthy();
  }));
});
