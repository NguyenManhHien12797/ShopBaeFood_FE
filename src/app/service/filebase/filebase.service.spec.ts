import { TestBed } from '@angular/core/testing';

import { FilebaseService } from './filebase.service';

describe('FilebaseService', () => {
  let service: FilebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
