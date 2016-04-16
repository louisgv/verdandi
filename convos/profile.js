"use strict";

let Profile = {};
module.exports = Profile;

const Utils = require('./utils');

const DataStore = require('../modules/datastore');

let dp = require('../db/tmp/requirement.json');

function capitalizeFirstLetter(string) {
	return string.charAt(0)
		.toUpperCase() + string.slice(1);
}

function constructProfileCard(data, requirement, callback) {
	let f = [];

	if(data.summary.length > 0) {
		f.push({
			"value": `*Summary*
    ${data.summary}`,
			"short": true
		});
	}

	if(Object.keys(data.skills)
		.length > 0 && requirement.skills.length > 0) {
		let skillString = ``;
		for(let skill in data.skills) {
			if(data.skills.hasOwnProperty(skill)) {
				skillString += `. _${capitalizeFirstLetter(skill)}_ : \n\t \`${data.skills[skill].join('\` \`')}\`\n`
      }
    }

    f.push({
        "value": `*Skills*\n${skillString}`,
        "short": true
    })
  }


  let a = [{
    "fallback": "Another one",
    'color': '#193bdc',
    "author_name": data.name,
    'author_link': data.contact.website || null,
    "title_link": data.contact.website || null,
    'title': data.title,
    "text": data.contact.email ? `<mailto:${data.contact.email}|${data.contact.email}>`:`` +
      data.location.city?`\n${data.location.city}, ${data.location.state}`: ``,
    "mrkdwn_in": ["text"]
  }];

  if (f[0]){
    a.push({
      'color': '#F12245',
      "fields": f,
      "mrkdwn_in": ["fields"]
    })
  }

  if (data.experiences.length > 0 && requirement.experiences.length > 0){
  let ef = [];
  data.experiences.forEach((e)=>{
    ef.push({
      "title": `${e.role} - ${e.time}`,
      "value": `_${e.company} - ${e.location}_
      ${e.summary}`,
      "short": true
    })
  });

    if (ef[0]) {
      a.push({
        'title': "Experiences",
        'color': '#CCFC4B',
        "fields": ef,
        "mrkdwn_in": ["fields"]
      })
    }
  }

  if(data.education.length > 0 && requirement.education.length > 0){
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
  if (ed[0])
    a.push({
      'title': "Education",
      'color': '#0CFF51',
      "fields": ed,
      "mrkdwn_in": ["fields"]
    })
  }

  let profileResponse = {
    'username': 'Verdandi',
    'icon_emoji': ':nerd_face:',
    'text': f[0] ? 'Here\'s another profile :laughing:' : "There's nothing in your document... :persevere:",
    'attachments': a
  };

  callback (profileResponse);
}

Profile.constructProfileCard = constructProfileCard;

Profile.testFilter = function (bot, message) {

	// bot.reply(message, JSON.stringify(dp, null, 2));

	bot.startPrivateConversation({
		user: message.user
	}, function (response, convo) {

    DataStore.searchProfile(dp).forEach((profile)=>{

      constructProfileCard(profile, dp, (p)=>{
        convo.say(p);

        convo.next();
      })
    });
  })
};

Profile.newProfile = function (bot, message) {

}

Profile.list = function (response, convo) {
  DataStore.listProfiles().forEach((profile)=>{

    constructProfileCard(profile, dp, function (profileMsg) {

      convo.say(profileMsg);

      convo.next();
    })
  })
}
