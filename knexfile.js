const dotenv = require('dotenv');
dotenv.config();

const database = process.env.DB_NAME || 'vfs';

const client = 'mysql';

const connection = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database,
};

const migrations = { tableName: 'knex_migrations' };

module.exports = {
  development: {
    client,
    connection,
    migrations,
  },
  production: {
    client,
    connection,
    migrations,
    pool: { min: 2, max: 10 },
  },
};
