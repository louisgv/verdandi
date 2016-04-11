"use strict";


function askInfo() {

}

exports.start = function (err, convo) {
  if(err) {
    console.log(err);
  } else {
    convo.say('');
  }
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
