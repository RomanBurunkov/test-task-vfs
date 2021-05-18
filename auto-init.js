const fs = require('fs').promises;
const path = require('path');
const Knex = require('knex');
const dirTree = require('directory-tree');
const { isObject, isEmpty } = require('tm-is');
const { v4: uuidv4, NIL: UUID_NIL } = require('uuid');

const PropertyType = require('./src/file.system/propertytype');
const ItemType = require('./src/file.system/itemtype');

const client = 'mysql';
const connection = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'vfs',
};

const knex = Knex({ client, connection });

let itemTypes = [];
let propsTypes = [];

const initPath = process.env.INIT_PATH || __dirname;
const storagePath = process.env.STORAGE_PATH || path.join(__dirname, 'vfs-storage');

const splitAndParse = (str) => str.split(',').map(s => parseInt(s, 10));

const createItemsTypesPropMap = (itmTypes) => itmTypes.reduce((res, itmType) => {
  res[itmType.id] = splitAndParse(itmType.prop_type_ids);
  return res;
}, {});

const getFileTypeNameByExtension = (ext) => {
  switch(ext.replace('.', '')) {
    case 'txt': return 'text';
    case 'jpg':
    case 'png': return 'image';
    default: return 'file';
  }
};

async function getPropsTypes() {
  const types = await knex('props_types').select();
  const result = types
    .filter(t => PropertyType.validate(t))
    .map(t => new PropertyType(t));
  console.log('Got properties types', result);
  return result;
}

async function getItemTypes() {
  const propTypeIds = knex.raw('group_concat(prop_type_id) AS prop_type_ids');
  const types = await knex('items_types AS IT')
    .join('items_defenitions AS ID', 'IT.id', '=', 'ID.item_type_id')
    .select('id', 'name', 'description', 'ancestor_id', propTypeIds)
    .groupBy('IT.id')
    .orderBy('IT.ancestor_id');
  const propsMap = createItemsTypesPropMap(types);
  console.log('Property types map', propsMap);
  const result = types
    .filter(t => ItemType.validate(t))
    .map(t => new ItemType(t, propsMap, propsTypes));
  console.log('Got item types', result);
  return result;
}

async function processDirectory(dir, parent) {
  if (!isObject(dir)) return;
  const uuid = uuidv4();
  await knex('items').insert({ uuid, type_id: 1, parent_uuid: parent })
  // Set item props.
  const props = {
    name: dir.name,
    createDate: new Date(),
    hasItems: dir.children.length ? 1 : 0,
  }
  const itmType = itemTypes.find((it) => it.name === 'directory')
  if (itmType) {
    await Promise.all(itmType.propTypes.map((it) => !isEmpty(props[it.name])
      ? knex('items_props').insert({ item_uuid: uuid, prop_type_id: it.id, value: props[it.name] })
      : Promise.resolve()
    ));
  }
  return uuid;
}

async function processFile(file, parent) {
  if (!isObject(file)) return;
  console.log('Processing file', file);
  const uuid = uuidv4();
  await knex('items').insert({ uuid, type_id: 2, parent_uuid: parent })
  // Set item props.
  const props = {
    name: file.name,
    createDate: new Date(),
    sizeInBytes: file.size,
    changeDate: new Date(),
    shootLocation: 'Somewhere in Saint P.',
  };
  const itmTypeName = getFileTypeNameByExtension(file.extension);
  const itmType = itemTypes.find((it) => it.name === itmTypeName);
  if (itmType) {
    await Promise.all(itmType.propTypes.map((it) => !isEmpty(props[it.name])
      ? knex('items_props').insert({ item_uuid: uuid, prop_type_id: it.id, value: props[it.name] })
      : Promise.resolve()
    ));
  }
  await fs.copyFile(file.path, path.join(storagePath, uuid));
  return uuid;
}

async function processItem(item, parent, deep = 1) {
  if (!isObject(item)) return;
  if (item.type === 'directory') {
    const uuid = deep === 1
      ? UUID_NIL
      : await processDirectory(item, parent);
    await Promise.all(item.children.map(child => processItem(child, uuid, deep + 1)));
  } else if (item.type === 'file') {
    await processFile(item, parent);
  }
}

async function prepare() {
  await knex('items_props').del();
  await knex('items').del();
  await fs.mkdir(storagePath, { recursive: true })
}

async function main() {
  await prepare();
  const tree = dirTree(initPath);
  console.log('Scanned files tree', tree);
  propsTypes = await getPropsTypes();
  itemTypes = await getItemTypes();
  
  await processItem(tree);
}

main().catch(console.log).then(process.exit); // eslint-disable-line no-console