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

            var help = "Pour en savoir plus à mon sujet, fais toi aider : `help`";

            if (rawMessage.roomType == "group") {
                help = "Attention, tu es dans un 'Groupe'. Je ne répond que si tu me mentionnes.<br/>";
                help += "Pour en savoir plus à mon sujet, fais toi aider : " + bot.appendMention(rawMessage, "help");
            }

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
