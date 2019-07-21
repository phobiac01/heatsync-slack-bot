var SlackBot = require('slackbots');

// create a bot
var bot = new SlackBot({
    token: 'xoxb-653557557380-656426146838-Ba5CUBV3DTQR3oeKcRUti6Pr',
    name: 'hsl-slackbot'
});

bot.on('start', function() {
    var params = {
        icon_emoji: ':ok_hand:'
    };

    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    bot.postMessageToChannel('hsl-dev-chan', '>>> Bot successfully started.', params);

    // define existing username instead of 'user_name'
    bot.postMessageToUser('phobiac01', 'FUCKKKKK! :ok_hand: :ok_hand: :ok_hand:', params);
});
