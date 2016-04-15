'use strict';

let FileController = {};

module.exports = FileController;

function capitalizeFirstLetter(string) {
  return string.charAt(0)
    .toUpperCase() + string.slice(1);
}

FileController.constructProfile = function (data, callback) {

    let missingFields = {
      location: true
    };

    let f = [];

    if(data.summary.length > 0) {
      f.push({
        "value": `*Summary*
      ${data.summary}`,
        "short": true
      });
    } else {
      missingFields.summary = true;
    }

    if(Object.keys(data.skills)
      .length > 0) {
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
  } else {
    missingFields.skills = true;
  }

  if (!data.contact.email) {
    missingFields.email = true;
  }

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
    }
  ];

  if (f[0]){
    a.push({
      'color': '#F12245',
      "fields": f,
      "mrkdwn_in": ["fields"]
    })
  }

  if (data.experiences.length > 0){
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
  } else {
    missingFields.experiences = true;
  }

  if(data.education.length > 0){
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
  } else {
    missingFields.education = true;
  }

  let profileResponse = {
    'username': 'Verdandi',
    'icon_emoji': ':nerd_face:',
    'text': f[0] ? 'Here\'s what I found in your document :blush:' : "There's nothing in your document... :persevere:",
    'attachments': a
  };

  callback(profileResponse, missingFields)
}
