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

//Generate a log message
var message = function(level, tag, text)
{
  //Initialize the output list
  var list = [];

  //Add the tag
  if(tag){ list.push('[' + tag + ']'); }

  //Get the actual date
  var d = new Date();

  //Get the year-month-day
  var day = [ d.getFullYear(), normalize(d.getMonth() + 1), normalize(d.getDate()) ].join('/');

  //Get the actual time
  var time = [ normalize(d.getHours()), normalize(d.getMinutes()), normalize(d.getSeconds()) ].join(':');

  //Add the date
  list.push('[' + day + ' ' + time + ']');

  //Add the level
  list.push('[' + level.toUpperCase() + ']');

  //Add the text
  list.push(text.trim());

  //Return the log message
  return list.join(' ') + '\n';
};

//Logty readable stream
var logty = function(tag, opt)
{
  //Check the options object
  if(typeof opt !== 'object'){ opt = {}; }

  //Check the encoding value
  if(typeof opt.encoding !== 'string'){ opt.encoding = 'utf8'; }

  //Extends the readable stream
  stream.Readable.call(this, opt);

  //Save the tag
  this.tag = (typeof tag === 'string') ? tag.trim() : null;

  //Minimum level
  this.min_level = levels.length;

  //Logs are disabled
  this.disabled = false;

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

    //Build the message for this level and emit the data event
    //this.push(message(level, this.tag, text), 'utf8');
    this.emit('data', message(level, this.tag, text));
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
