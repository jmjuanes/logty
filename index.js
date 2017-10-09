//Import dependencies
var stream = require('stream');
var util = require('util');

//Logty default levels
var levels = [ 'fatal', 'error', 'warning', 'notice', 'info', 'debug' ];

//Normalize a number and return it with two digits
var normalize = function(value)
{
  //Return the value with two digits
  return ('0' + value).slice(-2);
};

//Logty readable stream
var logty = function(opt)
{
  //Check the options object
  if(typeof opt !== 'object' || opt === null){ opt = {}; }

  //Check the tag value
  if(typeof opt.tag !== 'string'){ opt.tag = null; }

  //Check the encoding value
  if(typeof opt.encoding !== 'string'){ opt.encoding = 'utf8'; }

  //Extends the readable stream
  stream.Readable.call(this, { encoding: opt.encoding });

  //Save the tag
  this.tag = (typeof opt.tag === 'string') ? opt.tag.trim() : null;

  //Minimum level
  this.min_level = levels.length;

  //Logs are disabled
  this.disabled = false;

  //Initialize the log format method
  this._format = function(tag, day, time, level, message)
  {
    //Initialize the output list
    var list = [];

    //Add the tag
    if(tag){ list.push('[' + tag + ']'); }

    //Add the date
    list.push('[' + day + ' ' + time + ']');

    //Add the level
    list.push('[' + level.toUpperCase() + ']');

    //Add the text
    list.push(message.trim());

    //Return the log message
    return list.join(' ');
  };

  //Return this
  return this;
};

//Inherits from Readable stream
util.inherits(logty, stream.Readable);

//Set the minimum level
logty.prototype.level = function(level)
{
  //Check the level value
  if(typeof level === 'string' && levels.indexOf(level) > -1)
  {
    //Get the level value
    this.min_level = levels.indexOf(level);
  }
  else
  {
    //Set the default min level
    this.min_level = levels.length;
  }
};

//Set the message format
logty.prototype.format = function(format)
{
  //Check the format function
  if(typeof format !== 'function')
  {
    throw new Error('Format must be a function');
  }

  //Save the format function
  this._format = format;

  //Continue
  return this;
};

//For each level
levels.forEach(function(level, index)
{
  //Register the level
  logty.prototype[level] = function(text)
  {
    //Check the message
    if(typeof text !== 'string'){ return; }

    //Check if the logs are disabled
    if(this.disabled === true){ return; } 

    //Check the level index
    if(index > this.min_level){ return; }

    //Get the actual date
    var d = new Date();

    //Get the year-month-day
    var day = [ d.getFullYear(), normalize(d.getMonth() + 1), normalize(d.getDate()) ].join('/');

    //Get the actual time
    var time = [ normalize(d.getHours()), normalize(d.getMinutes()), normalize(d.getSeconds()) ].join(':');

    //Get the log string
    var str = this._format.call(null, this.tag, day, time, level, text);

    //Build the message for this level and emit the data event
    //this.push(message(level, this.tag, text), 'utf8');
    this.emit('data', str + '\n');
  };
});

//Empty read method
logty.prototype._read = function(){ return; };

//Close the writable stream
logty.prototype.end = function()
{
  //Disable logs
  this.disabled = true;

  //Emit the end event
  this.emit('end');
};

//Exports to node
module.exports = logty;
