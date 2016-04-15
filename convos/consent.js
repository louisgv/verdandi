"use strict";

let Consent = {};

module.exports = Consent;

const Utils = require('./utils');

const NLC = require('../modules/ibm/nlc');

const nlcID = "f15e67x54-nlc-4250";

function decline(r, c, cb) {
	c.sayFirst(Utils.response('I respect your decision :wink: Let\'s move on!'))
	cb(false);
	c.next();
}

function allow(r, c, cb) {
	cb(true);
	c.next();
}

Consent.ask = function (r, c, b, cb) {
	c.ask(Utils.response('Would you like to share that information with me? :blush:', 'consent'), [
		{
			pattern: b.utterances.no,
			callback: (r, c) => {
				decline(r, c, cb)
			}
  	}, {
			pattern: b.utterances.yes,
			callback: (r, c) => {
				allow(r, c, cb)
			}
    }, {
			default: true,
			callback: (r, c) => {
				NLC.getClasses(r.text, nlcID, function (classData) {
					switch(classData.top_class) {
					case 'decline':
						decline(r, c, cb);
						break;
					case 'allow':
						allow(r, c, cb);
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
