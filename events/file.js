"use strict";

const Doc = require('../modules/ibm/doc');

const Utils = require('../convos/utils');

const FileConvos = require('../convos/file');

const JobSeeker = require('../convos/seeker');

let FileEvent = {};

module.exports = FileEvent;

let dp = require('../data/fullCV.json');

FileEvent.show = function (bot, message) {

	// bot.reply(message, JSON.stringify(dp, null, 2));
	let newDP = Object.assign({}, dp);

	newDP.skills = {};

	bot.startPrivateConversation({
		user: message.user
	}, function (response, convo) {

		FileConvos.constructProfile(newDP, (profileResponse, missingFields) => {
			// convo.say(profileResponse);

			if(Object.keys(missingFields)
				.length > 0) {
				console.log(missingFields);
				JobSeeker.start(response, convo, missingFields, newDP, bot);
			}
		})
	})

};

FileEvent.onShared = function (bot, message) {

	let file = message.file;

	if(file.filetype === "pdf" || file.filetype === "docx") {

		Doc.processCV(bot.config.token, file.url_private, (docData, rawData) => {
			if(docData.warning) {
				bot.say({
					text: `There was some problem with the document, namely:
            > ${docData.warning}
             I can only read CV of this format at the : https://github.com/louisgv/verdandi/raw/master/data/fullCV.docx :sweat_smile:`,
					channel: file.ims[0]
				})
				return;
			}

			// XXX: Save docData

			// bot.say({
			//   text: JSON.stringify(rawData, null, 2),
			//   channel: file.ims[0]
			// })

			// bot.say({
			//   text: JSON.stringify(docData, null, 2),
			//   channel: file.ims[0]
			// })
			//
			// return;

			// console.log(constructProfile(docData));

			bot.startPrivateConversation({
				user: file.user
			}, function (response, convo) {

				FileConvos.constructProfile(docData, (profileResponse, missingFields) => {
					// convo.say(profileResponse);

					JobSeeker.start(response, convo, missingFields, docData, bot);
				})
			})
		})
	} else if(file.filetype === "png" || file.filetype === "jpg") {

		bot.say({
			text: `Awesome, we can use that for the job listing :)`,
			channel: message.file.ims[0]
		})

		// bot.api.channels.list({}, (err, response) => {
		//   response.channels.filter((chan) => {return chan.is_member}).map((c) => {
		//     console.log(c);
		//   })
		// })

	} else {
		bot.say({
			text: `Oops, I can only process PDF or DOCX files for Resume; PNG or JPG for job listing. Please try again :sweat_smile:`,
			channel: message.file.ims[0]
		})
	}

}
