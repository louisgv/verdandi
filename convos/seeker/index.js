"use strict";

let JobSeeker = {};
module.exports = JobSeeker;

const Utils = require('../utils');

const Contact = require('./contact')

const DataStore = require('../../modules/datastore');

/**
  TODO:
    + Asking for missing time-line. Concatting timeline from each category
    + Ask for info consent with
*/


JobSeeker.start = function (r, c, m, d, b) {

	if(Object.keys(m)
		.length > 0) {
		Contact.ask(r, c, m, d, b);
	}

	c.on('end', function (c) {
		if(c.status == 'completed') {
			// Post something funny
			// console.log(c.source_message);



			b.startPrivateConversation({
				user: c.source_message.user
			}, function (response, convo) {
				// convo.say(JSON.stringify(d, null, 2));

				DataStore.storeProfile(d);

				convo.say(Utils.response("Awesome! :laughing: I will be spreading the world about you :blush:"));

				convo.say(Utils.randomKnP());
			})

		} else {
			// something happened that caused the conversation to stop prematurely
		}

	});
}

/*
  Sample:
u: {
  Hey abelios!
}

p: {
  I'm ready whenever you are boss
}

{
  I'm looking for a [nodejs developer]
  I'm looking for a [sale specialist]
  I need a [projec manager]
  I need a [technican]
}
  -> Run throught NLC to determine if this is a {poster} or a {seeker}

  --> Get the next dialog from (DIALOG)

P:
  {
    Do you care about this [$title] education?
    How many year of expertise you this [$title] have?
  }

p: {

AWESOME, it has been posed to the job channel!
}
*/
