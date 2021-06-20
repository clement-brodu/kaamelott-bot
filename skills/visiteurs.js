//
// Command: kaamelott
//

module.exports = function(controller) {
  controller.hears(
    [/^[Vv]isiteurs$/, /^[Vv]isi$/, /^[Vv]isit$/],
    "direct_message,direct_mention",
    function(bot, message) {
      let request = require("request");

      let options = {
        method: "GET",
        url: "https://kaamebot-customapis.herokuapp.com//api/visiteurs"
      };

      request(options, function(error, response, body) {
        if (error) throw new Error(error);
        else if (response.statusCode == 200) {
          let info = JSON.parse(body);
          let text = ">" + info.quote.split("\n").join("\n> "); //replaceAll
          text += "\n\n" + info.author ;
          bot.reply(message, text);
        }
      });
    }
  );
};
