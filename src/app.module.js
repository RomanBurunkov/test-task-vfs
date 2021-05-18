import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DbModule } from './db/db.module';
import { VfsModule } from './vfs/vfs.module';

@Module({
  imports: [
    ConfigModule.forRoot(configuration()),
    DbModule,
    VfsModule,
  ],
})
export class AppModule {}
