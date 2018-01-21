var logty = require("./index.js");
var fs = require("fs");

//Simple log messages without tag
var simpleLog = new logty();

//Pipe to stdout
simpleLog.pipe(process.stdout);

//Generate simple log messages
simpleLog.debug("This is a debug message");
simpleLog.info("This is an info message");
simpleLog.notice("This is a notice message");
simpleLog.warning("This is a warning message");
simpleLog.error("This is an error message");
simpleLog.fatal("This is a fatal message");

//Close the log stream
simpleLog.end();


//Log with tag
var taggedLog = new logty({tag: "my-tag"});

//Pipe to stdout
taggedLog.pipe(process.stdout);

//Generate tagged logs
taggedLog.debug("Tagged debug message");
taggedLog.info("Tagged info message");
taggedLog.notice("Tagged notice message");
taggedLog.warning("Tagged warning message");
taggedLog.error("Tagged error message");
taggedLog.fatal("Tagged fatal message");

//Close the log stream
taggedLog.end();


//Log with min level
var minLog = new logty({tag: "min-log"});

//Pipe to stdout
minLog.pipe(process.stdout);

//Set the min log level -> hide debug, info and notice levels
minLog.setLevel("warning");

//Generate tagged logs
minLog.debug("Tagged debug message");
minLog.info("Tagged info message");
minLog.notice("Tagged notice message");
minLog.warning("Tagged warning message");
minLog.error("Tagged error message");
minLog.fatal("Tagged fatal message");

//Close the log stream
minLog.end();


//Write to a file
var fileLog = new logty();

//Initialize the writer stream
var writer = fs.createWriteStream("./test.log", {defaultEncoding: "utf8", flags: "a"});

//Pipe to a writable stream
fileLog.pipe(writer);

//Register the error event listeners
fileLog.on("error", function (error) {
    console.error(error);
});

//Register the end event listener
fileLog.on("end", function () {
    console.log("Log stream closed!");
});

//Writer finished
writer.on("finish", function () {
    console.log("Writer closed!");
});

//Generate logs
fileLog.debug("Tagged debug message");
fileLog.info("Tagged info message");
fileLog.notice("Tagged notice message");
fileLog.warning("Tagged warning message");
fileLog.error("Tagged error message");
fileLog.fatal("Tagged fatal message");

//Close the stream
fileLog.end();
