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
    'icon_emoji': ':blush:',
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
