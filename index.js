//Import dependencies
var stream = require('stream');
var util = require('util');
var events = require("events");

//Logty default levels
var levels = [ 'fatal', 'error', 'warning', 'notice', 'info', 'debug' ];

//Normalize a number and return it with two digits
var normalize = function(value)
{
  //Return the value with two digits
  return ('0' + value).slice(-2);
};

//Logty function
var logty = function(tag, writable)
{
  //Extend with the events emitter
  events.EventEmitter.call(this);

  //Save the tag
  this.tag = (typeof tag === 'string') ? tag.trim() : null;

  //Check the stream object
  if(typeof writable === 'object')
  {
    //Check for an instance of a writable stream
    if(writable instanceof stream.Writable === true)
    {
      //Save the stream object
      this.stream = writable;
    }
    else
    {
      //Throw a new Error
      throw new Error('Only writable streams are allowed');
    }
  }
  else
  {
    //Save the stream as the process.stdout
    this.stream = process.stdout;
  }

  //Minimum level
  this.min_level = levels.length;

  //Logs are disabled
  this.disabled = false;

  //Save this
  var self = this;

  //Register the stream error event listener
  this.stream.on('error', function(error)
  {
    //Emit the logty error event
    self.emit('error', error);
  });

  //Register the stream finish event listener
  this.stream.on('finish', function()
  {
    //Emit the logty finish event
    self.emit('finish');
  });

  //Return this
  return this;
};

//Inherit from EventEmitter
util.inherits(logty, events.EventEmitter);

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

//Generate a log message
logty.prototype.message = function(level, message)
{
  //Initialize the output list
  var list = [];

  //Add the tag
  if(this.tag){ list.push('[' + this.tag + ']'); }

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

  //Add the message
  list.push(message.trim());

  //Return the log message
  return list.join(' ');
};

//For each level
levels.forEach(function(level, index)
{
  //Register the level
  logty.prototype[level] = function(message)
  {
    //Check the message
    if(typeof message !== 'string'){ return; }

    //Check if the logs are disabled
    if(this.disabled === true){ return; } 

    //Check the level index
    if(index > this.min_level){ return; }

    //Build the message for this level and write to the stdout
    this.stream.write(this.message(level, message) + '\n');
  };
});

//Close the writable stream
logty.prototype.end = function()
{
  try
  {
    //Check if the stream is not the stdout or the stderr
    if(this.stream !== process.stdout && this.stream !== process.stderr)
    {
      //End the stream
      this.stream.end('');
    }
  }
  catch(error)
  {
    //Emit the error
    this.emit('error', error);
  }
};

//Exports to node
module.exports = logty;
