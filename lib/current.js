//Normalize a number and return it with two digits
let normalize = function (value) {
    return ("0" + value).slice(-2);
};

//Get the current day
module.exports.getCurrentDay = function () {
    let d = new Date();
    return [d.getFullYear(), normalize(d.getMonth() + 1), normalize(d.getDate())].join("/");
};

//Get the current time
module.exports.getCurrentTime = function () {
    let d = new Date();
    return [normalize(d.getHours()), normalize(d.getMinutes()), normalize(d.getSeconds())].join(":");
};
