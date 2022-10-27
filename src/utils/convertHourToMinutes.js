"use strict";
exports.__esModule = true;
exports.convertHourToMinutes = void 0;
function convertHourToMinutes(hour) {
    var _a = hour.split(':').map(Number), hours = _a[0], minutes = _a[1];
    var minutesAmount = (hours * 60) + minutes;
    return minutesAmount;
}
exports.convertHourToMinutes = convertHourToMinutes;
