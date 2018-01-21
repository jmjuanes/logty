//Import dependencies
var logty = require("./index.js");
var fs = require("fs");

//Simple log messages without tag
var simple_log = new logty();

//Pipe to stdout
simple_log.pipe(process.stdout);

//Generate simple log messages
simple_log.debug("This is a debug message");
simple_log.info("This is an info message");
simple_log.notice("This is a notice message");
simple_log.warning("This is a warning message");
simple_log.error("This is an error message");
simple_log.fatal("This is a fatal message");

//Close the log stream
simple_log.end();


//Log with tag
var tagged_log = new logty({tag: "my-tag"});

//Pipe to stdout
tagged_log.pipe(process.stdout);

//Generate tagged logs
tagged_log.debug("Tagged debug message");
tagged_log.info("Tagged info message");
tagged_log.notice("Tagged notice message");
tagged_log.warning("Tagged warning message");
tagged_log.error("Tagged error message");
tagged_log.fatal("Tagged fatal message");

//Close the log stream
tagged_log.end();


//Log with min level
var min_log = new logty({tag: "min-log"});

//Pipe to stdout
min_log.pipe(process.stdout);

//Set the min log level -> hide debug, info and notice levels
min_log.level("warning");

//Generate tagged logs
min_log.debug("Tagged debug message");
min_log.info("Tagged info message");
min_log.notice("Tagged notice message");
min_log.warning("Tagged warning message");
min_log.error("Tagged error message");
min_log.fatal("Tagged fatal message");

//Close the log stream
min_log.end();


//Write to a file
var file_log = new logty();

//Initialize the writer stream
var writer = fs.createWriteStream("./test.log", {defaultEncoding: "utf8", flags: "a"});

//Pipe to a writable stream
file_log.pipe(writer);

//Register the error event listeners
file_log.on("error", function (error) {
    console.error(error);
});

//Register the end event listener
file_log.on("end", function () {
    console.log("Log stream closed!");
});

//Writer finished
writer.on("finish", function () {
    console.log("Writer closed!");
});

//Generate logs
file_log.debug("Tagged debug message");
file_log.info("Tagged info message");
file_log.notice("Tagged notice message");
file_log.warning("Tagged warning message");
file_log.error("Tagged error message");
file_log.fatal("Tagged fatal message");

//Close the stream
file_log.end();
