import { TestBed } from '@angular/core/testing';

import { CarTableDataServiceService } from './car-table-data-service.service';

describe('CarTableDataServiceService', () => {
  let service: CarTableDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarTableDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
