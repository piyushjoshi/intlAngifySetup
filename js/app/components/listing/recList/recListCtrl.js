'use strict';

var model = require("../model");

module.exports = function($scope, $http){
	var defaultRecsVisible = 5, recsToAddOnScroll = 3;
	$scope.currentlyDisplayedRecs = defaultRecsVisible;
	
	model.getRecs($http, function(recList){
		$scope.recList = recList;
		$scope.scrollMore = function() {
			var totRecs = recList.length, i, log = "";
			i = totRecs - $scope.currentlyDisplayedRecs;
			log += $scope.currentlyDisplayedRecs + "---";
			$scope.currentlyDisplayedRecs += (i > recsToAddOnScroll ? recsToAddOnScroll : (i > 0) ? i : 0);
			log += $scope.currentlyDisplayedRecs;
			console.log(log);
		};
		$scope.airlineInfo = model.getAirlineInfo();
	});
};