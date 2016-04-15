'use strict';

let What = {};

module.exports = What;

const Utils = require('./utils');

const CC = require('../modules/ibm/concept');

What.answer = function (message, convo) {
	console.log("ANSWERING...");
	console.log(message);
	let text = message.split(" ")
		.pop()
		.replace(/[\W_]+/g, " ");

	console.log(text);

	CC.getConcept(text, function (respond) {

		let s = respond;
		console.log(respond);

    let r = s ? Utils.infoResponse(s.label, s.abstract, s.link, s.thumbnail) : Utils.response('I could not find anything regarding ' + text);

    convo.say(r);
	})
}
