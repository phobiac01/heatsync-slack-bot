const { RTMClient } = require('@slack/rtm-api');
const token = 'xoxb-653557557380-656426146838-Ba5CUBV3DTQR3oeKcRUti6Pr';
const rtm = new RTMClient(token);

var invoker = 'hsl.';

/*-------------------------------------------------------------------------*/
rtm.on('message', (event) => {
  //rtm.sendMessage(`Welcome to the channel, <@${event.user}>`, event.channel);

  /*the if statement stops the bot from processing every single message
  it will only respond to messages starting with 'hsl.command param param'*/
  try{
    if (event.text.startsWith(invoker)){
      var message = event.text.toLowerCase();
      message = message.slice(invoker.length);//trims invoker out of the stream

      var arg = message.split(" "); //converts stream to an array
      var command = arg.shift(); //extracts the command

  /*=======================================================================*/
  //bot response logic goes below this line

      //one way of parsing commands
      switch(command){
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
        default:
          throw "ERR: No valid commands found.";
          break;
      }//switch close

      //another option for parsing commands
      /*if (command == 'add') {
        try{
          var sum = 0;
          for(var i = 0; i < arg.length; i++){
            if(isNaN(parseInt(arg[i]))) throw "NaN";
            sum = sum + parseInt(arg[i]);
          }//for close
          rtm.sendMessage('The result is ' + sum, event.channel);
        } catch(err) {
          rtm.sendMessage('>>> ERR: Please only use numbers', event.channel);
        }//catch close
      }//'if command = add' close*/


  /*=========================================================================*/

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
