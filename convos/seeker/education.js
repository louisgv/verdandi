"use strict";

let Education = {};

module.exports = Education;

const Utils = require('../utils');

Education.ask = function (r, c, m, d, b) {
  if(m.education) {
    c.ask(Utils.response('Where did you go to school?', 'edu'),
      function (r, c) {

        c.say(Utils.response('You said : ' + r.text));

        c.next();
      });
  }
}
