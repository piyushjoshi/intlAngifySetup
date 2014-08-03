'use strict';

var spaceMatcher = /\s+/g, decimalValueMatcher = /\.\d+/, currencyWithoutDecimal, stopsDisplay, wrapInMultipleLines;

currencyWithoutDecimal = function() {
	return function(value) {
		return value.replace(decimalValueMatcher, '');
	};
};

stopsDisplay = function() {
	return function(value) {
		value = +value;
		return value === 0 ? 'Non stop' : value === 1 ? '1 stop' : value + ' stops';
	};
};

wrapInMultipleLines = function() {
	return function(value) {
		return value.replace(spaceMatcher, '<br/>');
	};
};

exports.config = function(mainModule) {
	mainModule.filter('currencyWithoutDecimal', currencyWithoutDecimal)
		.filter('stopsDisplay', stopsDisplay)
		.filter('wrapInMultipleLines', wrapInMultipleLines);
};