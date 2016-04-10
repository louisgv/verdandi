"use strict";

let doc = require('../modules/ibm/doc');

let FileEvent = {};

module.exports = FileEvent;

function constructProfile(data) {

  let f = [
    {
      "title": "Summary",
      "value": data.summary.join(', '),
      "short": false
    }, {
      "title": "Skills - Syntax",
      "value": data.skills.syntax.join(', '),
      "short": true
    }, {
      "title": "Skills - Framework",
      "value": data.skills.framework.join(', '),
      "short": true
    }, {
      "title": "Skills - Domains",
      "value": data.skills.domains.join(', '),
      "short": true
    }, {
      "title": "Experiences",
      "value": data.experiences.join(', '),
      "short": false
    }, {
      "title": "Contact",
      "value": JSON.stringify(data.contact),
      "short": false
    }
  ];

  let a = [
    {
      'color': '#193bdc',
      'title': data.name,
      'text': data.title,
      "fields": f
    }
  ];

  return {
    'username': 'Verdandi',
    'icon_emoji': ':nerd_face:',
    'text': 'Here\'s what I found in your document :blush:',
    'attachments': a
  }
}

let dp = {
  "name": "Louis Vichy",
  "title": "Maze Walker",
  "summary": [
   "language independent programmer",
   "problem solver",
   "math head",
   "forward thinking entrepreneur",
   "aggressive learner",
   "hands-on mentor",
   "fda-approved dish washer"
 ],
  "skills": {
    "syntax": [
     "c",
     "c#",
     "c++",
     "css",
     "ecma",
     "html",
     "java",
     "python"
   ],
    "framework": [
     "angular",
     "babel",
     "meteor",
     "node",
     "octave",
     "unity",
     "react",
     "qt"
   ],
    "domains": [
     "bot",
     "data",
     "game",
     "productivity",
     "real-time",
     "visualization"
   ]
  },
  "experiences": [
   "1 shipped event engagement app",
   "1 shipped real-time entertainment app",
   "1 ar project",
   "1 health care project",
   "1 fin-tech project",
   "1 ed-tech mvp",
   "2 food projects",
   "2 engineering associate degrees",
   "2 schedule management apps",
   "2 social engagement projects",
   "2 chat bots",
   "2 grid-based resource management game",
   "3 webrtc mvps",
   "3 shipped casual games",
   "3 vr projects (dk1 dk2 vive)",
   "4 ibm watson projects"
 ],
  "contact": {
    "email": "louis@jabsquared.ninja",
    "website": "https://louisgv.github.io"
  },
  "location": {
    "city": "",
    "state": ""
  }
};


FileEvent.show = function (bot, message) {
  bot.reply(message, constructProfile(dp));
};


FileEvent.onShared = function (bot, message) {

  // bot.say({
  //   text: JSON.stringify(message, null, 2),
  //   channel: message.file.ims[0]
  // });

  // bot.api.channels.list({}, (err, response) => {
  //   response.channels.filter((chan) => {return chan.is_member}).map((c) => {
  //     console.log(c);
  //   })
  // })

  let file = message.file;

  if(file.filetype === "pdf" || file.filetype === "docx") {

    doc.processCV(bot.config.token, file.url_private, (docData) => {
      if(docData.warning) {
        bot.say({
          text: `There was some problem with the document, namely:
            > ${docData.warning}
            You might want to submit a PDF instead?`,
          channel: message.file.ims[0]
        })
        return;
      }

      // XXX: Save docData

      bot.say({
        text: constructProfile(docData),
        channel: message.file.ims[0]
      })

    })

  } else if(file.filetype === "png" || file.filetype === "jpg") {

    bot.say({
      text: `Awesome, we can use that for the job listing :)`,
      channel: message.file.ims[0]
    })

  } else {
    bot.say({
      text: `Oops, I can only process PDF or DOCX files for Resume; PNG or JPG for job listing. Please try again :sweat_smile:`,
      channel: message.file.ims[0]
    })
  }

}
