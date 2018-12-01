//
// Command: kaamelott
//

module.exports = function(controller) {
  controller.hears(
    [/^kaamelott$/, /^[Kk]aa$/],
    "direct_message,direct_mention",
    function(bot, message) {
      let request = require("request");

      let options = {
        method: "GET",
        url: "https://kaamelott.chaudie.re/api/random"
      };

      request(options, function(error, response, body) {
        if (error) throw new Error(error);
        else if (response.statusCode == 200) {
          let info = JSON.parse(body);
          let perso;
          if (info.citation.infos.personnage)
            perso = "**" + info.citation.infos.personnage + "** - ";
          let text = "> " + info.citation.citation;
          text +=
            "\n\n" +
            perso +
            info.citation.infos.episode +
            " - " +
            info.citation.infos.saison;
          bot.reply(message, text);
        }
      });
    }
  );
};
