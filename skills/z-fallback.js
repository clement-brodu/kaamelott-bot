//
// Fallback Command
//
module.exports = function (controller) {

    controller.hears([".*"], 'direct_message,direct_mention', function (bot, message) {
		var mardown = "La vache, je comprend pas un mot de ce que vous racontez.<br/>"
            + "Pour avoir de l'aide, il n'y a qu'à demander : " + bot.appendMention(rawMessage, "help")
            
        bot.reply(message, mardown);
    });
}