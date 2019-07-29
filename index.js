const { RTMClient } = require('@slack/rtm-api');
const token = 'xoxb-653557557380-656426146838-Ba5CUBV3DTQR3oeKcRUti6Pr';
const rtm = new RTMClient(token);
const date = require('date-and-time');
const weather = require('weather-js');
const fs = require('fs');

var invoker = 'hsl.';


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
      var sender = message.author; //FIX THIS!!


      switch(command){
        case 'ping':
          rtm.sendMessage('>>> Pong!', event.channel);
          break;
        case 'debug':
          //var diag = event.user;
          //rtm.sendMessage(diag ,event.channel);
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
          try {
            weather.find({search: arg.join(" "), degreeType: "F"}, function(err, result) {
              if (err) rtm.sendMessage(err, event.channel);
              var current = result[0].current;

              var wEmoji = '';
              switch (current.skytext.toLowerCase()){
                case 'clear':
                  wEmoji = ':sunny:';
                  break;
                case 'mostly clear':
                  wEmoji = ':sun_small_cloud:'
                  break;
                case 'cloudy':
                  wEmoji = ':cloud:';
                  break;
                default:
                  wEmoji = ':grey_question:'
                  break;
              }

              rtm.sendMessage(wEmoji + '  ' + current.skytext + '\nTemp: ' + current.temperature + ' F\nFeels like: ' + current.feelslike + '\nWinds: ' + current.windspeed, event.channel);
            });
          } catch (err){
            console.log(err);
          }
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

        case 'unlock':
            if (arg[0] == 'doors' || arg[1] == 'doors' || arg[0] == 'lab' || arg[1] == 'lab'){
              try {
                const today = date.format(new Date(), 'ddd, MMM DD');
                const now = date.format(new Date(), 'hh:mm A');
                /*check member database
                if the database member Ux33Hx8GG has a labaccess property with
                the value set to true, send command to door to unlock*/
                if (sender == 'Databaseperms') {
                  console.log('The lab door have been unlocked by ' + sender + ' at ' + today + ' ' + now);
                  rtm.sendMessage('The doors have been unlocked => Logged to database', event.channel);
                } else {
                  console.log(sender + ' tried and failed to unlock the lab doors at ' + today + ' ' + now);
                  rtm.sendMessage('>>> You do not have the proper permissions to unlock the doors', event.channel);
                }
              } catch (err) {
                rtm.sendMessage('>>> An error has occured!', event.channel);
                console.log(err);
              }
            }
          break;

        /*=======================================================================*/
        case 'shutdown':
          if (event.user == 'UJWK0D78S') {
            rtm.sendMessage('>>> HSL Slackbot is shutting down...' , event.channel);
            process.exit(0);
          } else {
            rtm.sendMessage('>>> Bitch.\n>>> Only the Magnificent Chase can do that!!! :P' , event.channel);
          }
          break;
        default:
          throw "-ERR: Not a valid command";
          break;
        } //switch close
        fs.writeFile('usageData.log', '\n+1 Command run successfully without errors', (err) => {
          if (err) throw err;
        });
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
