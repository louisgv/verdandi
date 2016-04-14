"use strict";

let Summary = {};

module.exports = Summary;

const Next = require('./skills');

const Utils = require('../utils');

Summary.ask = function (r, c, m, d, b) {
  if(m.summary) {
    c.ask(Utils.response('How would you describe yourself?', 'summary'),
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
