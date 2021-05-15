const tblName = 'items_defenitions';

exports.up = (knx) => knx(tblName).insert([
  // Directory props defenition
  { item_type_id: 1, prop_type_id: 1 }, // Directory has 'name' property.
  { item_type_id: 1, prop_type_id: 2 }, // Directory has 'createDate' property.
  { item_type_id: 1, prop_type_id: 3 }, // Directory has 'hasItems' property.
  // File props defenition
  { item_type_id: 2, prop_type_id: 1 }, // File has 'name' property.
  { item_type_id: 2, prop_type_id: 2 }, // File has 'createDate' property.
  { item_type_id: 2, prop_type_id: 4 }, // File has 'sizeInBytes' property.
  // Text file props defenitions
  { item_type_id: 3, prop_type_id: 5 }, // Text file has 'changeDate' property.
  // Image file props defenitions
  { item_type_id: 4, prop_type_id: 6 }, // Image file has 'shootLocation' property.
]);

exports.down = (knx) => knx.raw('TRUNCATE TABLE ??', tblName);
