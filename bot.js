var SlackBot = require('slackbots');

// create a bot
var bot = new SlackBot({
    token: '081f941a7ebcfe48420196bdb5b9b5be',
    name: 'heatsync-dev'
});

bot.on('start', function() {
    var params = {
        icon_emoji: ':cat:'
    };

    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    bot.postMessageToChannel('general', 'meow!', params);

    // define existing username instead of 'user_name'
    bot.postMessageToUser('user_name', 'meow!', params);

    // If you add a 'slackbot' property,
    // you will post to another user's slackbot channel instead of a direct message
    bot.postMessageToUser('user_name', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' });
});
