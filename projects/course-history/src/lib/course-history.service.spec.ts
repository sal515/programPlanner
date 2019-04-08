import { TestBed } from '@angular/core/testing';

import { CourseHistoryService } from './course-history.service';

describe('CourseHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseHistoryService = TestBed.get(CourseHistoryService);
    expect(service).toBeTruthy();
  });
});
