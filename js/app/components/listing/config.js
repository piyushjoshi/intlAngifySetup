'use strict';

var	angular = require("angular");

require('./recList');

exports.config = function(mainModule) {
	mainModule.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/listing', {
			templateUrl : '/international/raw/templates/listing/listing.html',
			controller : 'recListCtrl'
		});
	}]);
};

angular.module('listing', ['recList']);

exports.moduleName = 'listing';