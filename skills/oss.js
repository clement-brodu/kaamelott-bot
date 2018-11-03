//
// Command: kaamelott
//


module.exports = function (controller) {

    controller.hears([/^oss117$/, /^oss$/], 'direct_message,direct_mention', function (bot, message) {
        var request = require("request");

		var options = { method: 'GET',
		url: 'http://www.oss-117.fr/api/v1/replique/random/'
		};

		request(options, function (error, response, body) {
			if (error) throw new Error(error);
			else if (response.statusCode == 200) {
				var info = JSON.parse(body);
				var text = "> " + info.replique;
				text += "\n\n" + info.film ;
				bot.reply(message, text);
			}
		
		});
	       
    });
}
