const tblName = 'props_types';

const tblData = [
  {
    id: 1, name: 'name', description: 'Item name', value_type: 'string',
  },
  {
    id: 2, name: 'createDate', description: 'Creation Date', value_type: 'date',
  },
  {
    id: 3, name: 'hasItems', description: 'Has items', value_type: 'bool',
  },
  {
    id: 4, name: 'sizeInBytes', description: 'Item size in bytes', value_type: 'int',
  },
  {
    id: 5, name: 'changeDate', description: 'Change Date', value_type: 'date',
  },
  {
    id: 6, name: 'shootLocation', description: 'Shoot Location', value_type: 'string',
  },
];

exports.up = (knx) => knx(tblName).insert(tblData);
exports.down = (knx) => knx(tblName).whereIn('id', tblData.map((d) => d.id)).del();
