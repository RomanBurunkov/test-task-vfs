import { ConfigService } from '@nestjs/config';
import { Injectable, Dependencies, Logger } from '@nestjs/common';
import { DbService } from '../db/db.service';

@Injectable()
@Dependencies(ConfigService, DbService)
export class VfsService {
  constructor(configService, dbService) {
    this.knex = dbService.knex;
    this.logger = new Logger(this.constructor.name);
    this.configService = configService;
  }

  /**
   * Get application version.
   * @returns {string} App version.
   */
   getVersion() {
    return this.configService.get('version');
  }
}
