'use strict';

let HelpController = {};

module.exports = HelpController;

let commandList = {
	'username': 'Verdandi',
	'icon_emoji': ':innocent:',
	'text': 'Here\'re examples of what I can do :blush:',
	'attachments': [
		{
			'color': '#193bdc',
			'title': 'Seeking talents?',
      'mrkdwn_in': ["fields"],
			"fields": [{
				"title": ". Job Listing",
				"value": "`I have a gig`,`I have a job for someone`",
				"short": true
                }, {
				"title": ". Profile Searching",
				"value": "`I need a programmer`, `Looking for talent`",
				"short": true
                }]
    },
		{
			'color': '#bbc6f4',
			'title': 'Looking for work?',
      'mrkdwn_in': ["fields"],
			"fields": [{
				"title": ". Job Searching",
				"value": "`Looking for a programming role`,`I need a job`",
				"short": true
                }, {
				"title": ". Profile Listing",
				"value": "Just upload your CV file to me! (The `+` button)",
				"short": true
                }]
    },
		{
			'color': '#193bdc',
			'title': 'I can also do the following:',
      'mrkdwn_in': ["fields"],
			"fields": [{
				"title": ". Start a Pomodoro Session!",
				"value": "`I need to focus`, `Help me concentrate!`",
				"short": true
      }, {
				"title": ". Show something fun!",
				"value": "`I\'m bored`, `Entertain me!`, `I need a good laugh`",
				"short": true
      }, {
				"title": ". Repeat this message",
				"value": "`I need some help`, `What can you do`",
				"short": true
      }]
    },
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
