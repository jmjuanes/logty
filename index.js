//Logty object
var logty = {};

//Logty default levels
logty.levels = [ 'fatal', 'error', 'warning', 'notice', 'info', 'debug' ];

//Display a log message
logty.message = function(level, message)
{
  //Get the actual date
  var d = new Date();

  //Get the year-month-day
  var date_day = d.getFullYear() + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2);

  //Get the date time
  var date_time = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2);

  //Build the message and return
  return '[' + date_day + ' ' + date_time + '] [' + level.toUpperCase() + '] ' + message;
};

//For each level
logty.levels.forEach(function(el)
{
  //Register the level
  logty[el] = function(message)
  {
    //Build the message for this level
    return logty.message(el, message);
  };
});

//Exports to node
module.exports = logty;
