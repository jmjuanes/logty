//Logty default levels
var levels = [ 'fatal', 'error', 'warning', 'notice', 'info', 'debug' ];

//Normalize a number and return it with two digits
var normalize = function(value)
{
  //Return the value with two digits
  return ('0' + value).slice(-2);
};

//Logty function
var logty = function(tag, stream)
{
  //Save the tag
  this.tag = (typeof tag === 'string') ? tag.trim() : null;

  //Save the output stream
  this.stream = (typeof stream !== 'undefined') ? stream : process.stdout;

  //Minimum level
  this.min_level = levels.length;

  //Logs are disabled
  this.disabled = false;

  //Return this
  return this;
};

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

//Exports to node
module.exports = logty;
