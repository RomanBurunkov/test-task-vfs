import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { VfsModule } from './vfs/vfs.module';

@Module({
  imports: [DbModule, VfsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
