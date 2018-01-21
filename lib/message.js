//Generate the default message
module.exports = function (tag, day, time, level, message) {
    let list = [];

    if (tag) {
        list.push("[" + tag + "]");
    }
    list.push("[" + day + " " + time + "]");
    list.push("[" + level.toUpperCase() + "]");
    list.push(message.trim());

    return list.join(" ");
};
