'use strict';

module.exports = function($scope) {
	var defaultSelectedRec = $scope.selectedRec, i = 0;
	for (; i < $scope.radioGroup.length; i++) {
		if ($scope.radioGroup[i].recs.indexOf(defaultSelectedRec) >= 0) {
			$scope.selectedRadioIndexRegistry[$scope.radioGroup[i].segment.index] = i;
			$scope.previousSelection = i;
			$scope.boundedRecsRegistry[$scope.radioGroup[i].segment.index] = $scope.radioGroup[i].recs;
			break;
		}
	}
	$scope.radioClick = function(radioButtonindex, radioGroupIndex) {
		var validSelection, decision;
		validSelection = $scope.validateRadioSelection(radioGroupIndex,
				$scope.radioGroup[radioButtonindex].recs);
		if (!validSelection) {
			decision = window
					.confirm("This timing is not compatible with other legs. Do you wish to change timings of other legs to make it compatible?");
			if (decision) {
				$scope.enforceSelection(radioGroupIndex,
						$scope.radioGroup[radioButtonindex].recs);
			} else {
				$scope.selectedRadioIndexRegistry[radioGroupIndex] = $scope.previousSelection;
			}
		} else {
			$scope.previousSelection = $scope.selectedRadioIndexRegistry[radioGroupIndex];
		}
		console.log("$scope.selectedRec.index = " + $scope.selectedRec.index);
	};
};