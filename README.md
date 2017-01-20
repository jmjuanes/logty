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
//Import dependencies
var logty = require('logty');

//Create the new log writer
var log = new logty('debug');  

//Display log messages
log.debug('This is a test log message');

//Display another log message
log.debug('This is another log message');
```

This will print on console the following lines:

```
[2017/01/20 18:05:20] [DEBUG] This is a test log message
[2017/01/20 18:05:20] [DEBUG] This is another log message
```

## API

### var log = new logty(level, [file]);

Return a new `logty` object to print logs messages in a console or in a file. This method accepts the followings arguments:

- `level`: an `integer` or `string` with the minimum log level. Default is `debug`.
- `file` (**optionally**): a string with the path of the log file where you want to append the log messages.

The library accepts the following log levels:

- Level 0: `fatal`.
- Level 1: `error`.
- Level 2: `warning`.
- Level 3: `notice`.
- Level 4: `info`.
- Level 5: `debug`.

### log.end()

Closes the log file. Only valid if a file path is provided on the constructor.

### log.debug(message)

Emit a `debug` message.

### log.info(message)

Emit a `info` message.

### log.notice(message)

Emit a `notice` message.

### log.error(message)

Emit a `error` message.

### log.fatal(message)

Emit a `fatal` message.


## License

[MIT](./LICENSE) &copy; Josemi Juanes.
