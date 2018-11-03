//
// Fallback Command
//
module.exports = function (controller) {

    controller.hears([".*"], 'direct_message,direct_mention', function (bot, message) {
		var mardown = "La vache, je comprend pas un mot de ce que vous racontez.<br/>Fais-toi aider : "
            + bot.appendMention(message, "help");
            
        bot.reply(message, mardown);
    });
}