
"use strict";

let Skills = {};

module.exports = Skills;

const Next = require('./experiences');

const Utils = require('../utils');

Skills.ask = function (r, c, m, d, b) {
  if(m.skills) {
    c.ask(Utils.response('What\'re your skills?', 'skills'),
      function (r, c) {
        c.say(Utils.response('You said : ' + r.text));

        Next.ask(r, c, m, d, b);

        c.next();
      });
  } else {
    Next.ask(r, c, m, d, b);
    c.next();
  }
}
