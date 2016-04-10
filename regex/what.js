"use strict";

let utils = require('../convas/utils');

let nlc = require('../modulas/ibm/nlc');

let cc = require('../modulas/ibm/concept');

// let ccTest = require('../db/tmp/cc.json');

module.exports = function (controller, mode) {
  controller.hears('what is (.*)', mode, function (bot, message) {

    let subject = message.match[1].replace(/[\W_]+/g, "");

    // let s = ccTest;
    //
    // let r = utils.infoResponse(s.label, s.abstract,s.link, s.thumbnail);
    //
    // bot.reply(message, r);
    //
    // return;

    cc.getConcept(subject, function (respond) {

      // let sr = JSON.stringify(respond, null, 2);
      //
      // console.log(sr);
      let s = respond;

      let r = utils.infoResponse(s.label, s.abstract, s.link, s.thumbnail);

      bot.reply(message, r);
    })

  });
}
