"use strict";

let Location = {};

module.exports = Location;

const Next = require('./summary');

const Utils = require('../utils');

Location.ask = function (r, c, m, d, b) {
  if(m.summary) {
    c.ask(Utils.response('Where are you located?', 'location'),
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
