"use strict";

const PORT = process.env.VCAP_APP_PORT || 9000;

let controller = require('./events/init')
	.start(PORT);

require('./events/rtm')(controller);

const Utils = require('./convos/utils');

const DataStore = require('./modules/datastore');

controller.hears("^fun$", ["ambient", "direct_mention", "direct_message"],
	function (bot, message) {
		bot.reply(message, Utils.randomKnP());
	});

const JobSeeker = require('./convos/seeker');

const JobPoster = require('./convos/poster');

controller.hears("^search profile$", ["ambient", "direct_mention", "direct_message"],
	function (bot, message) {
		bot.startPrivateConversation({
			user: message.user
		}, function (response, convo) {

			Profile.list(response, convo);
		})
	});

controller.hears("^post job$", ["ambient", "direct_mention", "direct_message"],
	function (bot, message) {

		bot.reply(message, Utils.randomKnP());

	});


controller.hears("^search job$", ["ambient", "direct_mention", "direct_message"],
	function (bot, message) {

		bot.reply(message, Utils.randomKnP());

	});

controller.hears("^post profile$", ["ambient", "direct_mention", "direct_message"],
	function (bot, message) {

		bot.reply(message, Utils.randomKnP());

	});

controller.hears("^yogadoro$", ["ambient", "direct_mention", "direct_message"],
	function (bot, message) {

		bot.reply(message, Utils.randomYoga());

	});


// REGEX

const Help = require('./convos/help');

controller.hears("^help$", ["ambient", "direct_mention", "direct_message"], Help.show);

// Receiving CV

const FileEvent = require('./events/file');

controller.hears("^file$", ["ambient", "direct_mention", "direct_message"],
	FileEvent.show
);

controller.on('file_shared', FileEvent.onShared);

// EVAS

const What = require('./convos/what');

const Profile = require('./convos/profile');

const NLC = require('./modules/ibm/nlc');

// f15e67x54-nlc-4662

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
					switch(classData.top_class) {
					case 'post_job':

						break;
					case 'search_job':

						break;
					case 'post_profile':

						break;
					case 'search_profile':
						Profile.list(response, convo);
						break;
					case 'yogadoro':
						convo.say(Utils.randomYoga());
						break;
					case 'what':
						What.answer(message.text, convo);
						break;
					case 'knp':
						convo.say(Utils.randomKnP());
						break;
					case 'help':
					default:
						convo.say(Utils.response("How may I help you?"));
						convo.say(Help.commandList);
						break;
					}
				})

				// bot.startPrivateConversation({
				// 	user: message.user
				// }, function (response, convo) {
				// 	convo.say(JSON.stringify(classData, null, 2));
				// })
			})
		});
	});
