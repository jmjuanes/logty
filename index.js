let stream = require("stream");
let util = require("util");

//Default levels list
let levels = ["fatal", "error", "warning", "notice", "info", "debug"];

let current = require('./lib/current.js');
let message = require('./lib/message.js');

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
    this._level = levels.length;
    this._disabled = false;

    //Default message format
    this._format = function (tag, day, time, level, text) {
        return message(tag, day, time, level, text);
    };

    return this;
};

//Inherits from Readable stream
util.inherits(logty, stream.Readable);

//Set the minimum level
logty.prototype.setLevel = function (level) {
    let index = levels.indexOf(level);
    if (typeof level === "string" && index > -1) {
        this._level = index;
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

        let day = current.getDay();
        let time = current.getTime();
        let str = this._format.call(null, this._tag, day, time, level, text);

        //Build the message for this level and emit the data event
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

//Exports
module.exports = logty;
module.exports.levels = levels; //Let people use levels array
