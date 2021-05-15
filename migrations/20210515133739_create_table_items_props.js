const tblName = 'items_props';

exports.up = (knx) => knx.schema.createTable(tblName, (t) => {
  t.uuid('item_uuid').notNull();
  t.integer('prop_type_id').unsigned().notNull();
  t.string('value').notNull().default('');
  t.unique(['item_uuid', 'prop_type_id']);
  t.foreign('item_uuid').references('items.uuid');
  t.foreign('prop_type_id').references('props_types.id');
});

exports.down = (knx) => knx.schema.dropTable(tblName);
