"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// 主流程控制
const apply = (action, ...args) => {
  // babel-env
  require(`./${action}`)(...args);
};

exports.default = apply;