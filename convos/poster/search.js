"use strict";

let Search = {};

module.exports = Search;

const Utils = require('../utils');

Search.addMoreFilter = function (r,c,d,b) {
  c.say(Utils.response("Would you like to further filter the list?"))
  c.next()
}

Search.response = function (r, c, d, b) {
  c.say(Utils.response("I know of 3 people who would fit the bill :blush:"))
  c.next()
}
