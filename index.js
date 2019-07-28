const { RTMClient } = require('@slack/rtm-api');
const token = 'xoxb-653557557380-656426146838-Ba5CUBV3DTQR3oeKcRUti6Pr';
const rtm = new RTMClient(token);
const date = require('date-and-time');
const weather = require('weather.js');

var invoker = 'hsl.';


function botLogic(event, message, arg, command, sender){
  switch(command){
    case 'ping':
      rtm.sendMessage('>>> Pong!', event.channel);
      break;
    case 'hi':
    case 'hello':
    case 'yo':
    case 'hey':
      rtm.sendMessage('Hey there! :grin:', event.channel);
      break;
    case 'add':
      try{
        var sum = 0;
        for(var i = 0; i < arg.length; i++){
          if(isNaN(parseInt(arg[i]))) throw "NaN";
          sum = sum + parseInt(arg[i]);
        }//for close
        rtm.sendMessage('The result is ' + sum, event.channel);
      } catch(err) {
        rtm.sendMessage('>>> ERR: Please only use numbers', event.channel);
      }
      break;
    case 'sub':
      try{
        var sum = 0;
        for(var i = 0; i < arg.length; i++){
          if(isNaN(parseInt(arg[i]))) throw "NaN";
          sum = sum - parseInt(arg[i]);
        }//for close
        rtm.sendMessage('The result is ' + sum, event.channel);
      } catch(err) {
        rtm.sendMessage('>>> ERR: Please only use numbers', event.channel);
      }
      break;
    case 'weather':
      var yay = 'boo';
      break;
    case 'time':
      const now = date.format(new Date(), 'hh:mm A');
      rtm.sendMessage('>>> The time is ' + now, event.channel);
      break;
    case 'date':
      const today = date.format(new Date(), 'ddd, MMM DD');
      rtm.sendMessage('>>> It is ' + today, event.channel);
      break;


    /*=======================================================================*/
    case 'shutdown':
      rtm.sendMessage('>>> HSL Slackbot is shutting down...' , event.channel);
      process.exit(0);
      break;
    default:
      return "err";
      break;
    } //switch close
}

rtm.on('message', (event) => {
  //rtm.sendMessage(`Welcome to the channel, <@${event.user}>`, event.channel);

  /*the if statement stops the bot from processing every single message
  it will only respond to messages starting with 'hsl.command param param'*/
  try{
    if (event.text.startsWith(invoker)){
      var message = event.text.toLowerCase().slice(invoker.length);
      //message = message.slice(invoker.length);//trims invoker out of the stream
      var arg = message.split(" "); //converts stream to an array
      var command = arg.shift(); //extracts the command
      var sender = message.author;

      var run = botLogic(event, message, arg, command, sender, date);
      if (run == "err") throw "-ERR: Not a valid command";

    }//'if invoker present' close
  } catch(err) {
    console.log(err);
  }
});//rtm.on(message) close


(async () => {
  try{
    await rtm.start();
    console.log('Bot connected Successfully');
  } catch(err) {
    console.log(err);
  }
})();
