"use strict";

const Botkit = require('botkit');

let slackKey = require('../modules/credential')
  .auth.slack;

// just a simple way to make sure we don't
// connect to the RTM twice for the same team
let _bots = {};

function trackBot(bot) {
  _bots[bot.config.token] = bot;
}

function initDirectMessage(controller) {

  controller.on('create_bot', function (bot, config) {
    if(_bots[bot.config.token]) {
      // already online! do nothing.
    } else {
      bot.startRTM((err) => {
        if(!err) {
          trackBot(bot);
        }
        bot.startPrivateConversation({
          user: bot.config.createdBy
        }, require('../convos/intro'));
      });
    }
  });
}

function connectToAllTeams(controller) {
  controller.storage.teams.all(function (err, teams) {
    if(err) {
      throw new Error(err);
    }

    // connect all teams with bots up to slack!
    for(let t in teams) {
      if(teams[t].bot) {
        controller.spawn(teams[t])
          .startRTM(function (err, bot) {
            if(err) {
              console.log('Error connecting bot to Slack:', err);
            } else {
              trackBot(bot);
            }
          });
      }
    }
  });
}

exports.connectToAllTeams = connectToAllTeams;

function setupWebserver(controller, port) {
  controller.setupWebserver(port, function (err, webserver) {
    controller.createWebhookEndpoints(controller.webserver);

    controller.createOauthEndpoints(controller.webserver, function (err, req, res) {
      if(err) {
        res.status(500)
          .send('ERROR: ' + err);
      } else {
        res.send('Success!');
      }
    });
  });
}

module.exports = function (port) {

  let controller = Botkit.slackbot({
      json_file_store: './db/bot/',
    })
    .configureSlackApp({
      clientId: slackKey.clientId,
      clientSecret: slackKey.clientSecret,
      scopes: ['bot'],
    });

  setupWebserver(controller, port);

  connectToAllTeams(controller);

  initDirectMessage(controller);

  return controller;
}
