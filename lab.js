"use strict";

const PORT = process.env.VCAP_APP_PORT || 9000;

let controller = require('./events/init')(PORT);

require('./events/rtm')(controller);

// REGEX

let Help = require('./convos/help');

controller.hears("^help$", ["ambient", "direct_mention", "direct_message"], Help.show);


// Receiving CV

let FileEvent = require('./events/file');

controller.hears("^file$", ["ambient", "direct_mention", "direct_message"], FileEvent.show);

let Utils = require('./convos/utils');

controller.hears("^fun$", ["ambient", "direct_mention", "direct_message"], function (bot, message) {
  bot.reply(message, Utils.randomKnP());
});

controller.on('file_shared', FileEvent.onShared);

// EVAS

let nlc = require('./modules/ibm/nlc');

controller.on(["ambient", "mention", "direct_mention"], function (bot, message) {
  bot.api.reactions.add({
    timestamp: message.ts,
    channel: message.channel,
    name: 'robot_face',
  }, function (err) {
    if(err) {
      console.log(err)
    }

    nlc.getClasses(message.text, function (classData) {
      bot.startPrivateConversation({
        user: message.user
      }, function (response, convo) {
        convo.say(JSON.stringify(classData, null, 2));
      })
    })
  });
});
