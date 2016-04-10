"use strict";

exports.suggestion= function (solution) {
  // Awesome. Hint: You can say yes, I want blah ;)
}

exports.apologies = function (lv, convo, solution) {

  switch (lv) {
    case 9:
      // I'm terribly sorry about my incompetent. Please try again in the form of ``
      break;
    default:

  }
}

exports.infoResponse = function (label, text, link, imgSrc) {
  return {
    'username':'Verdandi',
    'icon_emoji': ':nerd_face:',
    attachments: [{
      "title": label,
      "fallback": text,
      "text": text,
      "color": "#36a64f",
      "title_link": link,
      "thumb_url": imgSrc
    }]
  }
}
