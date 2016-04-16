"use strict";

let knp = [
  "mVHFRNU3q_k",
  "xn6roGifN_Y",
  "st21dIMaGMs",
  "kH6QJzmLYtw",
  "VDEuS5wIk5Q",
  "naleynXS7yo",
  "UHyoDV1fsA4",
  "dkHqPFbxmOU"
]

let yoga = [
  "khDyWeZGb4w",
  "Sc7uRkH-Rzo",
  "ASfEk8se90U",
  "DRJi2g1iwRs",
  "buFmbvg4zjQ",
  "3q0altyqePM",
  "Onr5x8hjVFE"
]

let quotes = [
	{
		q: "Imagination is more important than knowledge.",
		a: "Albert Einstein"
	},
	{
		q: "If music be the food of love, play on.",
		a: "Shakespeare"
	},
	{
		q: "The way to get started is to quit talking and begin doing.",
		a: "Walt Disney"
	},
	{
		q: "Obstacles are those frightful things you see when you take your eyes off the goal.",
		a: "Henry Ford"
	},
	{
		q: "I skate where the puck is going to be, not where it has been.",
		a: "Wayne Gretzky"
	},
	{
		q: "When you come to a fork in the road, take it.",
		a: "Yogi Berra"
	},
	{
		q: "We may affirm absolutely that nothing great in the world has been accomplished without passion.",
		a: "Hegel"
	},
	{
		q: "The life which is unexamined is not worth living.",
		a: "Socrates"
	},
	{
		q: "We may affirm absolutely that nothing great in the world has been accomplished without passion.",
		a: "Hegel"
	},
	{
		q: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
		a: "M.K.Gandhi"
	},
	{
		q: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
		a: "Zig Ziglar"
	}
]

exports.meme = {
  anotherOne : function () {
    return {
      'username': 'Verdandi - Anotha1',
  		'text': `Come back for more :peace_symbol:
      https://www.youtube.com/watch?v=Jo-0ytcEXKg`,
  		'icon_emoji': ':laughing:',
    }
  }
}

exports.randomQuote = function () {
	let quote = quotes[Math.floor(Math.random() * quotes.length)];

	return {
		'username': 'Verdandi - Quote',
		'text': `>>>*${quote.q}*
      _${quote.a}_`,
		'icon_emoji': ':blush:',
    "mrkdwn": true
	}
}


// bot.api.channels.list({}, (err, response) => {
//   response.channels.filter((chan) => {return chan.is_member}).map((c) => {
//     console.log(c);
//   })
// })

exports.randomYoga = function () {

	let v = yoga[Math.floor(Math.random() * yoga.length)];

	return {
		'username': 'Verdandi - Yoga',
		'text': `Let's do some yoga shall we? :peace_symbol:
    https://www.youtube.com/watch?v=${v}`,
		'icon_emoji': ':blush:'
	}
}

exports.randomKnP = function () {

	let v = knp[Math.floor(Math.random() * knp.length)];

	return {
		'username': 'Verdandi - Fun',
		'text': `In the meantime, you might enjoy this video :laughing:
    https://www.youtube.com/watch?v=${v}`,
		'icon_emoji': ':joy:',
	}
}

exports.suggestion = function (solution) {
	// Awesome. Hint: You can say yes, I want blah ;)
}

exports.apologies = function (lv, convo, solution) {

	switch(lv) {
	case 9:
		// I'm terribly sorry about my incompetent. Please try again in the form of ``
		break;
	default:

	}
}


exports.response = function (text, nameAddOn) {
	return {
		'username': 'Verdandi ' + (nameAddOn || ''),
		'text': text,
		'icon_emoji': ':innocent:'
	}
}

exports.infoResponse = function (label, text, link, imgSrc) {

	return {
		'username': 'Verdandi',
		'text': 'I hope this comes in handy :blush:',
		'icon_emoji': ':nerd_face:',
		'attachments': [{
			"title": label,
			"fallback": text,
			"text": text,
			"color": "#36a64f",
			"title_link": link,
			"thumb_url": imgSrc
    }]
	}
}

exports.shuffleArray = function (array) {
	for(let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}
