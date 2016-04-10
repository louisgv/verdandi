"use strict";

let utils = require('./utils');

let help = require('./help')

module.exports = function (err, convo) {
  if(err) {
    console.log(err);
  } else {

    let wiki = {
      'username': 'Verdandi',
      'icon_emoji': ':innocent:',
      'text': 'Hello, I am Verdandi, the goddess who governs the present',
      attachments: [{
        "title" : "My wikipedia link :blush:",
        "fallback": 'Hello, I am Verdandi, the goddess who governs the present',
        "text": 'In Norse mythology, Verðandi, sometimes anglicized as Verdandi or Verthandi, is one of the norns. Along with Urðr (Old Norse \"fate\"[2]) and Skuld (possibly \"debt\" or \"future\"[3]), Verðandi makes up a trio of Norns that are described as deciding the fates (wyrd) of people.',
        "color": "#66D0D9",
        "title_link": "https://en.wikipedia.org/wiki/Ver%C3%B0andi",
        "thumb_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Nornir_by_Lund.jpg/220px-Nornir_by_Lund.jpg"
      }]
    }
    convo.say(wiki);

    convo.say(help.commandList);
  }
}
