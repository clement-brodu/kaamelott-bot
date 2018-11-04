//
// Adds meta information about the bot, and exposes them at a public endpoint 
//
module.exports = function (controller, bot) {

    //
    // OVERRIDE WITH YOUR BOT INFORMATION
    //
    var botcommons = {

        // Bot description
        "description": "Kaamebot - le bot qui te donne des répliques",

        // Where to get more information about the bot
        "url": "https://github.com/clement-brodu/kaamelott-bot",

        // Legal owner
        "legal_owner": "Clément Brodu <https://github.com/clement-brodu>",

        // Contact name for support
        "support_contact": "Clément BRODU <mailto:clement.brodu@gmail.com>",

        // Messaging platform
        // [WORKAROUND] overriding Botkit's integrated support temporarly as 'ciscospark' is still returned
        //"platform": bot.type,
        "platform": "webex",

        // the precise bot identity is loaded asynchronously, from a GET /people/me request
        "identity": "unknown",

        // Endpoint where to check the bot is alive
        "healthcheck": "https://" + controller.config.public_address + process.env.HEALTHCHECK_ROUTE,

        // BotCommons specifications version (should be an href)
        "botcommons": "draft",
    }

    //
    // Adding a metadata endpoint
    //
    controller.webserver.get(process.env.BOTCOMMONS_ROUTE, function (req, res) {
        // As the identity is load asynchronously from the access token, we need to check until it's fetched
        if ((botcommons.identity == "unknown") && (bot.botkit.identity)) {
            botcommons.identity = bot.botkit.identity.emails[0];
        }
        res.json(botcommons);
    });
    console.log("bot metadata available at: " + process.env.BOTCOMMONS_ROUTE);

    //
    // .botcommons skill
    //
    controller.hears([/^about$/, /^botcommons$/, /^\.commons$/, /^\.bot$/], 'direct_message,direct_mention', function (bot, message) {
		var pjson = require('./../package.json');

        // Return metadata
        var metadata = '{\n'
            + '   "description" : "' + botcommons["description"] + '",\n'
            + '   "url"         : "' + botcommons["url"] + '",\n'
			+ '   "owner"       : "' + botcommons["legal_owner"] + '",\n'
			+ '   "version"      : "' + pjson.version + '"\n';
            + '}\n';
		var text = "**Kaamebot** est un Bot pour Webex Teams.<br/>"
			+ "Il s'agit d'une application Node.js se basant sur Botkit.<br/>"
			+ "N'hésitez pas à contribuer au projet : [Kaamelott Bot](https://github.com/clement-brodu/kaamelott-bot)"
			+ "\n\n"
			+ "```json\n" + metadata + "\n```";
        bot.reply(message, text);
    });

}
