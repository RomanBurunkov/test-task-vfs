import { ConfigService } from '@nestjs/config';
import { Injectable, Dependencies, Logger } from '@nestjs/common';
import { DbService } from '../db/db.service';
import PropertyType from '../file.system/propertytype';
import ItemType from '../file.system/itemtype';

import { createMap, parseNumbersString } from '../utils';

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

  async getPropertiesTypes() {
    this.logger.log('Loading properties types...');
    const types = await this.knex('props_types').select();
    const result = types
      .filter((t) => PropertyType.validate(t))
      .map((t) => new PropertyType(t));
    this.logger.log('Properties types have been loaded.');
    return result;
  }

  async getItemTypes() {
    this.logger.log('Loading items types...');
    const propsTypes = await this.getPropertiesTypes();
    const propTypeIds = this.knex.raw('group_concat(prop_type_id) AS prop_type_ids');
    const types = await this.knex('items_types AS IT')
      .join('items_defenitions AS ID', 'IT.id', '=', 'ID.item_type_id')
      .select('id', 'name', 'description', 'ancestor_id', propTypeIds)
      .groupBy('IT.id')
      .orderBy('IT.ancestor_id');
    const propsMap = createMap(types, 'id', (t) => parseNumbersString(t.prop_type_ids));
    const result = types
      .filter((t) => ItemType.validate(t))
      .map((t) => new ItemType(t, propsMap, propsTypes));
    this.logger.log('Items types have been loaded.');
    return result;
  }
}
