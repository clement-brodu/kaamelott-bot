//
// Command: aga
//

module.exports = function(controller) {
  controller.hears(
    [/^[Aa][Gg][Aa]$/, /^[Aa][Gg][Aa]$/],
    "direct_message,direct_mention",
    function(bot, message) {
      let request = require("request");

      let options = {
        method: "GET",
        url: "http://kaamebot.rockball.fr/api/aga"
      };

      request(options, function(error, response, body) {
        if (error) throw new Error(error);
        else if (response.statusCode == 200) {
          let info = JSON.parse(body);
          let text = "> " + info.quote;
          text += "\n\n**" + info.author + "**" + " - " + info.source;
          bot.reply(message, text);
        }
      });
    }
  );
};