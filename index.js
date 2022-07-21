//Slackbot for HSL
const { RTMClient } = require('@slack/rtm-api');
const token = 'The previously used slack token and API access credentials have been revoked so this project can go public';
const rtm = new RTMClient(token);
const date = require('date-and-time');
const weather = require('weather-js');
const fs = require('fs');

var invoker = 'hsl.';
var botStart;
var botStartInt;
var botStartInth;
var botStartIntm;
var botStartIntd;


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
      var sender = event.user; //FIX THIS!!


      switch(command){
        case 'ping':
          rtm.sendMessage('>>> Pong!', event.channel);
          break;
        case 'debug':
          //var diag = event.user;
          //rtm.sendMessage(diag ,event.channel);
          console.log("} Debug Run > " + sender);
          break;
        case 'uptime':
          const nowH = parseInt(date.format(new Date(), 'H'), 10);
          const nowM = parseInt(date.format(new Date(), 'm'), 10);
          const nowD = parseInt(date.format(new Date(), 'D'), 10);

          var uptimeM = nowM - botStartIntm;
          var uptimeH = nowH - botStartInth;
          if ((nowD - botStartIntd) > 0) {
            var numDaysRunning = nowD - botStartIntd;
            for (var i = 0; i < numDaysRunning; i++) {
              uptimeH += 24;
            }
          }

          var uptime = "The bot has been running for " + uptimeH + " hours and " + uptimeM + " minutes";

          rtm.sendMessage(botStart + '\n' + uptime, event.channel);
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
                  wEmoji = ':sun_small_cloud:';
                  break;
                case 'partly cloudy':
                  wEmoji = ':sun_small_cloud:-';
                  break;
                case 'cloudy':
                  wEmoji = ':cloud:';
                  break;
                default:
                  wEmoji = ':grey_question:'
                  break;
              }

              rtm.sendMessage(wEmoji + '  ' + current.skytext + '\nTemp: ' + current.temperature + '\nWinds: ' + current.windspeed, event.channel);
            });
          } catch (err){
            console.log(err);
          }
          break;
        case 'time':
          now = date.format(new Date(), 'hh:mm A');
          rtm.sendMessage('>>> The time is ' + now, event.channel);
          break;
        case 'date':
          today = date.format(new Date(), 'ddd, MMM DD');
          rtm.sendMessage('>>> It is ' + today, event.channel);
          break;
        /*=======================================================================*/

        case 'unlock':
            try {
              var today = date.format(new Date(), 'ddd, MMM DD');
              var now = date.format(new Date(), 'hh:mm A');
              /*check member database
              if the database member Ux33Hx8GG has a labaccess property with
              the value set to true, send command to door to unlock*/
              if (sender == 'UJWK0D78S') {
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
          break;

        case 'lock':
            try {
              today = date.format(new Date(), 'ddd, MMM DD');
              now = date.format(new Date(), 'hh:mm A');
              /*check member database
              if the database member Ux33Hx8GG has a labaccess property with
              the value set to true, send command to door to unlock*/
              if (sender == 'UJWK0D78S') {
                console.log('The lab door have been locked by ' + sender + ' at ' + today + ' ' + now);
                rtm.sendMessage('The doors have been locked => Logged to database', event.channel);
              } else {
                console.log(sender + ' tried and failed to lock the lab doors at ' + today + ' ' + now);
                rtm.sendMessage('>>> You do not have the proper permissions to lock the doors', event.channel);
              }
            } catch (err) {
              rtm.sendMessage('>>> An error has occured!', event.channel);
              console.log(err);
            }
          break;

        /*=======================================================================*/
        case 'shutdown':
          if (event.user == 'UJWK0D78S') {
            rtm.sendMessage('>>> HSL Slackbot is shutting down...' , event.channel);
            process.exit(0);
          } else {
            rtm.sendMessage('>>> Illegal!\n>>> Only the Magnificent Chase can do that!!! :P' , event.channel);
          }
          break;
        default:
          throw "-ERR: Not a valid command";
          break;
        } //switch close
    }//'if invoker present' close
  } catch(err) {
    console.log(err);
  }
});//rtm.on(message) close


(async () => {
  try{
    await rtm.start();
    const today = date.format(new Date(), 'ddd, MMM DD');
    const now = date.format(new Date(), 'hh:mm A');

    botStart = "The bot started on " + today + " at " + now;
    botStartInth = parseInt(date.format(new Date(), 'H'), 10);
    botStartIntm = parseInt(date.format(new Date(), 'm'), 10);
    botStartIntd = parseInt(date.format(new Date(), 'D'), 10);
    console.log('HSL Slackbot connected Successfully');
    console.log(today + " " + now);
  } catch(err) {
    console.log(err);
  }
})();
