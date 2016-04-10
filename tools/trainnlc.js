"use strict";

let className = 'help-knp-poster-seeker';

let watson = require('watson-developer-cloud');

let secret = require('../modules/credential')
  .auth.nlc;

let fs = require('fs');

let path = require('path');

let natural_language_classifier = watson.natural_language_classifier({
  url: 'https://gateway.watsonplatform.net/natural-language-classifier/api',
  username: secret.username,
  password: secret.password,
  version: 'v1'
});

let dataPath = path.join(__dirname, '../data', `role.csv`);

let params = {
  language: 'en',
  name: className,
  training_data: fs.createReadStream(dataPath)
};

natural_language_classifier.create(params, function(err, response) {
  if (err)
    console.log(err);
  else
    // copy the classifier_id from the response
    console.log(JSON.stringify(response, null, 2));
});
