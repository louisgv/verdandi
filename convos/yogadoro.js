'use strict';

let Yoga = {};

module.exports = Yoga;

const Utils = require('./utils');

function pomodoroResume(b, sm, sessionDuration) {
	b.startPrivateConversation({
		user: sm.user
	}, (response, convo) => {
		convo.ask(Utils.response(`Would you like to continue with another ${sessionDuration} minutes session?`), [
			{
				pattern: b.utterances.no,
				callback: (r, convo) => {
					convo.say(Utils.response("Great job! You worked really hard! :blush:"));
          convo.say(Utils.meme.anotherOne());
					convo.next();
				}
    	}, {
				pattern: b.utterances.yes,
				callback: (r, convo) => {
					convo.say(Utils.response(`Another one!`));
					convo.say(Utils.response(sessionDuration.toString()));
          convo.next();

					setTimeout(() => {
						b.api.im.history({
							channel: sm.channel,
							count: 1
						}, (err, response) => {
							let ts = response.messages[0].ts;
							pomodoroCountdown(b, sm, ts, sessionDuration);
						})
					}, 2000);
				}
      }, {
				default: true,
				callback: (r, c) => {
					convo.repeat();
					convo.next();
				}
      }
    ])
	})
}

function pomodoroShortBreak(b, sm, sessionDuration) {
	b.startPrivateConversation({
		user: sm.user
	}, (response, convo) => {
		convo.say(Utils.response("It's time for a short break!"))

		convo.say(Utils.randomYoga());

		// convo.next();

		setTimeout(() => {
			pomodoroResume(b, sm, sessionDuration);
		// }, 5000);
  }, 9 * 63 * 999);
	})
}

function pomodoroCountdown(b, sm, ts, sessionDuration) {
	let timeLeft = sessionDuration;
	let interval = setInterval(() => {
		b.api.chat.update({
			channel: sm.channel,
			ts: ts,
			text: timeLeft--,
			as_user: true
		}, function (err) {
			if(err) {
				console.log(err)
			}
			if(timeLeft < 0) {
				clearInterval(interval);
				pomodoroShortBreak(b, sm, sessionDuration);
			}
		})
	}, 60 * 1000)
  // }, 1000)
}

Yoga.start = function (r, convo, b) {

	convo.ask(Utils.response("How long would you like to work? (in minutes for now please :sweat_smile:)"), (r, convo) => {
		let sessionDuration = parseInt(r.text);

		convo.say(Utils.response(`Let's start our ${sessionDuration} minutes working session!`));

		convo.say(Utils.response(sessionDuration.toString()));

    convo.next();

		let sm = convo.source_message;

		setTimeout(() => {
			b.api.im.history({
				channel: sm.channel,
				count: 1
			}, (err, response) => {
				let ts = response.messages[0].ts;
				pomodoroCountdown(b, sm, ts, sessionDuration);
			})
		}, 2000);

	})
}
