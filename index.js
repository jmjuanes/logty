//Import dependencies
var fs = require('fs');

//Levels
var logty_levels = [ 'fatal', 'error', 'warning', 'notice', 'info', 'debug' ];

//Files object
var logty_files = {};

//Cath the process exit event
process.on('exit', function(code)
{
  //Read all the files
  for(var key in logty_files)
  {
    //Close the file stream
    logty_files[key].end();
  }
});

//Logty method
var logty = function(level, file)
{
  //Create the writer id
  this._id = 'writer' + Date.now().toString();

  //Save the level
  this._level = (typeof level === 'string') ? logty_levels.indexOf(level.toLowerCase()) : level;

  //Check the level value
  if(this._level < 0 || logty_levels.length <= this._level){ this._level = logty_levels.indexOf('debug'); }

  //Get the stream object
  this._stream = (typeof file === 'string') ? fs.createWriteStream(file, { encoding: 'utf8', flags: 'a' }) : process.stdout;

  //Add this file
  logty_files[this._id] = this._stream;

  //Return this
  return this;
};

//Close the stream
logty.prototype.end = function()
{
  //Check for file stream
  if(typeof logty_files[this._id] === 'undefined'){ return; }

  //Finish the stream
  this._stream.end();

  //Delete from the files list
  delete logty_files[this._id];
};

//Display a log message
logty.prototype.msg = function(level, message)
{
  //Check the level
  if(logty_levels.indexOf(level) < this._level){ return; }

  //Build the message
  var m = '[ ] [' + level.toUpperCase() + '] ' + message + '\n';

  //Write to the stream
  this._stream.write(m);
};

//For each level
logty_levels.forEach(function(el)
{
  //Register the level
  logty.prototype[el] = function(message){ return this.msg(el, message); };
});

//Exports to node
module.exports = logty;
