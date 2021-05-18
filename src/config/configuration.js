import { version } from '../../package.json';

/**
 * Prepares db configuration to pass it into conf serivce.
 * @returns {Object} db configuration.
 */
const dbCnf = () => ({
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    user: process.env.DB_USER || 'root',
    client: process.env.DB_CLIENT || 'mysql',
    password: process.env.DB_PASSWORD || 'qwerty',
    database: process.env.DB_NAME || 'vfs',
    socketPath: process.env.DB_SOCK_PATH || '/var/run/mysqld/mysqld.sock',
    connectionType: process.env.DB_CONN_TYPE || 'ipc',
  },
});

/**
 * Prepares app configuration to pass it into conf serivce.
 * @returns {Object} basic app configuration.
 */
const appCnf = () => ({
  env: process.env.NODE_ENV || 'production',
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT, 10) || 3000,
  proxy: parseInt(process.env.PROXY, 10) || 0, // 0 means proxy is not using.
  secret: process.env.SECRET || 'VFS Test Task 2021',
  version,
});

/**
 * @returns {Object} Nest Configuration Service options.
 */
export default () => ({ load: [appCnf, dbCnf], cache: true, isGlobal: true });
