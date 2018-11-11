//
// Command: kaamelott
//


module.exports = function(controller) {
  controller.hears([/^kaamelott$/, /^kaa$/], "direct_message,direct_mention", function(bot, message) {
    let request = require("request");

    let options = {method: "GET",
      url: "https://kaamelott.chaudie.re/api/random",
    };

    request(options, function(error, response, body) {
      if (error) throw new Error(error);
      else if (response.statusCode == 200) {
        let info = JSON.parse(body);
        let text = "> " + info.citation.citation;
        text += "\n\n**" + info.citation.infos.personnage + "**"
             + " - " + info.citation.infos.episode + " - " + info.citation.infos.saison;
        bot.reply(message, text);
      }
    });
  });
};
