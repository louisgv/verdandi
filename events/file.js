"use strict";

const Doc = require('../modules/ibm/doc');

const Utils = require('../convos/utils');

const DataStore = require('../modules/datastore');

const FileConvos = require('../convos/file');

const JobSeeker = require('../convos/jseeker');

let FileEvent = {};

module.exports = FileEvent;

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
      }, function (response, convo) {

        FileConvos.constructProfile(docData, (profileResponse, missingFields) => {
          convo.say(profileResponse);

          if(Object.keys(missingFields)
            .length > 0) {
            console.log(missingFields);
            JobSeeker.start(response, convo, missingFields, docData, bot);
          }
        })
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
