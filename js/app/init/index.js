'use strict';

var _ = require('underscore'), routesAvailable = require('./routeList');

exports.config = function(mainModule) {
	_.each(routesAvailable, function(route) {
		route.config(mainModule);
	});
};

exports.dependencyList = routesAvailable.map(function(route) {
	return route.moduleName;
});