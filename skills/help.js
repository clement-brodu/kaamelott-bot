//
// Command: help
//
module.exports = function (controller) {

    controller.hears([/^help$/], 'direct_message,direct_mention', function (bot, message) {
        var text = "L'important c'est les valeurs :";
        text += "\n- " + bot.appendMention(message, "kaa") + ": Retourne une citation de kaamelott en aléatoire";
		text += "\n- " +  bot.appendMention(message, "oss") + ": Retourne une citation de OSS 117 en aléatoire";
		text += "\n\nVous vous prenez pour un enseignant ?"
		text += "\n- " +  bot.appendMention(message, "about") + ": Est-ce qu'on peut s'en servir pour donner de l'élan à un pigeon ?";
        bot.reply(message, text);
    });
}
