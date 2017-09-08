//Import dependencies
var logty = require('./index.js');
var fs = require('fs');

//Simple log messages without tag
var simple_log = new logty('');

//Generate simple log messages
simple_log.debug('This is a debug message');
simple_log.info('This is an info message');
simple_log.notice('This is a notice message');
simple_log.warning('This is a warning message');
simple_log.error('This is an error message');
simple_log.fatal('This is a fatal message');

//Log with tag
var tagged_log = new logty('my-tag');

//Generate tagged logs
tagged_log.debug('Tagged debug message');
tagged_log.info('Tagged info message');
tagged_log.notice('Tagged notice message');
tagged_log.warning('Tagged warning message');
tagged_log.error('Tagged error message');
tagged_log.fatal('Tagged fatal message');

//Log with min level
var min_log = new logty('min-log');

//Set the min log level -> hide debug, info and notice levels
min_log.level('warning');

//Generate tagged logs
min_log.debug('Tagged debug message');
min_log.info('Tagged info message');
min_log.notice('Tagged notice message');
min_log.warning('Tagged warning message');
min_log.error('Tagged error message');
min_log.fatal('Tagged fatal message');

//Write to a file
var file_log = new logty(null, fs.createWriteStream('./test.log', { defaultEncoding: 'utf8', flags: 'a' }));

//Register the error event listeners
file_log.on('error', function(error){ console.error(error); });

//Register the finish event listener
file_log.on('finish', function(){ console.log('File closed!'); });

//Generate logs
file_log.debug('Tagged debug message');
file_log.info('Tagged info message');
file_log.notice('Tagged notice message');
file_log.warning('Tagged warning message');
file_log.error('Tagged error message');
file_log.fatal('Tagged fatal message');

//Close the stream
file_log.end();
