import { Injectable, Dependencies } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Knex from 'knex';

const KNEX = Symbol('knex');
const CONFIG = Symbol('db configuration');
const CONF_SERVICE = Symbol('Configuration service');

@Injectable()
@Dependencies(ConfigService)
export class DbService {
  constructor(configService) {
    this[CONF_SERVICE] = configService;
    this[CONFIG] = this[CONF_SERVICE].get('database');
    this[KNEX] = Knex(this.getConfiguration());
  }

  /**
   * Returns db network connection settings.
   * @returns {Object} db connection settings object.
   */
  getNetworkConnSettings() {
    return {
      host: this[CONFIG].host,
      port: this[CONFIG].port,
      user: this[CONFIG].user,
      password: this[CONFIG].password,
      database: this[CONFIG].database,
      dateStrings: true,
    };
  }

  /**
   * Returns db IPC(Unix Socket) connection settings.
   * @returns {Object} db connection settings object.
   */
  getIpcConnSettings() {
    return {
      user: this[CONFIG].user,
      password: this[CONFIG].password,
      database: this[CONFIG].database,
      socketPath: this[CONFIG].socketPath,
      dateStrings: true,
    };
  }

  /**
   * Prepares and returns db connection settings.
   * @returns {Object} KNEX db client settings.
   */
  getConfiguration() {
    return {
      client: this[CONFIG].client,
      connection: this[CONFIG].connectionType === 'network'
        ? this.getNetworkConnSettings()
        : this.getIpcConnSettings(),
    };
  }

  get knex() {
    return this[KNEX];
  }
}
