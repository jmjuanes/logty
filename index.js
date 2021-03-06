let stream = require("stream");
let util = require("util");

let timestamp = require("./lib/timestamp.js");

//Default labels list
let labels = ["fatal", "error", "warning", "notice", "info", "debug"];

//Logty readable stream
let logty = function (opt) {
    if (typeof opt !== "object" || opt === null) {
        opt = {};
    }
    if (typeof opt.tag !== "string") {
        opt.tag = null;
    }
    if (typeof opt.encoding !== "string") {
        opt.encoding = "utf8";
    }

    //Extends the readable stream
    stream.Readable.call(this, {encoding: opt.encoding});

    this._tag = (typeof opt.tag === "string") ? opt.tag.trim() : null;
    this._level = labels.length;
    this._disabled = false;

    //Default message format
    this._format = function (tag, label, text) {
        let list = [];
        if (tag) {
            //Add the tag if it is provided
            list.push("[" + tag + "]");
        }
        list.push("[" + timestamp("YYYY-MM-DD hh:mm:ss") + "]");
        list.push("[" + label.toUpperCase() + "]");
        list.push(text.trim());
        return list.join(" ");
    };

    return this;
};

//Inherits from Readable stream
util.inherits(logty, stream.Readable);

//Set the minimum level
logty.prototype.setLevel = function (index) {
    //Check if the provided index is a string
    //This will be removed un further versions, setLevel method will only accepts an integer
    if(typeof index === "string") {
        index = labels.indexOf(index.toLowerCase());
    }
    //Check for a valid number value
    if (typeof index === "number" && index > -1 && index <= labels.length) {
        this._level = parseInt(index);
    }
    else {
        this._level = labels.length;
    }
    return this;
};

//Set the message format
logty.prototype.setFormat = function (format) {
    if (typeof format !== "function") {
        throw new Error("Format must be a function");
    }
    this._format = format;
    return this;
};

//Print a log message with a custom label
logty.prototype.customLabeledMessage = function(label, text) {
    if(typeof label === "string" && typeof text === "string") {
        let str = this._format.call(null, this._tag, label, text);
        this.emit("data", str + "\n");
    }
    return this;
};

//Register a method to emit a log message for each label
labels.forEach(function (label, index) {
    logty.prototype[label] = function (text) {
        if (typeof text !== "string") {
            return this;
        }
        if (this._disabled === true || this._level < index) {
            return this;
        }
        //Build the message for this level and emit the data event
        let str = this._format.call(null, this._tag, label, text);
        //this.push(message(level, this._tag, text), "utf8");
        this.emit("data", str + "\n");
        return this;
    };
});

//Empty read method
logty.prototype._read = function () {
    return;
};

//Close the writable stream
logty.prototype.end = function () {
    this._disabled = true;
    this.emit("end");
    return this;
};

//Export logty class
module.exports = logty;

//Let people access to labels array and timestamp script
module.exports.labels = labels;
module.exports.timestamp = timestamp;
