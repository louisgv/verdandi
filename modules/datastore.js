'use strict';

let DataStore = {};

let storage = {};

DataStore.set = function(key, val) {
	storage[key] = val;
};

DataStore.get = function(key, defVal) {
	let val = storage[key];
	return (val || defVal);
};


module.exports = DataStore;
