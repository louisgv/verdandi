"use strict";

let JobPoster = {};

module.exports = JobPoster;

const Utils = require('../utils');

const Skills = require('./skills')

const DataStore = require('../../modules/datastore');

const Profile = require('../profile')

JobPoster.start = function (r, c, b) {
	let requirement = {
		"summary": [],
		"skills": [],
		"experiences": [],
		"contact": {},
		"education": [],
		"location": {}
	}

	Skills.ask(r, c, requirement);

	c.on('end', function (c) {
		if(c.status == 'completed') {
			// Post something funny
			// console.log(c.source_message);

			b.startPrivateConversation({
				user: c.source_message.user
			}, function (response, convo) {
				// convo.say(JSON.stringify(d, null, 2));

        DataStore.searchProfile(requirement).forEach((profile)=>{

          Profile.constructProfileCard(profile, requirement, (p)=>{
            convo.say(p);

            convo.next();
          })
        });
			})

		} else {
			// something happened that caused the conversation to stop prematurely
		}

	});
}
