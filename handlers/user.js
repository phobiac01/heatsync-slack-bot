const config = require('../config');

var bot = config.config.bot;

module.exports = {
    addUser: bot.on('start', function () {
        var params = {
            icon_emoji: ':cat:'
        };

        // define channel, where bot exist. You can adjust it there https://my.slack.com/services
        bot.postMessageToChannel('random', 'hello i am a talking cat', params);

        // define existing username instead of 'user_name'
        bot.postMessageToUser('user_name', 'meow!', params);

        // If you add a 'slackbot' property,
        // you will post to another user's slackbot channel instead of a direct message
        bot.postMessageToUser('user_name', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' });
    }),

}