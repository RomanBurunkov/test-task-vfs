const tblName = 'props_types';

exports.up = (knx) => knx.schema.createTable(tblName, (t) => {
  t.increments('id').unsigned().primary(); // Property id.
  t.string('name', 32).notNull(); // Property name, e.g. 'sizeInBytes'.
  t.string('description', 64).notNull(); // Property description, e.g. 'Size in bytes'.
  t.string('value_type', 32).notNull(); // Property value type, e.g. int(eger), string, etc.
  t.unique('name');
});

exports.down = (knex) => knex.schema.dropTable(tblName);
