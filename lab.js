"use strict";

const PORT = process.env.VCAP_APP_PORT || 9000;

let controller = require('./events/init').start(PORT);

require('./events/rtm')(controller);

const Utils = require('./convos/utils');

require('./regex/what')(controller, ["ambient", "direct_mention", "direct_message"]);

const DataStore = require('./modules/datastore');

controller.hears("^fun$", ["ambient", "direct_mention", "direct_message"],
  function (bot, message) {
    bot.reply(message, Utils.randomKnP());
  });

const JobSeeker = require('./convos/seeker');

const JobPoster = require('./convos/jposter');

controller.hears("^find candidate$", ["ambient", "direct_mention", "direct_message"],
  function (bot, message) {

    bot.reply(message, Utils.randomKnP());

  });

controller.hears("^find job$", ["ambient", "direct_mention", "direct_message"],
  function (bot, message) {

    bot.reply(message, Utils.randomKnP());

  });



// REGEX

const Help = require('./convos/help');

controller.hears("^help$", ["ambient", "direct_mention", "direct_message"], Help.show);

// Receiving CV

const FileEvent = require('./events/file');

// controller.hears("^file$", ["ambient", "direct_mention", "direct_message"],
//   FileEvent.show);

controller.on('file_shared', FileEvent.onShared);

// EVAS

const NLC = require('./modules/ibm/nlc');

const nlcID = "f15e67x54-nlc-4251";

controller.on(["ambient", "mention", "direct_mention"],
  function (bot, message) {
    bot.api.reactions.add({
      timestamp: message.ts,
      channel: message.channel,
      name: 'angel',
    }, function (err) {
      if(err) {
        console.log(err)
      }

      NLC.getClasses(message.text, nlcID, function (classData) {
        bot.startPrivateConversation({
          user: message.user
        }, function (response, convo) {
          convo.say(JSON.stringify(classData, null, 2));
        })
      })
    });
  });
