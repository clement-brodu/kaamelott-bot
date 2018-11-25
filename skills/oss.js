//
// Command: kaamelott
//

module.exports = function(controller) {
  controller.hears(
    [/^oss117$/, /^oss$/],
    "direct_message,direct_mention",
    function(bot, message) {
      let request = require("request");

      let options = {
        method: "GET",
        url: "http://www.oss-117.fr/api/v1/replique/random/"
      };

      request(options, function(error, response, body) {
        if (error) throw new Error(error);
        else if (response.statusCode == 200) {
          let info = JSON.parse(body);
          let text = "> " + info[0].replique;
          text += "\n\n" + info[0].film;
          bot.reply(message, text);
        }
      });
    }
  );
};
