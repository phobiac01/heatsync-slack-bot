var SlackBot = require('slackbots');

// create a bot
var bot = new SlackBot({
    token: 'xoxb-653557557380-656426146838-Ba5CUBV3DTQR3oeKcRUti6Pr',
    name: 'heatsync-dev'
});

module.exports.config = {
    bot,
}