import { TestBed } from '@angular/core/testing';

import { FormatValidationService } from './format-validation.service';

describe('FormatValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormatValidationService = TestBed.get(FormatValidationService);
    expect(service).toBeTruthy();
  });
});
