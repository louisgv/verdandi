"use strict";

let watson = require('watson-developer-cloud');

let secret = require('../modules/credential')
  .auth.nlc;

let fs = require('fs');

let path = require('path');

let className = 'command';

let dataPath = path.join(__dirname, '../data', `${className}.csv`);

let natural_language_classifier = watson.natural_language_classifier({
  url: 'https://gateway.watsonplatform.net/natural-language-classifier/api',
  username: secret.username,
  password: secret.password,
  version: 'v1'
});

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

function cleanUpClassifier() {
  natural_language_classifier.list({}, function (err, response) {
    console.log(response.classifiers);

    response.classifiers.forEach((classifier)=>{
      let id = classifier.classifier_id;
      natural_language_classifier.remove({
        classifier_id : id
      }, function (err, resp) {
        if (err) console.log(err);
      })
    })

  })
}
