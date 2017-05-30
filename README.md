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
var log = require('logty');

//Display log messages
log.notice('This is a test log message');

//Display another log message
log.debug('This is another log message');

//Display a custom log message 
log.message('my-app', 'My-App message');
```

This will print on console the following lines:

```
[2017/01/20 18:05:20] [NOTICE] This is a test log message
[2017/01/20 18:05:20] [DEBUG] This is another log message
[2017/01/20 18:05:20] [MY-APP] My-App message
```

## API

### logty.message(level, message)

Returns a string with the log message. This string will have the structure `[{{ date }}] [{{ level }}] {{ message }}`, where:

- `date` is the actual date, in format `yyyy/mm/dd hh:mm:ss`. 
- `level` is the first argument of this method.
- `message` is the second argument of this method.

### logty.debug(message)

Alias of `logty.message('debug', message)`. Returns a **debug** message.

### logty.info(message)

Alias of `logty.message('info', message)`. Returns an **info** message.

### logty.notice(message)

Alias of `logty.message('notice', message)`. Returns a **notice** message.

### logty.error(message)

Alias of `logty.message('error', message)`. Returns an **error** message.

### logty.fatal(message)

Alias of `logty.message('fatal', message)`. Returns a **fatal** message.


## License

[MIT](./LICENSE) &copy; Josemi Juanes.
