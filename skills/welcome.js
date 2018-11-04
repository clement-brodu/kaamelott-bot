//
// Welcome message sent as the bot is added to a space
//
module.exports = function (controller) {

    controller.on('bot_space_join', function (bot, event) {

        var welcome = `Bonjour <@personId:${event.actorId}>, on en a gros !`;

        if (this.identity) {
            welcome += `<br/>Je suis **${this.identity.displayName}**`;
        }

        bot.say ({
            text: welcome,
            channel: event.channel
        }, function (err, rawMessage) {
            if (err) {
                console.log("Error while posting back welcome message, err: " + err.message)
                return;
            }

            var help = "Si tu veux de l'aide, t'as qu'a demander : `help`";

            if (rawMessage.roomType == "group") {
                help = "Pour avoir de l'aide, il n'y a qu'a demander : " + bot.appendMention(rawMessage, "help");
			}
			
			help += "<br/>Mais cherchez pas à faire des phrases pourries... On en a gros, c'est tout !"

            bot.say({
                text: `_${help}_`,
                channel: rawMessage.roomId
            }, function (err, messageAck) {
                if (err) {
                    console.log("Error while postig back help message, err: " + err.message)
                    return;
                }
            });
        });
    });
}
