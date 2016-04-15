"use strict";

let Profile = {};
module.exports = Profile;

const Utils = require('./utils');

const DataStore = require('../modules/datastore');

const File = require('./file')

Profile.list = function (r, c) {
  DataStore.listProfiles().forEach((profile)=>{
    File.constructProfile(profile, function (profileMsg) {
      c.say(profileMsg);
      c.next();
    })
  })
}
