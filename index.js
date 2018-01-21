var stream = require("stream");
var util = require("util");

//Default levels list
var levels = ["fatal", "error", "warning", "notice", "info", "debug"];

//Normalize a number and return it with two digits
var normalize = function (value) {
    return ("0" + value).slice(-2);
};

//Default message format function
var defaultMessage = function(tag, day, time, level, message) {
    var list = [];

    if (tag) {
        list.push("[" + tag + "]");
    }
    list.push("[" + day + " " + time + "]");
    list.push("[" + level.toUpperCase() + "]");
    list.push(message.trim());

    return list.join(" ");
};

//Logty readable stream
var logty = function (opt) {
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
    this._level = levels.length;
    this._disabled = false;

    //Default message format
    this._format = function (tag, day, time, level, message) {
        return defaultMessage(tag, day, time, level, message);
    };

    return this;
};

//Inherits from Readable stream
util.inherits(logty, stream.Readable);

//Set the minimum level
logty.prototype.setLevel = function (level) {
    if (typeof level === "string" && levels.indexOf(level) > -1) {
        this._level = levels.indexOf(level);
    }
    else {
        this._level = levels.length;
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

//Register a method to emit a log message for each level
levels.forEach(function (level, index) {
    logty.prototype[level] = function (text) {
        if (typeof text !== "string") {
            return;
        }
        if (this._disabled === true || this._level < index) {
            return;
        }

        let d = new Date();
        let day = [d.getFullYear(), normalize(d.getMonth() + 1), normalize(d.getDate())].join("/");
        let time = [normalize(d.getHours()), normalize(d.getMinutes()), normalize(d.getSeconds())].join(":");
        let str = this._format.call(null, this.tag, day, time, level, text);

        //Build the message for this level and emit the data event
        //this.push(message(level, this.tag, text), "utf8");
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

//Exports to node
module.exports = logty;
module.exports.defaultMessage = defaultMessage;
