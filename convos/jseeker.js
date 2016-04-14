"use strict";

let JobSeeker = {};

const Utils = require('./utils');

module.exports = JobSeeker;

let emailRegex = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g;


/**
  TODO:
    + Asking for missing time-line. Concatting timeline from each category
*/

function askContacts(r, c, m, d, b) {
  if(m.email) {
    c.ask(Utils.response('Would you mind sharing your email with me? (If yes say `My email is ...` :wink: )', 'contact'), [
      {
        pattern: b.utterances.no,
        callback: (r, c) => {
          askSummary(r, c, m, d, b);
          c.next();
        }
      },
      {
        default: true,
        callback: (r, c) => {
          // just repeat the question
          console.log(r.text);
          let emails = r.text.match(emailRegex);

          if(emails.length > 0) {
            d.contact.email = emails[0];
            askSummary(r, c, m, d, b);
            c.next();
          } else {
            convo.say("I couldn't find any valid email...")
            convo.silentRepeat();
            c.next();
          }
        }
      }
    ]);
  } else {
    askSummary(r, c, m, d, b);
    c.next();
  }
}

function askSummary(r, c, m, d, b) {
  if(m.summary) {
    c.ask(Utils.response('How would you describe yourself?', 'summary'),
      function (r, c) {
        c.say(Utils.response('You said : ' + r.text));

        askSkills(r, c, m, d, b);
      });
  } else {
    askSkills(r, c, m, d, b);
  }
  c.next();
}

function askSkills(r, c, m, d, b) {
  if(m.skills) {
    c.ask(Utils.response('What\'re your skills?', 'skills'),
      function (r, c) {
        c.say(Utils.response('You said : ' + r.text));

        askExperiences(r, c, m, d, b);
      });
  } else {
    askExperiences(r, c, m, d, b);
  }
  c.next();
}

function askExperiences(r, c, m, d, b) {
  if(m.experience) {
    c.ask(Utils.response('Would you mind sharing your experience with me?', 'exp'),
      function (r, c) {
        c.say(Utils.response('You said : ' + r.text));

        askEducation(r, c, m, d, b);
      });
  } else {
    askEducation(r, c, m, d, b);
  }
  c.next();
}

function askEducation(r, c, m, d, b) {
  if(m.education) {
    c.ask(Utils.response('Where did you go to school?', 'edu'),
      function (r, c) {

        c.say(Utils.response('You said : ' + r.text));

        c.next();
      });
  }
}

JobSeeker.start = function (r, c, m, d, b) {
  askContacts(r, c, m, d, b);
}

/*
  Sample:
u: {
  Hey abelios!
}

p: {
  I'm ready whenever you are boss
}

{
  I'm looking for a [nodejs developer]
  I'm looking for a [sale specialist]
  I need a [projec manager]
  I need a [technican]
}
  -> Run throught NLC to determine if this is a {poster} or a {seeker}

  --> Get the next dialog from (DIALOG)

P:
  {
    Do you care about this [$title] education?
    How many year of expertise you this [$title] have?
  }

p: {

AWESOME, it has been posed to the job channel!
}
*/
