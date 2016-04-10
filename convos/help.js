'use strict';

let HelpController = {};

let commandList = {
  'username': 'Verdandi',
  'icon_emoji': ':innocent:',
  'text': 'Here\'re examples of what I could help you with :blush:',
  'attachments': [
    {
      'color': '#193bdc',
      'title': 'If you are looking for talents:',
      "fields": [{
        "title": "help",
        "value": "show this Help",
        "short": true
                }, {
        "title": "post",
        "value": "start a job posting",
        "short": true
                }]
    },
    {
      'color': '#bbc6f4',
      'title': 'If you are looking for opportunity:',
      "fields": [{
        "title": "I'm looking for a job",
        "value": "start posting a question",
        "short": true
                }, {
        "title": "tags",
        "value": "Looking for a gig",
        "short": true
                }]
    }
  ]
};

HelpController.commandList = commandList;

HelpController.show = function (bot, message) {
  bot.reply(message, commandList);
};

HelpController.status = function (bot, message) {
  let out = "APP_ENV_FILE: " + process.env.APP_ENV_FILE;
  bot.reply(message, out);
};


module.exports = HelpController;
