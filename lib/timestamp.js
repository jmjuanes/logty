//Normalize a number and return it with a number of digits
let normalize = function (value, digits) {
    return ("0000" + value).slice(-1 * digits);
};

//Available values
let values = ["YYYY", "MM", "DD", "hh", "mm", "ss"];

//Get the current time
let currentTime = function () {
    let date = new Date();
    let result = {};
    let regex = /(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d).\d\d\dZ/g;
    let current = regex.exec(date.toJSON());
    if (current === null || current.length < 7) {
        return null;
    }
    for (let i = 0; i < 6; i++) {
        //The first element is the full matched string
        result[values[i]] = current[i + 1];
    }
    return result;
};

//Parse the provided pattern and return the wanted timestamp
module.exports = function (pattern) {
    if (typeof pattern !== "string") {
        pattern = "YYYY-MM-DD hh:mm:ss";
    }
    let current = currentTime();
    if (current === null) {
        return "";
    }
    let regex = new RegExp("(" + values.join("|") + ")", "g");
    return pattern.replace(regex, function (match) {
        return normalize(current[match], match.length);
    });
};
