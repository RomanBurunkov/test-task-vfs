const { isObject, isEmpty } = require('tm-is');

const ITEM_KEYS = ['id', 'name', 'description'];
const ITEM_EXTRA_KEYS = ['ancestor_id', 'prop_type_ids'];

module.exports = class ItemType {
  /**
   * @constructor
   * @param {Object} data Item data.
   * @param {Object} propsMap Props hash to quick add ancestors props.
   */
  constructor(data, propsMap, propTypes) {
    if (!this.constructor.validate(data)) {
      throw new Error('Item data is not valid!');
    }
    ITEM_KEYS.forEach((k) => { this[k] = data[k]; });
    // Init item prorerties types ids
    this.propTypeIds = data.prop_type_ids.split(',')
      .map((id) => parseInt(id, 10));
    if (data.ancestor_id > 0 && isObject(propsMap) && propsMap[data.ancestor_id]) {
      this.propTypeIds = [...propsMap[data.ancestor_id], ...this.propTypeIds];
    }
    this.propTypeIds.sort();
    // Init item proprerties types.
    this.propTypes = [];
    this.propTypeIds.forEach((propTypeId) => {
      const prop = propTypes.find((propType) => propType.id === propTypeId);
      if (!isEmpty(prop)) {
        this.propTypes.push(prop);
      }
    });
  }

  static validate(data) {
    return isObject(data)
      ? [...ITEM_KEYS, ...ITEM_EXTRA_KEYS].every((k) => !isEmpty(data[k]))
      : false;
  }
};
