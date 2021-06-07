/**
 * from Konva's repo:
 * https://github.com/konvajs/konva/blob/501c73bf570fe310ad44ad92d9e60f983a5a1559/src/Factory.ts#L8
 */

import capitalize from "./capitalize";

const GET = 'get';
const SET = 'set';

export const addGetter = (constructor, attribute, defaultValue) => {
  const method = GET + capitalize(attribute);

  constructor.prototype[method] =
    constructor.prototype[method] ||
    function () {
      const val = this.attrs[attribute];
      return val === undefined ? defaultValue : val;
    };
};

export const overWriteSetter = (constructor, attribute) => {
  const method = SET + capitalize(attribute);
  constructor.prototype[method] = function (val) {
    this._setAttr(attribute, val);
    return this;
  };
};

export const addSetter = (constructor, attribute) => {
  const method = SET + capitalize(attribute);

  if (!constructor.prototype[method]) {
    overWriteSetter(constructor, attribute);
  }
};

export const addOverloadedGetterSetter = (constructor, attribute) => {
  const capitalizedAttr = capitalize(attribute);
  const setter = SET + capitalizedAttr;
  const getter = GET + capitalizedAttr;

  constructor.prototype[attribute] = function () {
    // setting
    if (arguments.length) {
      this[setter](arguments[0]);
      return this;
    }
    // getting
    return this[getter]();
  };
};

export const addGetterSetter = (constructor, attribute, defaultValue) => {
  addGetter(constructor, attribute, defaultValue);
  addSetter(constructor, attribute);
  addOverloadedGetterSetter(constructor, attribute);
};

export default addGetterSetter;
