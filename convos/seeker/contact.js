"use strict";

let Contact = {};

module.exports = Contact;

const Next = require('./location');

const Utils = require('../utils');

let emailRegex = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g;

function askEmail(r, c, m, d, b) {
	c.ask(Utils.response('Would you mind sharing your email with me? (If yes say `My email is ...` :wink: )', 'consent'), [
		{
			pattern: b.utterances.no,
			callback: (r, c) => {

				Next.ask(r, c, m, d, b);

				c.next();
			}
    },
		{
			default: true,
			callback: (r, c) => {
				// just repeat the question
				console.log(r.text);
				let emails = r.text.match(emailRegex);

				if(emails.length > 0) {
					d.contact.email = emails[0];

					Next.ask(r, c, m, d, b);

					c.next();
				} else {
					convo.say("I couldn't find any valid email...")
					convo.silentRepeat();
					c.next();
				}
			}
    }
  ]);
}

Contact.ask = function (r, c, m, d, b) {
	if(m.email) {
		askEmail(r, c, m, d, b)
	} else {
		Next.ask(r, c, m, d, b);
		c.next();
	}
}
