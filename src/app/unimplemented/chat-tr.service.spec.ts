import { TestBed } from '@angular/core/testing';

import { ChatTRService } from './chat-tr.service';

describe('ChatTRService', () => {
  let service: ChatTRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatTRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
