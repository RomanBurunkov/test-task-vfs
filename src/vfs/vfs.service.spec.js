import { Test } from '@nestjs/testing';
import { VfsService } from './vfs.service';

describe('VfsService', () => {
  let service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [VfsService],
    }).compile();

    service = module.get(VfsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
