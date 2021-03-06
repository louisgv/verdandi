'use strict';

let DataStore = {};

let storage = {
	profiles: [],
	jobs: [],
	mem: {}
};

storage.profiles = require('../data/sampleCVs.json');

DataStore.searchProfile = function (requirement) {
	return storage.profiles.filter(function (profile) {
		let skillArray = []
		for(let skill in profile.skills) {
			if(profile.skills.hasOwnProperty(skill)) {
				skillArray = skillArray.concat(profile.skills[skill])
			}
		}
		return requirement.skills.some((reqSkill) => {
			return (skillArray.indexOf(reqSkill.toLocaleLowerCase()) >= 0);
		})
	})
}

DataStore.listProfiles = function (requirement) {
	return storage.profiles;
}

DataStore.storeProfile = function (profile) {
	storage.profiles.push(profile);
}

DataStore.listJobs = function () {
	return storage.jobs;
}

DataStore.storeJob = function (job) {
	storage.jobs.push(job);
}

DataStore.set = function (key, val) {
	storage.mem[key] = val;
};

DataStore.get = function (key, defVal) {
	let val = storage.mem[key];
	return(val || defVal);
};


module.exports = DataStore;
