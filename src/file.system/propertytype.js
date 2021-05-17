const { isObject, isEmpty } = require('tm-is');

const PROP_KEYS = ['id', 'name', 'description', 'value_type'];

module.exports = class PropertyType {
  /**
   * @constructor
   * @param {Object} data Property data.
   */
  constructor(data) {
    if (!this.constructor.validate(data)) {
      throw new Error('Property data in not valid!');
    }
    PROP_KEYS.forEach((k) => { this[k] = data[k]; });
  }

  static validate(data) {
    return isObject(data)
      ? PROP_KEYS.every((k) => !isEmpty(data[k]))
      : false;
  }

  static typeCasting(type, val) {
    switch (type) {
      case 'int':
      case 'integer': return parseInt(val, 10);
      case 'bool':
      case 'boolean': return !!val;
      case 'date': return new Date(val);
      default: return val;
    }
  }
};
