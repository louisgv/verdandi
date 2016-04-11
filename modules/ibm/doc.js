"use strict";

let watson = require('watson-developer-cloud');

let secret = require('../credential')
  .auth.doc;

let request = require('request')

let document_conversion = watson.document_conversion({
  username: secret.username,
  password: secret.password,
  version: 'v1',
  version_date: '2015-12-01'
});

function digestProfile(au) {
  let seeker = {
    name: "",
    title: "",
    summary: [],
    skills: {},
    experiences: [],
    education: [],
    contact: {},
    location: {
      city: "",
      state: ""
    }
  };

  au.forEach((unit) => {

    let t = unit.content[0].text;

    switch(unit.title.toLowerCase()) {
    case 'summary':
      seeker.summary = t;
      break;
    case 'skills':
      t.split(/\s*\.\s*/)
        .forEach((item) => {
          if(item) {
            let sc = item.toLowerCase()
              .split(/\s*\:\s*/);
            seeker.skills[sc[0]] = sc[1].split(/\s*\,\s*/);
          }
        });
      break;
    case 'experiences':
      t.split('---')
        .forEach((e) => {
          let ed = e.split(/\s*\,\s*/);
          let edg = ed[2].split(/\s*\-\s*/);
          seeker.experiences.push({
            role: ed[0],
            time: ed[1],
            company: edg[0],
            location: edg[1],
            summary: ed[3]
          });
        })
      break;
    case 'contact':
      t.toLowerCase()
        .split(/\s*\,\s*/)
        .forEach((item) => {
          if(item) {
            let sc = item.split(" : ", 2);
            seeker.contact[sc[0]] = sc[1];
          }
        });
      break;
    case 'education':
      t.split('---')
        .forEach((e) => {
          let ed = e.split(/\s*\,\s*/);
          let edg = ed[2].split(/\s*\-\s*/);
          let edgp = ed[3].split("GPA:");
          seeker.education.push({
            degree: ed[0],
            time: ed[1],
            school: edg[0],
            location: edg[1],
            summary: edgp[0],
            gpa: parseFloat(edgp[1])
          });
        })
      break;
    default:
      if(unit.title.match(/^[a-zA-Z ]+$/)) {
        seeker.name = unit.title;
        seeker.title = unit.content[0].text;
      }
    }
  });

  return seeker;
}

exports.processCV = function (token, docURI, callback) {

  // convert a single document
  document_conversion.convert({
    // (JSON) ANSWER_UNITS, NORMALIZED_HTML, or NORMALIZED_TEXT
    file: request({
      url: docURI,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }),
    conversion_target: document_conversion.conversion_target.ANSWER_UNITS,
    // Add custom configuration properties or omit for defaults
    word: {
      // heading: {
      //   fonts: [
      //     {
      //       level: 1,
      //       min_size: 24
      //     },
      //     {
      //       level: 2,
      //       min_size: 16,
      //       max_size: 24
      //     }
      //   ]
      // }
    }
  }, function (err, docData) {
    if(err) {
      console.error(err);
    } else {
      if(docData.warning) {
        return callback(docData);
      }
      // callback(docData);
      callback(digestProfile(docData.answer_units), docData);
    }
  });
}
