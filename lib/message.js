//Generate the default message
module.exports = function (tag, day, time, level, text) {
    let list = [];

    if (tag) {
        list.push("[" + tag + "]");
    }
    list.push("[" + day + " " + time + "]");
    list.push("[" + level.toUpperCase() + "]");
    list.push(text.trim());

    return list.join(" ");
};
