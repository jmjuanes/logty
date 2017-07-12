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

  //Return this
  return this;
};

//Generate a log message
logty.prototype.message = function(level, message)
{
  //Initialize the output list
  var list = [];

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

  //Add the tag
  if(this.tag)
  {
    //Add the tag and the two points
    list.push(this.tag, ':');
  }

  //Add the message
  list.push(message.trim());

  //Return the log message
  return list.join(' ');
};

//For each level
levels.forEach(function(level)
{
  //Register the level
  logty.prototype[level] = function(message)
  {
    //Check the message
    if(typeof message !== 'string'){ return; }

    //Build the message for this level and write to the stdout
    this.stream.write(this.message(level, message) + '\n');
  };
});

//Exports to node
module.exports = logty;
