//Default levels list
let levels = ["fatal", "error", "warning", "notice", "info", "debug"];

//Get the default levels
module.exports = function () {
    return levels.slice(0);
};
