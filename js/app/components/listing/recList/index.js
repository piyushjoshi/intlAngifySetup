'use strict';

var angular = require('angular'),
	recListCtrl = require("./recListCtrl"),
	recGroupCtrl = require("./recGroupCtrl"),
	radioGroupCtrl = require("./radioGroupCtrl");

require('../../shared/ng-infinite-scroll');

angular.module('recList', ['infinite-scroll'])
	.controller('recListCtrl', ['$scope','$http',recListCtrl])
	.controller('recGroupCtrl', ['$scope', recGroupCtrl])
	.controller('radioGroupCtrl', ['$scope', radioGroupCtrl]);