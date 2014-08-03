'use strict';

var angular = require("angular"),
	_ = require("underscore");

module.exports = function($scope){
	$scope.sortRadioButtons = function() {
		var sorter = function(a,b,mapOfWays){
			var propName=mapOfWays.shift();
		    if(propName){
				var diff = +(a.segment[propName] - b.segment[propName]);
				if(diff!== 0) return diff;
				return sorter(a,b,mapOfWays);
		    } else{
		    	return 0;
	    	}
		};
	   	return function(a, b){
		   		return sorter(a,b,['duration','depTime','noOfStops']);
	   	};
	};
	var arrOfGroups = [], i = 0, recGrp = $scope.recGroup;

	$scope.isSingleRec = (recGrp.length === 1);

	for (; i < recGrp[0].segments.length; i++) {
		var arrRadio = [], radios = {}, radioKey = "";
		angular.forEach(recGrp, function(rec) {
			radioKey = "_";
			angular.forEach(rec.segments[i].groupOfFlights, function(flight) {
				radioKey += flight.flightNumber + "_";
			});
			if (!radios[radioKey]) {
				radios[radioKey] = [];
			}
			radios[radioKey].push(rec);
		});
		angular.forEach(radios, function(recs) {
			arrRadio.push({
				recs : recs,
				segment : recs[0].segments[i]
			});
		});
		arrRadio.sort($scope.sortRadioButtons());
		arrOfGroups.push(arrRadio);
	}
	
	$scope.radioGroups = arrOfGroups;
	$scope.selectedRec = recGrp[0];
	$scope.boundedRecsRegistry = [];
	$scope.selectedRadioIndexRegistry = [];
	
	$scope.validateRadioSelection = function(groupIndex, newRecs) {
		var temp = $scope.boundedRecsRegistry.slice(0), intersection;
		temp[groupIndex] = newRecs;
		intersection = _.intersection.apply(_, temp)[0];
		if (intersection) {
			$scope.selectedRec = intersection;
			return true;
		} else {
			return false;
		}
	};
	$scope.enforceSelection = function(groupIndex, newRecs) {
		var newSelectedRec = newRecs[0];
		if (newSelectedRec) {
			$scope.selectedRec = newSelectedRec;
			$scope.selectedRadioIndexRegistry = $scope.radioGroups.map(function(radioGroup) {
				return radioGroup.map(function(radioObj) {
					return radioObj.recs.indexOf(newSelectedRec) >= 0;
				}).indexOf(true);
			});
			$scope.boundedRecsRegistry = $scope.selectedRadioIndexRegistry.map(function(radioObjIndex, segmentIndex) {
				return $scope.radioGroups[segmentIndex][radioObjIndex].recs;
			});
		}
	};
};