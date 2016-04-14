"use strict";

let Experiences = {};

module.exports = Experiences;

const Next = require('./education');

const Utils = require('../utils');

Experiences.ask = function (r, c, m, d, b) {
  if(m.experience) {
    c.ask(Utils.response('Would you mind sharing your experience with me?', 'exp'),
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
