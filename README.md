# logty

> A dead simple log library

[![npm](https://img.shields.io/npm/v/logty.svg?style=flat-square)](https://www.npmjs.com/package/logty)
[![npm](https://img.shields.io/npm/dt/logty.svg?style=flat-square)](https://www.npmjs.com/package/logty)

## Install

You can install the latest version of the package using **npm**:

```
$ npm install --save logty
```

## Usage

```javascript
//Import logty
var logty = require('logty');

//Simple log messages without tag
var simple_log = new logty('');

//Generate simple log messages
simple_log.debug('This is a debug message');
simple_log.error('This is an error message');

//Log with tag
var tagged_log = new logty('my-tag');

//Generate tagged logs
tagged_log.info('Tagged info message');
tagged_log.warning('Tagged warning message');
```

This will print on console the following lines:

```
[2017/07/12 13:01:17] [DEBUG] This is a debug message
[2017/07/12 13:01:17] [ERROR] This is an error message
[2017/07/12 13:01:17] [INFO] my-tag : Tagged info message
[2017/07/12 13:01:17] [WARNING] my-tag : Tagged warning message
```

The log string will have the following structure:

```
[{{ date }}] [{{ level }}] {{ tag }} : {{ message }}
```

- `date` is the actual date, in format `yyyy/mm/dd hh:mm:ss`. 
- `level` is the first argument of this method.
- `tag` is the tag string provided on the `logty` constructor. If no tag string is provided, this field will be omitted from the log string.
- `message` is log message.



## API

### var log = new logty(tag \[, stream\])

Returns a new logger for the given arguments: 

- `tag`: a string with the log tag. If not tag is provided (`null` or empty string), the tag field of the log message will be removed. 
- `stream`: (optionally) a writable stream where the log messages will be written. Default is `process.stdout`.

### log.debug(message)

Writes a **debug** log message on the stream provided to the constructor.

### logty.info(message)

Writes an **info** log message on the stream provided to the constructor.

### logty.notice(message)

Writes a **notice** log message on the stream provided to the constructor.

### logty.error(message)

Writes an **error** log message on the stream provided to the constructor.

### logty.fatal(message)

Writes a **fatal** log message on the stream provided to the constructor.


## License

[MIT](./LICENSE) &copy; Josemi Juanes.
