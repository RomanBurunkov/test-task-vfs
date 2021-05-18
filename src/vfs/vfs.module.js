import { Module } from '@nestjs/common';
import { VfsService } from './vfs.service';
import { VfsController } from './vfs.controller';

@Module({
  exports: [VfsService],
  providers: [VfsService],
  controllers: [VfsController],
})
export class VfsModule {}
