"use strict";

let fs = require('fs');

let path = require('path');

let jsonPath = '../db/nlc';
let trainsetPath = '../data';

let inputFiles = fs.readdirSync(path.join(__dirname,jsonPath));

inputFiles.forEach((file) => {

  let inputPath = path.join(__dirname, jsonPath, file);
  let outputPath = path.join(__dirname, trainsetPath, file.replace('.json','.csv'));

  let buffer = fs.readFileSync(inputPath);

  let data = JSON.parse(buffer.toString());

  let outputCSV = "";

  for (let classifier in data) {
    if (data.hasOwnProperty(classifier)) {
      for (let i = 0; i < data[classifier].length; i++) {
        outputCSV += `${data[classifier][i]},${classifier}\n`
      }
    }
  }

  fs.writeFile(outputPath, outputCSV, (err) => {
    if(err) {
      throw err;
    }
    console.log('It\'s saved!');
  });

});
