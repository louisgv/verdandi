"use strict";

module.exports = function (controller) {

  // Handle events related to the websocket connection to Slack
  controller.on('rtm_open', function (bot) {
    console.log('** The RTM api just connected!');
    bot.startPrivateConversation({
      user: bot.config.createdBy
    }, require('../convos/intro'));
  });

  controller.on('rtm_close', function (bot) {
    console.log('** The RTM api just closed');
    // you may want to attempt to re-open
    bot.startRTM(function (err) {
      console.log("Reconnected!");
    });
  });

}
