import { TestBed } from '@angular/core/testing';

import { IdeaViewService } from './idea-view.service';

describe('IdeaViewService', () => {
  let service: IdeaViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdeaViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
