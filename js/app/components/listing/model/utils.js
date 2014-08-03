'use strict';

exports.groupRecs = function(origRecs, exposedRecs) {
	exposedRecs.splice(0);
	var groups = [ [ origRecs[0] ] ], prevGrpRec = origRecs[0], currGrp = 0;
	for (var i = 1; i < origRecs.length; i++) {
		var rec = origRecs[i];
		if (rec.refAirlineCode !== prevGrpRec.refAirlineCode || prevGrpRec.totPricePerAdt !== rec.totPricePerAdt) {
			groups.push([ rec ]);
			prevGrpRec = rec;
			currGrp++;
		} else {
			groups[currGrp].push(rec);
		}
	}
	for (var j = 0; j < groups.length; j++) {
		exposedRecs.push(groups[j]);
	}
};
exports.processFare = function(rec) {
	var t = 0, d = 0, paxFares = rec.paxFares, paxFare, fares, fare, fareType, i, j;
	for (i = 0; i < paxFares.length; i++) {
		paxFare = paxFares[i];
		if (paxFare.paxType == 'ADT') {
			fares = paxFare.fares;
			for (j = 0; j < fares.length; j++) {
				fare = fares[j];
				fareType = fare.fareType;
				if (fareType == 'TOT') {
					t = t + fare.fare;
				} else if (fareType == 'GST') {
					t = t + fare.fare;
				} else if (/^MUTAX.*/.test(fareType)) {
					t = t + fare.fare;
				} else if (/^MU.*/.test(fareType)) {
					t = t + fare.fare;
				} else if (/^DIS.*/.test(fareType)) {
					t = t - fare.fare;
					d += fare.fare;
				}
			}
		}
	}
	rec.totPricePerAdt = Math.floor(t + 0.5);
	rec.totDiscountPerAdt = Math.floor(d + 0.5);
};

exports.formatDuration = function(rec) {
	var mins, hrs, str, dur = 0;
	angular.forEach(rec.segments, function(seg) {
		mins = seg.duration % 60;
		hrs = (seg.duration - mins) / 60;
		str = (hrs + "h");
		if (mins > 0) {
			str += (" " + mins + "m");
		}
		seg.durationFormatted = str;
		dur += seg.duration;
	});
	rec.duration = dur;
};
exports.calculateStops = function(rec) {
	var maxStops = 0;
	angular.forEach(rec.segments, function(seg) {
		var techStopCount = 0;
		angular.forEach(seg.groupOfFlights, function(flight) {
			if (flight.techStopOver) {
				techStopCount += flight.techStopOver.length;
			}
		});
		seg.noOfStops = techStopCount + seg.groupOfFlights.length - 1;
		if (maxStops < seg.noOfStops) {
			maxStops = seg.noOfStops;
		}
	});
	rec.noOfStops = maxStops;
};
exports.populateIndices = function(rec, recIndex) {
	var i = 0;
	rec.index = recIndex;
	for (; i < rec.segments.length; i++) {
		rec.segments[i].index = i;
	}
};
exports.processAirline = function(rec, airLineCodeMap) {
	rec.refAirlineCode = rec.refAirline[0].code;
	rec.refAirlineName = airLineCodeMap[rec.refAirline[0].code].name;
};
exports.processDepTime = function(rec) {
	rec.depTime = rec.segments[0].groupOfFlights[0].departureInfo.dateTime;
	for (var i = 0; i < rec.segments.length; i++) {
		rec.segments[i].depTime = rec.segments[i].groupOfFlights[0].departureInfo.dateTime;
	}
};