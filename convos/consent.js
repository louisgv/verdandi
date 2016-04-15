"use strict";

let Consent = {};

module.exports = Consent;

const Utils = require('./utils');

const NLC = require('../modules/ibm/nlc');

const nlcID = "f15e67x54-nlc-4250";

Consent.ask = function (r, c, b, cb) {
	c.ask(Utils.response('Would you like to share that information with me? :blush:', 'consent'), [
		{
			pattern: b.utterances.no,
			callback: (r, c) => {
				c.say(Utils.response('I respect your decision :wink: Let\'s move on!'))
				cb(false);
				c.next();
			}
          }, {
			pattern: b.utterances.yes,
			callback: (r, c) => {
				cb(true);
				c.next();
			}
          }, {
			default: true,
			callback: (r, c) => {
				// just repeat the question
				NLC.getClasses(r.text, nlcID, function (classData) {
					switch(classData.top_class) {
					case 'decline':
						c.say(Utils.response('I respect your decision :wink: Let\'s move on!'))
						cb(false);
						break;
					case 'allow':
						cb(true);
						c.next();
						break;
					default:
						c.repeat();
						c.next();
						break;
					}
				})
			}
        }
    ]);
}
