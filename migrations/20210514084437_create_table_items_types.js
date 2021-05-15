const tblName = 'items_types';

exports.up = (knx) => knx.schema.createTable(tblName, (t) => {
  t.increments('id').unsigned().primary(); // Item type id.
  t.string('name', 32).notNull(); // Item type name, e.g. directory, file, etc.
  t.string('description', 64).notNull(); // Item type description.
  t.integer('ancestor_id').notNull().default(0); // Item could inherit from others(file -> text).
  t.unique('name');
});

exports.down = (knx) => knx.schema.dropTable(tblName);
