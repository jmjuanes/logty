let logty = require("./index.js");
let pkg = require("./package.json");

let args = require("get-args")();

let getSpaces = function (n) {
    return Array(13 - n).join(" ");
};

//Print the usage guide
let printHelp = function () {
    console.log("logty v" + pkg.version + "");
    console.log("");
    console.log("Usage: ");
    console.log("  $ logty [options] -m <" + "message>");
    console.log("");
    console.log("Options:");
    console.log("  -m MESSAGE    Set the message to display. This option is mandatory.");
    console.log("  -l LABEL      Set the label. Default is 'debug'.");
    logty.labels.forEach(function (label) {
        console.log("  --" + label + getSpaces(label.length) + "Alias for '-l " + label + "'.");
    });
    console.log("  --help, -h    Display this usage guide.");
};

if (typeof args.options.h === "boolean" || typeof args.options.help === "boolean") {
    return printHelp();
}
if (typeof args.options.m !== "string") {
    console.log("Message is mandatory. Use the -m option to set the message text to be displayed.");
    return printHelp();
}

//Get the wanted label value
let label = "debug";
if (typeof args.options.l === "string") {
    label = args.options.l;
} else {
    for (let i = 0; i < logty.labels.length; i++) {
        if (typeof args.options[logty.labels[i]] === "boolean") {
            label = logty.labels[i];
            break;
        }
    }
}

//Generate the message to display
let message = [];
message.push("[" + logty.timestamp("YYYY-MM-DD hh:mm:ss") + "]");
message.push("[" + label.toUpperCase() + "]");
message.push(args.options.m.trim());

//Print the log message in console
return console.log(message.join(" "));
