"use strict";

let watson = require('watson-developer-cloud');

let secret = require('../credential')
  .auth.nlc;

let natural_language_classifier = watson.natural_language_classifier({
  url: 'https://gateway.watsonplatform.net/natural-language-classifier/api',
  username: secret.username,
  password: secret.password,
  version: 'v1'
});

// f15e67x54-nlc-1132
// const nlcID = "f1704ex55-nlc-927";

exports.getList = function (callback) {
  natural_language_classifier.list({},
    function (err, response) {
      if(err)
      console.log('error:', err);
      else
      console.log(JSON.stringify(response, null, 2));
    }
  );
}

exports.getClasses = function (text, nlcid, callback) {

  natural_language_classifier.classify({
      text: text,
      classifier_id: nlcid
    },
    function (err, response) {
      if(err){
        console.log('error:', err);
        callback(err);
      }
      else {
        console.log(JSON.stringify(response, null, 2));
        callback(response);
      }
    });

}
