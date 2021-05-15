const Knex = require('knex');

const createQuery = 'CREATE DATABASE IF NOT EXISTS ?? CHARACTER SET utf8 COLLATE utf8_general_ci';

// You can dynamically pass the database name
// as a command-line argument,
// or obtain it from a .env file
const database = process.env.DB_NAME || 'vfs';

const client = 'mysql';
const connection = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
};

async function main() {
  let knex = Knex({ client, connection });
  // Lets create our database if it does not exist
  await knex.raw(createQuery, database);
  // Now that our database is known, let's create another knex object
  // with database name specified so that we can run our migrations.
  knex = Knex({
    client,
    connection: { ...connection, database },
  });
  // Now we can happily run our migrations
  await knex.migrate.latest();
}

main().catch(console.log).then(process.exit); // eslint-disable-line no-console
