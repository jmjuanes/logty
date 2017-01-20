//Import dependencies
var fs = require('fs');

//Logty object
var logty = {};

//Default level
logty._level = 0;

//Log levels
logty.levels = [ 'fatal', 'error', 'warning', 'notice', 'info', 'debug' ];

//Parse a level
logty.parseLevel = function(value)
{
  //Check for string
  if(typeof value === 'string')
  {
    //Convert to lower case
    value = value.toLowerCase();

    //Return the level
    return (typeof logty.levels.indexOf(value) !== -1) ? value : 'debug';
  }

  //Check for number
  if(typeof value === 'number')
  {
    //Check the number
    return (value < 0 || value >= logty.levels.length) ? 'debug' : logty.levels[value];
  }

  //Return default
  return 'debug';
};

//Check the level value
logty.checkLevel = function(wanted_level, provided_level)
{
  //Get the wnted level index
  var wanted_index = logty.levels.indexOf(wanted_level);

  //Get the provided level index
  var provided_index = logty.levels.indexOf(provided_level);

  //Check the index level
  return (wanted_index > provided_index) ? false : true;
};

//Set the default level
logty.level = function(value)
{
  //Check the value
  if(typeof value === 'undefined'){ return logty.levels[logty._level]; }

  //Set the level
  logty._level = logty.parseLevel(value);
};

//Generate a log message
logty.message = function(level, message)
{
  //Parse the level
  level = logty.parseLevel(level);

  //Generate the log message
};

//Display a log in console for each level
logty.levels.forEach(function(level)
{
  //Add the display level
  logty[level] = function(message)
  {
    //Check the level
    if(logty.checkLevel(logty._level, level) === false){ return; }

    //Generate the message and print on console
    console.log(logty.message(level, message));
  };

  //Continue with the next level
  return true;
});

//Opened files
logty._files = [];

//Cath the process exit event
process.on('exit', function(code)
{
  //Check the files
  if(logty._files.length === 0){ return; }

  //Read all the files
  for(var key in logty._files)
  {
    //Close the file stream
    logty._files[key].end();
  }
});

//Writer
logty.writer = function(file, opt)
{
  //Check the file
  if(typeof file !== 'string'){ throw new Error('Expected string as the log file. Provided ' + typeof file); }

  //Check the options
  if(typeof opt !== 'object'){ var opt = {}; }

  //Check the encoding option
  if(typeof opt.encoding !== 'string'){ opt.encoding = 'utf8'; }

  //Create the writer id
  this._id = 'writer' + Date.now().toString();

  //Save the print to console option
  this._console = (typeof opt.console === 'boolean') ? opt.console : true;

  //Get the stream
  this._stream = fs.createWritableStream(file, { encoding: opt.encoding, flags: 'a' });

  //Save the stream object
  logty._files[this._id] = this._stream;

  //Return this
  return this;
};

//Build a log message
logty.writer.prototype.log = function()
{
  //
  //Build the message
  var log = logty.message()
};

//Close the writer
logty.writer.prototype.close = function()
{
  //End the stream
  this._stream.end();

  //Remove the stream
  delete logty._files[this._id];
};

//Reader
logty.reader = function(file, opt)
{

};

//Exports to node
module.exports = logty;
