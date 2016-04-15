'use strict';

let DataStore = {};

let storage = {
	profiles: [],
	jobs: [],
	mem: {}
};

DataStore.searchProfile = function (requirement) {

}

DataStore.storeProfile = function (profile) {
	storage.profiles.push(profile);
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
