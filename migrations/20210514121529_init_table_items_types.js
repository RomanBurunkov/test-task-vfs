const tblName = 'items_types';
const tblData = [
  {
    id: 1, name: 'directory', description: 'Directory', ancestor_id: 0,
  },
  {
    id: 2, name: 'file', description: 'File', ancestor_id: 0,
  },
  {
    id: 3, name: 'text', description: 'Text file', ancestor_id: 1,
  },
  {
    id: 4, name: 'image', description: 'Picture file', ancestor_id: 1,
  },
];

exports.up = (knx) => knx(tblName).insert(tblData);
exports.down = (knx) => knx(tblName).whereIn('id', tblData.map((d) => d.id)).del();
