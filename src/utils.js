const { isFunc, isEmpty } = require('tm-is');

/**
 * Parse string like '1,2,3,4,5' to an array of numbers.
 * @param {string} str Input string(e.g. '1,2,3,4,5').
 * @returns {Array} Array with ids.
 */
exports.parseNumbersString = (str) => (isEmpty(str) || typeof str !== 'string'
  ? []
  : str.split(',').map((s) => parseInt(s, 10))
);

/**
 * Create a hash map from the array of object to quick access by key.
 * @param {Array} items Items array.
 * @param {string|number} key Key name for map.
 * @returns
 */
exports.createMap = (items, key, cb) => items.reduce((res, itm) => {
  res[itm[key]] = isFunc(cb) ? cb(itm) : itm;
  return res;
}, {});
