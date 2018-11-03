//
// Command: help
//
module.exports = function (controller) {

    controller.hears([/^help$/], 'direct_message,direct_mention', function (bot, message) {
        var text = "Voici ce que je peut faire :";
        text += "\n- " + bot.appendMention(message, "kaamelott") + " ou " +  bot.appendMention(message, "kaa") + ": Retourne une citation de kaamelott en aléatoire";
        text += "\n- " + bot.appendMention(message, "oss117") + " ou " +  bot.appendMention(message, "oss") + ": Retourne une citation de OSS 117 en aléatoire";
        bot.reply(message, text);
    });
}
