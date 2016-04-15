"use strict";

module.exports = function (controller) {

  // Handle events related to the websocket connection to Slack
  controller.on('team_join', function (bot) {

    console.log(bot);
    // HACK: To tweak the intro

    bot.startPrivateConversation({
      user: bot.user.id
    }, require('../convos/intro'));
  });
}
