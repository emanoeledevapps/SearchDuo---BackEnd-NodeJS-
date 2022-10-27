"use strict";
exports.__esModule = true;
exports.convertMinutesToHour = void 0;
function convertMinutesToHour(minutesData) {
    var hours = Math.floor(minutesData / 60);
    var minutes = minutesData % 60;
    return "".concat(String(hours).padStart(2, '0'), ":").concat(String(minutes).padStart(2, '0'));
}
exports.convertMinutesToHour = convertMinutesToHour;
