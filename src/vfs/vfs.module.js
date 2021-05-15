import { Module } from '@nestjs/common';
import { VfsService } from './vfs.service';
import { VfsController } from './vfs.controller';

@Module({
  providers: [VfsService],
  controllers: [VfsController],
})
export class VfsModule {}
