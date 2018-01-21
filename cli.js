#!/usr/bin/env node

let logty = require("./index.js");
let pkg = require("./package.json");

let args = process.argv.slice(2);

//Find the option value
let findOption = function (shortName, largeName, defaultValue) {
    for (let i = 0; i < args.length; i++) {
        let a = args[i];
        let firstCondition = a.indexOf("--") === 0 && a.substr(2) === largeName;
        let secondCondition = a.indexOf("-") === 0 && a.substr(1) === shortName;

        if (firstCondition || secondCondition) {
            if (i + 1 < args.length) {
                return args[i + 1];
            }
            else {
                return true;
            }
        }
    }
    return defaultValue;
};

//Print the usage guide
let printHelp = function () {
    console.log("logty v" + pkg.version + "");
    console.log("");
    console.log("Usage: ");
    console.log("  $ logty --level <" + "level> --message <" + "message>");
    console.log("");
    console.log("Options:");
    console.log("  --level STRING         (Mandatory!) Logging level.");
    console.log("  --message STRING       (Mandatory!) Logging message to display.");
    console.log("  -h, --help             Display this usage guide.");
};

if (args.length === 1 && (args[0] === "-h" || args[0] === "--help")) {
    return printHelp();
}

//Parse the argument values
let levelValue = findOption(null, "level", null);
let messageValue = findOption(null, "message", null);

if (typeof levelValue !== "string" || typeof messageValue !== "string") {
    return console.log("Level and message options are mandatory!");
}

let levelsList = logty.getDefaultLevels();
if (levelsList.indexOf(levelValue.toLowerCase().trim()) === -1) {
    levelValue = "debug";
}

//Generate the log message
let currentDay = logty.getCurrentDay();
let currentTime = logty.getCurrentTime();

return console.log(logty.getDefaultMessage(null, currentDay, currentTime, levelValue, messageValue));

