'use strict';

let Yoga = {};

module.exports = Yoga;

const Utils = require('./utils');

function pomodoroShortBreak(b, sm, sessionDuration) {
	b.startPrivateConversation({
		user: sm.user
	}, (response, convo) => {
		convo.say(Utils.response("It's time for a short break!"))

		convo.say(Utils.randomYoga());

    convo.next()

		setTimeout(() => {
			b.startPrivateConversation({
				user: sm.user
			}, (response, convo) => {
				convo.say(Utils.response(`It's time for another ${sessionDuration} minutes working session!`));

				convo.say(Utils.response(sessionDuration.toString()));

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
		}, 9 * 63 * 999);
    // }, 5000);
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
}

Yoga.start = function (r, convo, b) {

	convo.ask(Utils.response("How long would you like to work? (in minutes for now please :sweat_smile:)"), (r, convo) => {
		let sessionDuration = parseInt(r.text);

		convo.say(Utils.response(`Let's start our ${sessionDuration} minutes working session!`));

		convo.next();

		convo.say(Utils.response(sessionDuration.toString()));

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
