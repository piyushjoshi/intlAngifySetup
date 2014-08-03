'use strict';

var filters = require('./filters');

exports.config = function(mainModule){
	filters.config(mainModule);
};