//
// Command: help
//
module.exports = function(controller) {
  controller.hears([/^[Hh]elp$/], "direct_message,direct_mention", function(
    bot,
    message
  ) {
    let text = "L'important c'est les valeurs :";
    text += "\n- " + bot.appendMention(message, "kaa");
    text += ": Retourne une citation de kaamelott en aléatoire";
    text += "\n- " + bot.appendMention(message, "oss");
    text += ": Retourne une citation de OSS 117 en aléatoire";
    text += "\n- " + bot.appendMention(message, "devq");
    text += ": Retourne une citation de DevQuote en aléatoire";
    text += "\n- " + bot.appendMention(message, "cla");
    text += ": Retourne une citation de La Classe américaine en aléatoire";
    text += "\n- " + bot.appendMention(message, "hadk");
    text += ": Retourne une citation du capitaine Haddock";
    text += "\n\nVous vous prenez pour un enseignant ?";
    text += "\n- " + bot.appendMention(message, "about");
    text +=
      ": Est-ce qu'on peut s'en servir pour donner de l'élan à un pigeon ?";
    bot.reply(message, text);
  });
};
