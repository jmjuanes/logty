# logty

> A dead simple streaming logger.

[![npm](https://img.shields.io/npm/v/logty.svg?style=flat-square)](https://www.npmjs.com/package/logty)
[![npm](https://img.shields.io/npm/dt/logty.svg?style=flat-square)](https://www.npmjs.com/package/logty)
[![npm](https://img.shields.io/npm/l/logty.svg?style=flat-square)](https://github.com/jmjuanes/logty)

## Install

You can install the latest version of the package using **npm**:

```
$ npm install --save logty
```

## Usage

`logty` creates a [Readable Stream](https://nodejs.org/api/stream.html#stream_readable_streams) that can emit logs messages.

Pipe log messages to `process.stdout`: 

```javascript
//Import logty
var logty = require('logty');

//Initialize the log stream
var log = new logty(null, { encoding: 'utf8' });

//Pipe the log messages to process.stdout 
log.pipe(process.stdout);

//Generate simple log messages
log.debug('This is a debug message');
log.error('This is an error message');

//Close the log stream 
log.end();
```
This will print on console the following lines:

```
[2017/07/12 13:01:17] [DEBUG] This is a debug message
[2017/07/12 13:01:17] [ERROR] This is an error message
```

You can pipe log messages to a file: 
```javascript
//Import dependencies
var logty = require('logty');
var fs = require('fs');

//Initialize the log stream
var log = new logty(null, { encoding: 'utf8' }); 

//Initialize the writable stream 
var writer = fs.createWriteStream('./my-logs.txt', { defaultEncoding: 'utf8', flags: 'a' });

//Pipe the logs stream to the writer
logs.pipe(writer);

//Generate logs
log.info('This is an info message');
log.error('This is an error message');

//Close the log stream 
log.end();
```

Content of the file:

```
$ cat my-logs.txt
[2017/07/12 13:01:17] [INFO] This is a info message
[2017/07/12 13:01:17] [ERROR] This is an error message
```


The log string will have the following **default** structure:

```
[{{ tag }}] [{{ day }} {{ time }}] [{{ level }}] {{ message }}
```

- `tag` is the tag string provided on the `logty` constructor. If no tag string is provided, this field will be omitted from the log string.
- `day` is the actual day, with the format format `yyyy/mm/dd`. 
- `time` is the actual time, with the format `hh:mm:ss`. 
- `level` is the first argument of this method.
- `message` is log message.

You can change this structure using the [`log.format`](#logformatfn) method.


## API

### var log = new logty(options)

Returns a new [`Readable Stream`](https://nodejs.org/api/stream.html#stream_readable_streams). The `options` argument must be an object with the following attributes: 

- `tag`: (optionally) a string with the log tag. If not tag is provided (`null` or empty string), the tag field of the log message will be removed. 
- `encoding`: (optionally) the stream encoding. Default is `utf8`.

### Event: 'data'

The data event will be emitted when a new log message is generated using the `log.debug`, `log.info`, `log.notice`, `log.warning`, `log.error` or `log.fatal` methods.

```javascript
var log = new logty();
log.on('data', function(message)
{
  //New log message generated
  // . . . 
});

//Emit a debug message 
log.debug('This is a debug message');
```

### Event: 'error'

The `error` event is emitted if an error occurred while writing the log messages into the provided stream. an `Error` object will be passed to the listener callback with the error information. 

### Event: 'end'

The `end` event is emitted after the `log.end()` method has been called. 

### log.pipe(writer)

Pipe log messages to a [`Writable Stream`](https://nodejs.org/api/stream.html#stream_writable_streams).

### log.format(fn)

Use this method to print your custom log messages. The `fn` argument must be a function that will be execute each log request with the following arguments: 
- `tag`: the log tag string.
- `day`: a string with the format `yyyy/mm/dd`.
- `time`: a string with the format `hh:mm:ss`. 
- `level`: a string with the log level.
- `message`: a string with the log message.

```javascript
log.format(function(tag, day, time, level, message)
{
  //Only print the level and the message 
  return '[' + level.toUpperCase() + '] ' + message;
});

log.debug('A debug message'); // --> [DEBUG] A debug message

```

### log.level(level)

Set the minimum log level. Available levels, in order: 

- `fatal`
- `error`
- `warning`
- `notice`
- `info`
- `debug`

For example, if you set `warning` as the minimum level, all the `notice`, `info` or `debug` messages will be omitted. 

### log.debug(message)

```javascript
log.debug('This is a debug message');
// -> [YYYY/MM/DD hh:mm:ss] [DEBUG] This is a debug message
```

### log.info(message)

```javascript
log.info('This is an info message');
// -> [YYYY/MM/DD hh:mm:ss] [INFO] This is an info message
```

### log.notice(message)

```javascript
log.notice('This is a notice message');
// -> [YYYY/MM/DD hh:mm:ss] [NOTICE] This is a notice message
```

### log.warning(message)

```javascript
log.fatal('This is a warning message');
// -> [YYYY/MM/DD hh:mm:ss] [WARNING] This is a warning message
```

### log.error(message)

```javascript
log.error('This is an error message');
// -> [YYYY/MM/DD hh:mm:ss] [ERROR] This is an error message
```

### log.fatal(message)

```javascript
log.fatal('This is a fatal message');
// -> [YYYY/MM/DD hh:mm:ss] [FATAL] This is a fatal message
```

### log.end()

Closes the log stream. 


## License

[MIT](./LICENSE) &copy; Josemi Juanes.
