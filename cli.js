let logty = require("./index.js");
let pkg = require("./package.json");

let args = require("get-args")();

let getSpaces = function (n) {
    return Array(13 - n).join(" ");
};

//Print the usage guide
let printHelp = function () {
    process.stdout.write("logty v" + pkg.version + "");
    process.stdout.write("");
    process.stdout.write("Usage: ");
    process.stdout.write("  $ logty [options] -m <" + "message>");
    process.stdout.write("");
    process.stdout.write("Options:");
    process.stdout.write("  -m MESSAGE    Set the message to display. This option is mandatory.");
    process.stdout.write("  -l LABEL      Set the label. Default is 'debug'.");
    logty.labels.forEach(function (label) {
        process.stdout.write("  --" + label + getSpaces(label.length) + "Alias for '-l " + label + "'.");
    });
    process.stdout.write("  --help, -h    Display this usage guide.");
};

if (typeof args.options.h === "boolean" || typeof args.options.help === "boolean") {
    return printHelp();
}
if (typeof args.options.m !== "string") {
    process.stdout.write("Message is mandatory. Use the -m option to set the message text to be displayed.");
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
return process.stdout.write(message.join(" "));
