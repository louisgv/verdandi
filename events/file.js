"use strict";

const Doc = require('../modules/ibm/doc');

let FileEvent = {};

module.exports = FileEvent;

function capitalizeFirstLetter(string) {
  return string.charAt(0)
    .toUpperCase() + string.slice(1);
}

function constructProfile(data) {

  let skillString = ``;

  for(let skill in data.skills) {
    if(data.skills.hasOwnProperty(skill)) {
      skillString += `. _${capitalizeFirstLetter(skill)}_ : \n\t \`${data.skills[skill].join('\` \`')}\`\n`
    }
  }

  let f = [];

  if (data.summary)
    f.push({
      "value":  `*Summary*
      ${data.summary}`,
      "short": true
    });

  if (skillString)
    f.push({
      "value": `*Skills*\n${skillString}`,
      "short": true
    });

  let ef = [];

  data.experiences.forEach((e)=>{
    ef.push({
      "title": `${e.role} - ${e.time}`,
      "value": `_${e.company} - ${e.location}_
      ${e.summary}`,
      "short": true
    })
  });

  let ed = [];

  data.education.forEach((e)=>{
    ed.push({
      "title": `${e.degree} - ${e.time}`,
      "value": `_${e.school} - ${e.location}_
      ${e.summary}
      *GPA* : ${e.gpa}`,
      "short": true
    })
  })

  let a = [
    {
      "fallback": "Here's what I found in your document",
      'color': '#193bdc',
      "author_name": data.name,
      'author_link': data.contact.website || null,
      "title_link": data.contact.website || null,
      'title': data.title,
      "text": data.contact.email ? `<mailto:${data.contact.email}|${data.contact.email}>`:`` +
        data.location.city?`\n${data.location.city}, ${data.location.state}`: ``,
      "mrkdwn_in": ["text"]
    }, {
      'color': '#F12245',
      "fields": f,
      "mrkdwn_in": ["fields"]
    }
  ];

  if (ef[0]) {
    a.push({
      'title': "Experiences",
      'color': '#CCFC4B',
      "fields": ef,
      "mrkdwn_in": ["fields"]
    })
  }

  if (ed[0]){
    a.push({
      'title': "Education",
      'color': '#0CFF51',
      "fields": ed,
      "mrkdwn_in": ["fields"]
    })
  }

  return {
    'username': 'Verdandi',
    'icon_emoji': ':nerd_face:',
    'text': f[0] ? 'Here\'s what I found in your document :blush:' : "There's nothing in your document... :persevere:",
    'attachments': a
  }
}

let dp = {
  "name": "",
  "title": "",
  "summary": "",
  "skills": {},
  "experiences": [],
  "contact": {},
  "location": {
    "city": "",
    "state": ""
  }
};

FileEvent.show = function (bot, message) {
  bot.reply(message, constructProfile(dp));
};

FileEvent.onShared = function (bot, message) {

  let file = message.file;

  if(file.filetype === "pdf" || file.filetype === "docx") {

    Doc.processCV(bot.config.token, file.url_private, (docData, rawData) => {
      if(docData.warning) {
        bot.say({
          text: `There was some problem with the document, namely:
            > ${docData.warning}
            You might want to submit a PDF instead?`,
          channel: file.ims[0]
        })
        return;
      }

      // XXX: Save docData

      // bot.say({
      //   text: JSON.stringify(rawData, null, 2),
      //   channel: file.ims[0]
      // })

      // bot.say({
      //   text: JSON.stringify(docData, null, 2),
      //   channel: file.ims[0]
      // })

      // console.log(constructProfile(docData));

      bot.startPrivateConversation({
        user: file.user
      }, function(response, convo){

        convo.say(constructProfile(docData))

      })

    })

  } else if(file.filetype === "png" || file.filetype === "jpg") {

    bot.say({
      text: `Awesome, we can use that for the job listing :)`,
      channel: message.file.ims[0]
    })

    // bot.api.channels.list({}, (err, response) => {
    //   response.channels.filter((chan) => {return chan.is_member}).map((c) => {
    //     console.log(c);
    //   })
    // })

  } else {
    bot.say({
      text: `Oops, I can only process PDF or DOCX files for Resume; PNG or JPG for job listing. Please try again :sweat_smile:`,
      channel: message.file.ims[0]
    })
  }

}
