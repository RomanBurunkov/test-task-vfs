const { NIL_UUID } = require('uuid'); // The nil UUID '00000000-0000-0000-0000-000000000000'.

const tblName = 'items';

exports.up = (knx) => knx.schema.createTable(tblName, (t) => {
  t.uuid('uuid').notNull().primary();
  t.integer('type_id').unsigned().notNull();
  t.uuid('parent_uuid').notNull().default(NIL_UUID);
  t.unique('uuid');
  t.foreign('type_id').references('items_types.id');
});

exports.down = (knx) => knx.schema.dropTable(tblName);
