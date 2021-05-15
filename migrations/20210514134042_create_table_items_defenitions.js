const tblName = 'items_defenitions';

exports.up = (knx) => knx.schema.createTable(tblName, (t) => {
  t.integer('item_type_id').unsigned().notNull();
  t.integer('prop_type_id').unsigned().notNull();
  t.unique(['item_type_id', 'prop_type_id']);
  t.foreign('item_type_id').references('items_types.id');
  t.foreign('prop_type_id').references('props_types.id');
});

exports.down = (knx) => knx.schema.dropTable(tblName);
