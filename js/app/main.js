'use strict';

var angular = require('angular'),
	_ = require('underscore'),
	init = require('./init'),
	sharedComponents = require('./components/shared'),
	mainModule;

require('angular-route');
require('angular-sanitize')

mainModule = angular.module('mainIntlApp', _.union(['ngRoute', 'ngSanitize'], init.dependencyList));

//mainModule = angular.module('mainIntlApp', ['ngRoute', 'infinite-scroll', 'listing']);

module.exports = mainModule;

init.config(mainModule);

sharedComponents.config(mainModule);