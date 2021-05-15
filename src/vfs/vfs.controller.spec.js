import { Test } from '@nestjs/testing';
import { VfsController } from './vfs.controller';

describe('Vfs Controller', () => {
  let controller;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [VfsController],
    }).compile();

    controller = module.get(VfsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
